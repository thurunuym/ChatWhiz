import Navbar from './components/NavBar'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/Settings';
import { Routes, Route ,Navigate} from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import {Loader} from 'lucide-react';


const App = () => {

  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
//This line uses JavaScript object destructuring to extract three 
// values—authUser, checkAuth, and isCheckingAuth—from the object 
// returned by the useAuthStore() hook.
 
useEffect(() => {
    checkAuth();
  } , [checkAuth]

  );

  //This useEffect makes your app check if the user is authenticated as soon as the app loads.

  console.log({authUser});

  if(isCheckingAuth && !authUser) return (

    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>

  )

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
        <Route path="/settings" element={<SettingsPage/>} />
      </Routes>
    </>
  )
}

export default App;
