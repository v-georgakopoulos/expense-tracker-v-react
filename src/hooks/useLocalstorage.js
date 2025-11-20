import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key “" + key + "”:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error writing localStorage key “" + key + "”:", error);
        }
    }, [key, storedValue]);

    const addItem = (item) => setStoredValue(prev => [...prev, item]);
    const removeItem = (id) => setStoredValue(prev => prev.filter(item => item.id !== id));
    const updateItem = (id, updateData) =>
        setStoredValue(prev => prev.map(item => (item.id === id ? { ...item, ...updateData } : item)));

    return { storedValue, setStoredValue, addItem, removeItem, updateItem };
}

export default useLocalStorage;
