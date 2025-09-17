// src/services/api.ts

import axios from "axios";
import API_URL from "./API_URL"; // This now imports the corrected, relative URL
import { SignUpFormData, User } from "../types";

// This Axios instance is now correctly configured with the relative baseURL '/api/v1'.
// All API calls made with this instance (e.g., api.post('/auth/token')) will now
// correctly resolve to '/api/v1/auth/token' and be handled by the Vite proxy.
const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Add an interceptor to include the Authorization token in every request.
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

// Helper functions to map frontend values to backend-expected values.
const mapActivityLevel = (level: string): string => {
    const mapping: { [key: string]: string } = { 'sedentary': 'S', 'light': 'LA', 'moderate': 'MA', 'active': 'VA', 'extra-active': 'SA' };
    return mapping[level] || 'S';
};
const mapDietPreference = (diet: string): string => {
    const mapping: { [key: string]: string } = { 'vegetarian': 'Vegetarian', 'non-vegetarian': 'Non Vegetarian' };
    return mapping[diet] || 'Vegetarian';
};
const mapHealthCondition = (condition: string): string => {
    const mapping: { [key: string]: string } = { 'diabetic': 'Diabetic-Friendly', 'pcod-pcos': 'PCOD/PCOS', 'thyroid': 'Thyroid Support' };
    return mapping[condition] || 'Healthy';
};
const mapRegion = (region: string): string => {
    const mapping: { [key: string]: string } = { 'north': 'North', 'south': 'South', 'east': 'East', 'west': 'West' };
    return mapping[region] || 'North';
};

// Authentication related API calls.
export const authService = {
    async signUp(userData: SignUpFormData) {
        try {
            const payload = {
                email: userData.email,
                name: userData.fullName,
                password: userData.password,
                phone: userData.phone,
                age: Number(userData.age),
                gender: userData.gender,
                height: Number(userData.height),
                weight: Number(userData.weight),
                activity_level: mapActivityLevel(userData.activityLevel),
                diet: mapDietPreference(userData.dietPreference),
                health_condition: mapHealthCondition(userData.healthCondition),
                diabetes_status: userData.diabeticStatus || null,
                region: mapRegion(userData.region),
            };
            const response = await api.post("/auth/register", payload);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { console.error("Registration error:", error.response?.data || error.message); } 
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },

    async signIn(email: string, password: string) {
        try {
            const response = await api.post( "/auth/token", new URLSearchParams({ username: email.trim().toLowerCase(), password: password, }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
            if (response.data.access_token) { localStorage.setItem("token", response.data.access_token); }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Login error response:", error.response?.data || "No response data");
            } else {
                console.error("Login setup error:", error);
            }
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
    
    async updateCurrentUser(updateData: Partial<User>) {
        try {
            const payload = {
                ...updateData,
                age: updateData.age ? Number(updateData.age) : undefined,
                height: updateData.height ? Number(updateData.height) : undefined,
                weight: updateData.weight ? Number(updateData.weight) : undefined,
            };
            const response = await api.put("/users/me", payload);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.error("Update user error:", error.response?.data || error.message);
            } else { 
                console.error("An unexpected error occurred:", error);
            }
            throw error;
        }
    },
};

// Diet Plan related API calls.
export const dietPlanService = {
    async getMyPlan() {
        try {
            const response = await api.get("/diet-plans/my-plan");
            console.log("Diet plan response:", response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            if (axios.isAxiosError(error)) { console.error("Get Diet Plan error:", error.response?.data || error.message); }
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },

    async generatePlan() {
        try {
            const response = await api.post("/diet-plans/generate");
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { console.error("Generate Diet Plan error:", error.response?.data || error.message); }
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },
};

// Medical Report related API calls.
export const medicalReportService = {
    async extractMedicalReportData(file: File) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post("/medical-reports/extract", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Medical report extraction error:", error.response?.data || error.message);
                throw error.response?.data || new Error("Failed to extract medical report data.");
            } else {
                console.error("An unexpected error occurred during medical report extraction:", error);
                throw new Error("An unexpected error occurred during medical report extraction.");
            }
        }
    },
};