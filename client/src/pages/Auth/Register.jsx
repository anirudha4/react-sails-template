import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { requestRegister } from './saga';

function Register() {
  // get dispatch
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(requestRegister(form));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map(key => {
          return (
            <input key={key} type={key} placeholder={key} onChange={e => setForm({ ...form, [key]: e.target.value })} />
          )
        })}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;
