import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/APIs.js";
import { AuthScreen, Button, Input, Loading } from "../common/index.js";

export default function SignIn () {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const authData = JSON.parse(localStorage.getItem("userData"));
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleInput (event) {
    setForm( {...form, [event.target.name]: event.target.value} );
  }

  function handleSubmit (event) {
    event.preventDefault();
    setDisabled(true);

    loginUser(form)
      .catch((error) => {
        alert(error.message);
        setDisabled(false);
      })
      .then((userInfo) => {
        localStorage.clear();
        const userAuth = JSON.stringify({ token: userInfo.data.token, name: userInfo.data.name, image: userInfo.data.image });
        localStorage.setItem("userData", userAuth);
        navigate("/hoje");
      });
  }

  return (
    <>
      {authData ? <Navigate to="/hoje" />
        : <AuthScreen>
            <form onSubmit={handleSubmit} >
              <Input type="email" name="email" onChange={handleInput} value={form.email} placeholder="e-mail" disabled={disabled} />
              <Input type="password" name="password" onChange={handleInput} value={form.password} placeholder="password" disabled={disabled} />
              {disabled ? <Loading size="large" /> : <Button title="Log In" size="large" disabled={disabled} />}
            </form>
            <Link to="/cadastro" >
              <h6>First time? Create an account!</h6>
            </Link> 
          </AuthScreen>}
    </>
  );
}
