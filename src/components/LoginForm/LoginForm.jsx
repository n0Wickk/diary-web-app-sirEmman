import React, { useState } from 'react';
import userIcon from '../../assets/user.svg'
import passwordIcon from '../../assets/password.svg'

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className='flex flex-col py-9 gap-3'>
      {/* <h1 className='text-xl font-bold'>Login</h1> */}
      <div className="flex items-center gap-4 justify-around">
        <span><img src={userIcon} alt="" /></span>
        <input 
        type="text" 
        placeholder='Username' 
        className='p-4 border-b border-grey-400 placeholder-grey-400 focus:border rounded-md focus:border-blue-500 focus:outline-none'
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="flex items-center gap-4 justify-around">
        <span><img src={passwordIcon} alt="" /></span>
        <input 
        type="password" 
        placeholder='Password' 
        className='p-4 border-b border-grey-400 placeholder-grey-400 focus:border rounded-md focus:border-blue-500 focus:outline-none' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <a href="#" className='text-end py-2 text-sm text-blue-400'>Don't have an account?</a>

      <button 
      className='py-4 px-10 bg-blue-400 rounded-2xl text-white-400'
      onClick={handleLogin}>
        Login
      </button>

    </div>
  )
}
