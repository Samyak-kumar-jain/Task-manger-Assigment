
import './App.css'
import Task from './Task'
import { ToastContainer, toast } from "react-toastify";


function App() {
 

  return (
    <>
    <div className='bg-gray-900 h-screen w-full '>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
    <Task/>
     
    </div>
    </>
  )
}

export default App
