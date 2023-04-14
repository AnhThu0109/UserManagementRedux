import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../../utils/registerUser';
import "./style.css";
import { message } from 'antd';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [success, setSuccess] = useState(true);
  const [errMess, setErrMess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let user = {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "gender": gender,
        "isAdmin": false,
      }
      const response = await registerUser(user);
      if (response.ok){
        const data = await response.json();
        message.success("Your account has been created successfully !!!");
        navigate("/login");
      } else {
        const data = await response.json();
        setSuccess(false);
        if(data.keyValue.username){
          setErrMess(`Username ${data.keyValue.username} is already taken. Please try another.`); 
        }
        if(data.keyValue.email){
          setErrMess(`Email ${data.keyValue.email} is already taken. Please try another.`); 
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='py-4 signinContent'>
      <h4 className='fw-lighter text-center'>Create an account</h4>
      <form onSubmit={handleSubmit} className="pt-4 border p-sm-3 p-lg-4 rounded-3 bg-white signinForm">
        <div className='row mb-2'>
          <div className='col'>
            <label>First name:</label>
            <input type="text" id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)} className="form-control border border-3" required />
          </div>
          <div className='col'>
            <label>Last name:</label>
            <input type="text" id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)} className="form-control border border-3" required />
          </div>
        </div>
        <label>Username:</label>
        <input type="text" id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} className="form-control border border-3 mb-2" required />

        <label>Email:</label>
        <input type="email" id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} className="form-control border border-3 mb-2" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required placeholder='Ex: abc@gmail.com'/>

        <label>Password:</label>
        <input type="password" id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} className="form-control border border-3 mb-2" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 4 or more characters" required />

        <label>Gender:</label>
        <select className="form-select border border-3" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male" readOnly>Male</option>
          <option value="Female" readOnly>Female</option>
        </select>

        <button type="submit" className='mt-3 mb-3 mx-0 text-white btn btn-secondary formLoginBtn'>Submit</button>
      </form>

      {
          success == false && (
            <h5 className='text-danger pt-4 text-center'>{errMess}</h5>
          )
        }
    </div>
  );
}

export default Register;
