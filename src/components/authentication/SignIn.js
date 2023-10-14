import { useState , useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInUser } from "../../services/APIs.js";
import { AuthScreen, Button, Input, Loading } from "../common/index.js";

export default function SignIn () {
  const { token, setToken } = useContext(AuthContext);
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

    signInUser(form)
      .then((res) => {
        localStorage.clear();
        setToken(res.data.token);
        const userAuth = JSON.stringify({
          token: res.data.token,
          username: res.data.username,
          photo: res.data.photo
        });
        localStorage.setItem("userData", userAuth);
        console.log(userAuth);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setDisabled(false);
      });
  }

  return (
    <>
      { authData ? <Navigate to="/timeline" />
        : <AuthScreen>
            <form onSubmit={handleSubmit} >
              <Input data-test="email" type="email" name="email" onChange={handleInput} value={form.email} placeholder="e-mail" disabled={disabled} />
              <Input data-test="email" type="password" name="password" onChange={handleInput} value={form.password} placeholder="password" disabled={disabled} />
              {disabled ? <Loading size="large" /> : <Button data-test="login-btn" title="Log In" size="large" disabled={disabled} />}
            </form>
            <Link data-test="sign-up-link" to="/sign-up" >
              <h6>First time? Create an account!</h6>
            </Link> 
          </AuthScreen>}
    </>
  );
}
