import {create} from 'zustand'
import {axiosInstance} from "../lib/axios";
import toast from 'react-hot-toast';

//create a state store.

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        }catch (error) {
            console.error("Error in checkAuth:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth : false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Account created successfully!");
            
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error in logout:", error);
            toast.error(error.response.data.message);
        }
    }
       

}));