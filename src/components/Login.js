import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory()
  const error = "";
  //replace with error state

  const defaultState = {
    credentials: {
      username: "",
      password: "",
    },
    error : ""
  };

  const [state,setState]=useState(defaultState)
  const handleChange = (e) => {
    setState({ ...state,
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //1. Make an axios request to our login route.
    //2. If request is valid, get the token.
    //3. Save the token from the request in localStorage.
    //4. if error, console.log error
    console.log(state.credentials);

    axios
      .post("http://localhost:5000/api/login", state.credentials)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch((err) => {
        console.log(err.response.data);
          setState({ ...state,
            error: err.response.data.error
          });
        

      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <label>username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={state.credentials.username}
            onChange={handleChange}
          />
          <label>password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={state.credentials.password}
            onChange={handleChange}
          />
          <button id="submit" >Log in</button>
        </form>
      </div>

      <p id="error" className="error">
        {state.error}
      </p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
