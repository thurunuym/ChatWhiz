import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../utils/axiosInstance';

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers : async () => {
        set({isUserLoading: true});
        try {
            const res = await axiosInstance.get('messages/users');
            set({users: res.data});
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error(error.response.data.message);
            set({isUserLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData)=> {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})

}))