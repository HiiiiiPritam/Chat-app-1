import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage.js'
import Loading from '../../components/Loading.jsx';
import useGetMessageSocket from '../../context/useGetMessageSocket.jsx';

function Messages() {

  const {loading , messages} = useGetMessage()
  //////////how is this thing wroking//////////////
   useGetMessageSocket()

  const lastmessageRef= useRef();

  useEffect(()=>{
    setTimeout(()=>{
      if(lastmessageRef.current){
        lastmessageRef.current.scrollIntoView({behaviour:"smooth"})
      }
    },100)
  },[messages])
  

  return (
    <div className='' style={{minHeight:"calc(92vh - 8vh)"}}>
      {
        loading?(<Loading/>) :(messages.length>0 && messages.map((message, index)=>(
          <div key={index} ref={lastmessageRef}>
            <Message key={index} message={message}/>
          </div>
        )))
      }
      {
        !loading && messages.length===0 && (
          <div>
            <p className='text-center text-lg text-slate-100 mt-[20%]'>Say "hi" to start a conversation</p> 
          </div>
        )
      }
      
      
    </div>
  )
}

export default Messages