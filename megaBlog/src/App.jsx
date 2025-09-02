import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth'
import { login,logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch =useDispatch()


  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        dispatch(login({userdata}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        {/* TODO:   <Outlet /> */}
        </main>
        <Footer/>
      </div>
    </div>
  ):(null)
  
}

export default App
