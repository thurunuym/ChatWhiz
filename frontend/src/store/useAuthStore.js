import {create} from 'zustand'
import {axiosInstance} from "../lib/axios";
import toast from 'react-hot-toast';
import { data } from 'react-router-dom';
import { io } from "socket.io-client"

//create a state store.

 const BASE_URL= import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/"


export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket:null,


    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            get().connectSocket();

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

            get().connectSocket()
            
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
            get().disconnectSocket();
        } catch (error) {
            console.error("Error in logout:", error);
            toast.error(error.response.data.message);
        }
    },

    login : async(data) => {
        try {
            set({isLoggingIn: true});
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Logged in successfully!");
            get().connectSocket()
        } catch (error) {
            console.error("Error in login:", error);
            toast.error(error.response.data.message);
            
        }finally{
                set({isLoggingIn: false})

        } 
    },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();   //This checks: "Is there a socket connected?" If yes, it disconnects the socket from the server.
  },
}));
       

//BASE_URL is the address of your backend server.
//authUser holds the current logged-in user's information after a successful login.