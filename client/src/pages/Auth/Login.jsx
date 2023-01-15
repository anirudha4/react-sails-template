import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { requestLogin } from './saga';

function Login() {
  // get dispatch
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestLogin(form));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map(key => {
          return (
            <input key={key} type={key} placeholder={key} onChange={e => setForm({ ...form, [key]: e.target.value })} />
          )
        })}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
