import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './../axios';

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading = true
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Helper to check permission
    const can = (permissionName) => {
        return permissions.includes(permissionName);
    };

    // 1. Fetch permissions on Mount (Page Reload)
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('auth_token');
            
            if (token) {
                try {
                    // Configure axios header if not global
                    const response = await api.get('/me');
                    
                    // Update state with fresh data from server
                    setPermissions(response.data.permissions || []);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Session expired or invalid token");
                    logout();
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false); // Stop loading whether success or fail
        };

        fetchUser();
    }, []);

    // 2. Login Function (Sets token and state)
    const setUserPermission = (userData) => {
        setPermissions(userData.permissions || []);
        setIsAuthenticated(true);
        setLoading(false);
    };

    // 3. Logout Function
    const logout = () => {
        setPermissions([]);
        setIsAuthenticated(false);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    return (
        <PermissionContext.Provider value={{ permissions, loading, isAuthenticated, can, setUserPermission, logout }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => useContext(PermissionContext);