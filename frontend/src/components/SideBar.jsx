import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';

const Sidebar = () => {
    const {getUsers , users , selectedUser , isUserLoading} = useChatStore()
    const onlineUsers = [];

    useEffect(() => {getUsers()}, [getUsers]);

    if (isUserLoading) return <SidebarSkeleton/>

  return (
    <div>
      
    </div>
  )
}

export default Sidebar;
