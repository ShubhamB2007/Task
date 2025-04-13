import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'; 


const GoogleLogin = () => {

    const navigate = useNavigate()
    const resGoogle = async (authResult)=>{
 
      console.log("Google Auth Result:", authResult);

        try {
          if(authResult['code']){
            const result = await googleAuth(authResult['code'])
            const {email,name,_id} = result.data.user
            const {token} = result.data.token
            localStorage.setItem('userName', name)
            localStorage.setItem('token', token) 
            localStorage.setItem('email', email)
            localStorage.setItem('id',_id.toString())
            toast.success(`Welcome ${name}`,{ position: "top-right" })
            navigate('/')
          }
        } catch (error) {
          console.log(error)
        }
    }
  
    const googleLogin = useGoogleLogin({
      onSuccess: resGoogle,
      onError:resGoogle,
      flow: 'auth-code'
    })          

  return (
    <div className="flex-row flex items-center" onClick={googleLogin}>
     <img src="./custom/google.png" alt="" className="absolute w-6 left-36 mt-3" />
      <button className="btn google border border-neutral-800 rounded-xl font-semibold">
          Google
      </button>
    </div>
  )
}

export default GoogleLogin