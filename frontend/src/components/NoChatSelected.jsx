import React from 'react'
import logo from "../assets/logo_trans.png";

const NoChatSelected = () => {
return (
  <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
    <img
      src={logo}
      alt="No chats Selected"
      className="absolute  w-lg"
    />
  </div>
)
}

export default NoChatSelected;
