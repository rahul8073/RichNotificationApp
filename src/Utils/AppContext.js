import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import UseApi from "../Services/Api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);

        const response = await UseApi.getAPI(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (response.success) {
            setPosts(response.data.slice(0, 10));
        } else {
            setError(response.error);
        }

        setLoading(false);
    };

    const colorScheme = Appearance.getColorScheme(); // 'light' or 'dark'
    const [theme, setTheme] = useState(colorScheme || "light");

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme);
        });
        return () => subscription.remove();
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <AppContext.Provider
            value={{

                loading,
                error,
                posts,
                fetchPosts,

                theme,
                toggleTheme,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
