import Foundation
import React
import UIKit

@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {

  @objc
  func getBatteryLevel(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    UIDevice.current.isBatteryMonitoringEnabled = true
    let level = UIDevice.current.batteryLevel
    if level >= 0 {
      resolve(Int(level * 100))
    } else {
      reject("ERROR_BATTERY", "Unable to fetch battery level", nil)
    }
  }

  @objc
  func getFreeStorage(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    do {
      let attributes = try FileManager.default.attributesOfFileSystem(forPath: NSHomeDirectory())
      if let freeSize = attributes[FileAttributeKey.systemFreeSize] as? NSNumber {
        let gb = Double(truncating: freeSize) / 1024 / 1024 / 1024
        resolve(String(format: "%.2f GB", gb))
      } else {
        reject("ERROR_STORAGE", "Cannot get free storage", nil)
      }
    } catch {
      reject("ERROR_STORAGE", error.localizedDescription, nil)
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
