import React, { useState } from 'react';
import './signin.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
const app_uri = process.env.REACT_APP_API_URL

console.log("url",app_uri);
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${app_uri}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data of page :",data)

      if(response.status === 402){
        setMessage("User has no Login access",response.message);
        navigate("/");
      }

      if (response.status === 200) {
        if (data.message === 'Login successful') {
          console.log("data134",data)
          sessionStorage.setItem("displayName", data.user.name); 
          setMessage('Login successful');
          sessionStorage.setItem('loginSession', data.user.token) ;
          sessionStorage.setItem('userId', data.user.userId) ;
          sessionStorage.setItem('userProfile',data.user.userProfile);
console.log('✌️sessionStorage --->', sessionStorage);
          navigate('/sendcall'); // Navigate to the "/sendcall" page after successful login.
        } else {
          setMessage('Login failed. Please check your credentials.');
        }
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  // Check if the user is authenticated and only render the component if not authenticated
  // const token = sessionStorage.getItem('loginSession')
  // if (token) {
  //   // User is already authenticated, redirect them to another page
  //   navigate('/sendcall');
  //   return null; // No need to render anything
  // }


  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://niveshartha.com./assets/images/NiveshImg/logo/dark_logo.svg"
                style={{ width: '150px' }}
                alt="logo"
              />
              <h4 className="mt-3 mb-5 pb-1">We are The Niveshartha Team</h4>
            </div>

            <p>Please login to your account</p>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-center pt-1 mb-1 pb-1">
              <button
                type="submit"
                className="btn btn-primary btn-lg mb-4 w-100"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
            <div className="text-center mx-1 text-danger ">{message}</div>

            {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <button type='button' className='mx-2 btn btn-warning '>
                <Link to='/signup' className='text-white'> Sign Up</Link>
              </button>
            </div> */}
          </div>
        </MDBCol>


        <MDBCol col="6">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignIn;
