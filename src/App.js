import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// ADDED: component imports
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Users from './Components/Users'
import Resources from './Components/Resources'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/resources' element={<Resources />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
