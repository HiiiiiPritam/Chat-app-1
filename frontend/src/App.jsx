import CreateGroup from "./components/CreateGroup";
import Login from "./components/Login";
import UserSearch from "./components/SearchUser";
import Signup from "./components/Signup";
import { useAuth } from "./context/Authprovider";
import Left from "./home/leftPart/Left";
import Right from "./home/rightpart/Right";
import { Navigate, Route, Routes } from 'react-router-dom'


export default function App() {
  const [authuser, setAuthUser]= useAuth()  
  return (
   
    <Routes>
      <Route path="/" element={authuser? 
      <div className="flex h-screen overflow-y-hidden">
      <Left/>
      <Right/>
      </div> :<Navigate to={'/login'}/>} />

      <Route path="/signup" element={ authuser?<Navigate to={'/'} /> : <Signup/>}/>
      <Route path="/login" element={ authuser?<Navigate to={'/'} /> :<Login/>}/>
      <Route path="/search" element={authuser? 
      <div className="flex h-screen overflow-y-hidden">
      <Left/>
      <UserSearch/>
      </div> :<Navigate to={'/login'}/>} />

      <Route path="/createGroup" element={authuser? 
      <div className="flex h-screen overflow-y-hidden">
      <Left/>
      <CreateGroup/>
      </div> :<Navigate to={'/login'}/>} />
    </Routes>
    
  )
}