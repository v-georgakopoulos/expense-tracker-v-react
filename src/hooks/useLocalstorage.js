import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue,setStoredvalue] = useState( () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error("Error reading localStorage key “" + key + "”:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.error("Error writing localStorage key “" + key + "”:", error); 
        }
    },[key,storedValue]);


    const addItem = (item) => setStoredvalue(prev => [...prev, item]);

    const removeItem = (id) => setStoredvalue(prev => prev.filter(item => item.id !== id));

    const updateItem = (id, updateData) =>
        setStoredvalue(prev => prev.map(item => (item.id === id ? {...item, ...updateData} : item)))


    return { storedValue, setStoredvalue, addItem,removeItem,updateItem };
}

export default useLocalStorage;