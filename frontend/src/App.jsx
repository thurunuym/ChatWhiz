import Navbar from './components/NavBar'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SigUupPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';


function App() {
  

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
      </Routes>
    </>
  )
}

export default App;
