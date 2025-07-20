// --- START OF FILE: services/api.ts ---

import axios from "axios";
import API_URL from "./API_URL";
import { SignUpFormData, User } from "../types"; // Make sure User is imported

const api = axios.create({
    baseURL: '/api/v1',
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
    
    // --- ADD THIS NEW FUNCTION ---
    async updateCurrentUser(updateData: Partial<User>) {
        try {
            // The backend expects number types for certain fields
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

// --- ADD THIS NEW SERVICE OBJECT ---
export const dietPlanService = {
    async getMyPlan() {
        try {
            const response = await api.get("/diet-plans/my-plan");
            console.log("Diet plan response:", response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                // This is not a real error, it just means the user has no plan yet.
                return null;
            }
            // For all other errors, we re-throw them.
            if (axios.isAxiosError(error)) { console.error("Get Diet Plan error:", error.response?.data || error.message); }
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },

    async generatePlan() {
        try {
            // The backend's /generate endpoint doesn't require a body,
            // as it uses the current user's data from the auth token.
            const response = await api.post("/diet-plans/generate");
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) { console.error("Generate Diet Plan error:", error.response?.data || error.message); }
            else { console.error("An unexpected error occurred:", error); }
            throw error;
        }
    },
};
// --- END OF FILE: services/api.ts ---
