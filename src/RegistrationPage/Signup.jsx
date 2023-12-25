import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const api_url = process.env.REACT_APP_API_URL

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => { // Add 'async' here
    event.preventDefault();

    const formData = new FormData(event.currentTarget);


    const payload = {
      uname: formData.get('userName'),
      email: formData.get('email'),
      password: formData.get('password'),
      password2: formData.get('password2'),
    };

    if (payload.uname === '' || payload.email === '' || payload.password === '' || payload.password2 === '') {
      setErrorMessage('Please fill in all fields.');
      setSuccessMessage('');
      return;
    }
    if (payload.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setSuccessMessage('');
      return;
    }

    if (payload.password !== payload.password2) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }
    try {
      const response = await fetch(`${api_url}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
        navigate('/');
      } else {
        const data = await response.json();
        console.log(data);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }

        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image" style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: '600px' }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data' >
              <div className="mb-4">
                <label htmlFor="form1" className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="form1"
                  name="userName"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="form2" className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="form2"
                  name="email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="form3" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control form-control-lg"
                    id="form3"
                    name="password"
                  />
                  <button
                    className="input-group-text"
                    type='button'
                    onClick={handlePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="form4" className="form-label">Repeat Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="form4"
                  name="password2"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg mb-4 w-100">
                Register
              </button>
              {successMessage && <p className="text-success">{successMessage}</p>}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Signup;
