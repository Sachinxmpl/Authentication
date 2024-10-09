import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from "./components/home"
import { AuthProvider } from './auth'
import { Login } from './components/login'
import { Profile } from './components/profile'

export default function App() {
        return (
                <BrowserRouter>
                        <AuthProvider>

                                <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/login" element={<Login/> } />
                                        <Route path="/profile" element={<Profile/>} />
                                </Routes>
                        </AuthProvider>
                </BrowserRouter>
        )
}