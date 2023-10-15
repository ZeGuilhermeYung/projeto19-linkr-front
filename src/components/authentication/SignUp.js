import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../services/APIs.js";
import { AuthScreen, Button, Input, Loading } from "../common/index.js";

export default function SignUp () {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    photo: "",
    password: ""
  });

  function handleInput(event) {
    setForm( {...form, [event.target.name]: event.target.value} );
  }

  function handleSubmit (event) {
    event.preventDefault();
    setDisabled(true);

    signUpUser(form)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
        setDisabled(false);
      });
  }

  return (
    <AuthScreen>
      <form onSubmit={handleSubmit} >
        <Input data-test="email" type="email" name="email" onChange={handleInput} value={form.email} placeholder="e-mail" disabled={disabled} />
        <Input data-test="password" type="password" name="password" onChange={handleInput} value={form.password} placeholder="password" disabled={disabled} />
        <Input data-test="username" type="text" name="username" onChange={handleInput} value={form.username} placeholder="username" disabled={disabled} />
        <Input data-test="picture-url" type="url" name="photo" onChange={handleInput} value={form.photo} placeholder="picture url" disabled={disabled} />
        {disabled ? <Loading size="large" /> : <Button data-test="sign-up-btn" title="Sign Up" size="large" disabled={disabled} />}
      </form>
      <Link data-test="login-link" to="/" >
        <h6>Switch back to log in</h6>
      </Link>
    </AuthScreen>
  );
}