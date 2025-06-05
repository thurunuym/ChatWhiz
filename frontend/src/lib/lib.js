import React from 'react'

export default function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US",{
    hour: "2-digit",
    minute: "2-digit",
    hour12:false,
  })
}


//new Date(date): Converts the input into a JavaScript Date object.

//hour12: false: Uses 24-hour time format instead of AM/PM.
