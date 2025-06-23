// --- START OF FILE: services/api.ts ---

import axios from "axios";
import API_URL from "./API_URL";
import { SignUpFormData } from "../types";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Helper functions to map frontend values to what the backend schema expects
const mapActivityLevel = (level: string): string => {
    const mapping: { [key: string]: string } = {
        'sedentary': 'S',
        'light': 'LA',
        'moderate': 'MA',
        'active': 'VA',
        'extra-active': 'SA',
    };
    return mapping[level] || 'S';
};

const mapDietPreference = (diet: string): string => {
    const mapping: { [key: string]: string } = {
        'vegetarian': 'Vegetarian',
        'non-vegetarian': 'Non Vegetarian',
    };
    return mapping[diet] || 'Vegetarian';
};

export const authService = {
    async signUp(userData: SignUpFormData) {
        try {
            // This payload now PERFECTLY matches the API documentation
            const payload = {
                email: userData.email,
                name: userData.fullName, // Mapped from frontend `fullName`
                
                age: Number(userData.age),
                gender: userData.gender,
                phone: userData.phone,
                height: Number(userData.height),
                weight: Number(userData.weight),
                activity_level: mapActivityLevel(userData.activityLevel), // Mapped to "S", "LA", etc.
                diet: mapDietPreference(userData.dietPreference), // Mapped to "Vegetarian", etc.
                health_condition: userData.healthCondition || "Healthy",
                diabetes_status: userData.diabeticStatus || null,
                region: "North", // Default value as it's required by the backend
                password: userData.password,
                // Note: 'phone' is omitted as it's not in the backend schema
            };
            
            const response = await api.post("/auth/register", payload);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.error("Registration error:", error.response?.data || error.message);
            } else { 
                console.error("An unexpected error occurred:", error);
            }
            throw error;
        }
    },

    async signIn(email: string, password: string) {
        try {
            const response = await api.post(
                "/auth/token",
                new URLSearchParams({
                    username: email.trim().toLowerCase(),
                    password: password,
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            
            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { console.error("Login error:", error.response?.data || error.message); } 
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },

    async getCurrentUser() {
        try {
            const response = await api.get("/users/me");
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { console.error("Get user profile error:", error.response?.data || error.message); } 
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },

    async logout() {
        localStorage.removeItem("token");
    },
};

// --- END OF FILE: services/api.ts ---