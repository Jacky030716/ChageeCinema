import './index.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieSeats from './components/MovieSeats'
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import MyTickets from './components/MyTickets'

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
          <Route path='/mytickets' element={<MyTickets />} />
      </Routes>
    </Router>
    
  )
}

export default App
