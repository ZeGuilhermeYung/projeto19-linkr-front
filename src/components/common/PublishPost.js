import { useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import Input from "./Input";
import Button from "./Button";
import { publishPost } from "../../services/APIs";


export default function PublishPost ( {setRefreshPosts} ) {
  const { photo } = useContext(UserContext).authData;
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    url: "",
    description: ""
  });

  function handleInput (event) {
    setForm( {...form, [event.target.name]: event.target.value} );
  }

  function handleSubmit (event) {
    event.preventDefault();
    setDisabled(true);

    publishPost(form)
      .then((res) => {
        console.log(res);
        setForm({
          url: "",
          description: ""
        });
        setRefreshPosts(true);
        setDisabled(false);
      })
      .catch((error) => {
        alert("Houve um erro ao publicar seu link");
        console.log(error);
        setDisabled(false);
      });
  }

  return (
    <Section data-test="publish-box">
      <div>
        <img src={photo} alt="user profile image" />
      </div>
      <form onSubmit={handleSubmit} >
        <h4>What are you going to share today?</h4>
        <Input
          dataTest="link"
          type="url"
          name="url"
          onChange={handleInput}
          value={form.url}
          placeholder="Post the URL link here..."
          disabled={disabled} />
        <Input
          dataTest="description"
          type="text"
          name="description"
          onChange={handleInput}
          value={form.description}
          placeholder="Describe your post here..."
          disabled={disabled} />
        {disabled ? <p>Publishing...</p>
          : <Button
              dataTest="publish-btn"
              title="Publish"
              size="small"
              disabled={disabled} />}
      </form>
    </Section>
  );
}

const Section = styled.section`
width: 100%;
height: 209px;
border-radius: 16px;
background-color: #FFFFFF;  
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
padding: 16px 22px 16px 18px;
margin-bottom: 29px;
display: flex;
align-items: center;
justify-content: space-between;
box-sizing: border-box;

div {
  width: 68px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
h4 {
  color: #707070;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 15px;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
p {
  font-family: 'Lato';
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: #FFFFFF;
};
button {
  align-self: flex-end;
}
::placeholder, ::-webkit-input-placeholder, :-webkit-autofill {
  color: #949494;
  font-family: 'Lato';
  font-size: 15px;
  font-weight: 300;
}`