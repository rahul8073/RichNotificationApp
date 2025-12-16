package com.richnotificationapp

import android.content.Context
import android.os.BatteryManager
import android.os.Environment
import android.os.StatFs
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File

class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceInfoModule"
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val bm = reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
            val level = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
            promise.resolve(level)
        } catch (e: Exception) {
            promise.reject("ERROR_BATTERY", e.message)
        }
    }

    @ReactMethod
    fun getFreeStorage(promise: Promise) {
        try {
            val path: File = Environment.getDataDirectory()
            val stat = StatFs(path.path)
            val bytesAvailable: Long = stat.blockSizeLong * stat.availableBlocksLong
            val gb = bytesAvailable.toDouble() / 1024 / 1024 / 1024
            promise.resolve(String.format("%.2f GB", gb))
        } catch (e: Exception) {
            promise.reject("ERROR_STORAGE", e.message)
        }
    }
}
