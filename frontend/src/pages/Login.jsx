import React from 'react'
import{useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../api'
import { useNavigate } from 'react-router-dom'



const Login = () => {
const navigate = useNavigate();




  const responseGoogle = async (authResult) => {
    try {
        if(authResult['code']){
          const result = await googleAuth(authResult['code']);
          const {email,name , image } = result.data.user;
          const token = result.data.token;
          const obj = { email, name, image, token }
          localStorage.setItem('user', JSON.stringify(obj));
          navigate('/');
          console.log(result.data.user)
            
        }
        
    } catch (error) {
        console.log(error)
    }
  }  


const handleLogin = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: responseGoogle,
    flow: 'auth-code',
});


  return (
    <>

    <button onClick={handleLogin}> Login with Google</button>
    
    
    
    </>
  )
}

export default Login