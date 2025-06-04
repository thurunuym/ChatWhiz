import React from 'react'
import { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { X } from 'lucide-react';
import { Image } from 'lucide-react';


const MessageInput = () => {
  const [text , setText] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = useState(null);
  const {sendMessage, selectedUser} = useChatStore();

  const handleImageChange = (e) => {};

  const removeImage = () => {};

  const handleSendMessage = async(e) => {};

  return(
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <img src={imagePreview} alt="Preview" 
          className='w-20 h-20 object-cover rounded-lg border border-zinc-700 '/>
          <button
          onClick={removeImage}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex-items-center justify-center"
          type="button"
          >
          <X className="size-3"/>
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex-items-center gap-2'>
        <div className='flex-1 flex-gap'>
        <input type="text"
        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
        placeholder='Type a message...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
        <input type="file"
        accept='image/*'
        className='hidden'
        ref={fileInputRef} 
        onChange={handleImageChange}/>

        <button
        type='button'
        className={`hidden sm:flex btn btn-circle
        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
        onClick={()=> fileInputRef}
        >
          <Image size={20} />
        </button>
        </div>
      </form>
      
    </div>
  )
}

export default MessageInput
