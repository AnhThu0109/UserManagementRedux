import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginUser from '../../utils/loginUser';
import { addLoginTimes, getLoginTimesByUserId, updateLoginTimes } from '../../utils/loginTimes';
import "./style.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(true);
  const [errMess, setErrMess] = useState("");
  const [token, setToken] = useState(1);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Update login time when user login to system --> logintime data use for chart in dashboard 
  //Login at the first time ==> create login times with default = 1 || login times += 1
  const handleUpdateLoginTimes = async (id) => {
    try{
      //check for login times of this user existed or not
      const response = await getLoginTimesByUserId(id)
      if(response.ok ){
        const data = await response.json();
        const loginTimes = data.logintime;
        await updateLoginTimes(id, loginTimes);
      }
      else{
        await addLoginTimes(id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Submit function for login form
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      "username": username,
      "password": password,
    }
    try {
      const response = await loginUser(user);
      console.log(response);
      if (response.ok){
        const data = await response.json();
        handleUpdateLoginTimes(data._id);

        //Set needed localStorage (token, id, firstname, active of side nav, isAdmin)
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        localStorage.setItem("id", data._id);
        localStorage.setItem("userFirstName", data.firstname);
        localStorage.setItem("active", 1);
        localStorage.setItem("isAdmin", data.isAdmin);
        setToken(data.accessToken);       
        navigate("/home");
      }   
      else if (response.status === 404) { // handle 404 error for checking wrong password
        setIsAuth(false);
        setErrMess("Incorrect password");
      } else { //wrong username ==> error 500
        setIsAuth(false);
        setErrMess("User not found");
      }
    } catch (error) {
      console.error(error);   
    }
  };


  return (
    <div className='p-5 ms-lg-5 ms-sm-3 mt-lg-4 mt-sm-3'>
      <div className='loginForm'>
        <h4 className='fw-lighter text-center'>Login to your account<br></br>
          <small className='text-black-50 textLogin'>Please log in to see more information.</small>
        </h4>     
        <div>
        <form onSubmit={handleSubmit} className="py-4 border p-sm-3 p-lg-4 rounded-3 bg-white">
          <div className='mb-sm-2 mb-lg-3 login-input-div'>
            <label htmlFor="text" className='form-label'>Username:</label>
            <input
              className='form-control border border-3'
              type="input"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          
          <div className='mb-sm-2 mb-lg-3 login-input-div'>
            <label htmlFor="password" className='form-label'>Password:</label>
            <input
              className='form-control border border-3'
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className='mt-3 mb-3 text-white btn btn-secondary formLoginBtn'>Login</button><br></br>
          <small className='ms-2 text-secondary textRegister'>Don't have an account?<Link to="/register" className='text-decoration-none'> Created here!</Link></small>
        </form>
        </div>     

        {/* Show error message if wrong username or wrong password */}
        {
          isAuth == false && (
            <h5 className='text-danger pt-4 text-center'>{errMess}. Please type again.</h5>
          )
        }
      </div>
    </div>
  );
};

export default Login;
