import React, { createContext, useContext, useState } from 'react'
export const Authcontext= createContext()
import Cookies from 'js-cookie'

export function Authprovider({children}) {

  const initialUserState= Cookies.get("jwtChatApp") || localStorage.getItem("ChatApp");

  //prase the user data ans tsore in state

  const [authuser, setAuthUser]= useState(initialUserState?JSON.parse(initialUserState):undefined)

  return (
    <Authcontext.Provider value={[authuser, setAuthUser]}>
      {children}
    </Authcontext.Provider>
  )
}

export const useAuth = ()=> useContext(Authcontext)