import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Users from './routes/Users'
import CreateUser from './routes/CreateUser'
import UpdateUser from './routes/UpdateUser'
import DeleteUser from './routes/DeleteUser'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Users/>} />
    <Route path="/create" element={<CreateUser />} />
    <Route path="/update/:id" element={<UpdateUser />} />
    <Route path="/delete/:id" element={<DeleteUser />} />
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
