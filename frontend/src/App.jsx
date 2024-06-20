import './index.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieSeats from './components/MovieSeats'
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import MyProfile from './components/MyProfile'
import AdminLogin from './components/AdminLogin'
import AdminHome from './components/AdminHome'

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/seat' element={<MovieSeats />} />
          <Route path='/payment' element={<Checkout />} />
          <Route path='/payment/confirmation' element={<Payment />} />
          <Route path='/profile/*' element={<MyProfile />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/index/*' element={<AdminHome />} />
      </Routes> 
    </Router>
    
  )
}

export default App
