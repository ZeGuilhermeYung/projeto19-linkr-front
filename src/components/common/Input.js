import { useState } from "react";
import styled from "styled-components";

export default function Input ( {
  dataTest,
  size,
  type,
  name,
  onChange,
  value,
  placeholder,
  disabled} ) {
  const [visible, setVisible] = useState("eye-off-outline");
  const [visiblePassword, setVisiblePassword] = useState("password");

  function showPassword () {
    if (visible === "eye-off-outline") {
      setVisible("eye-outline");
      setVisiblePassword("text");
    } else {
      setVisible("eye-off-outline");
      setVisiblePassword("password");
    }
  }
  return (
    <>
      {name === "photo" ? 
      <Wrapper
        data-test={dataTest}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      : name === "password" ? 
      <Div>
        <Wrapper
          data-test={dataTest}
          type={visiblePassword}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required
        />
        <ion-icon
          name={visible}
          onClick={showPassword} >
        </ion-icon>
      </Div>
      : name === "url" ?
      <WrapperUrl
        data-test={dataTest}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
      : name === "description" ?
      <WrapperDescription
        data-test={dataTest}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
      : 
      <Wrapper
        data-test={dataTest}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
      }  
    </>
  );
}

const Wrapper = styled.input`
width: 100%;
height: 65px;
font-family: 'Oswald';
font-size: 27px;
font-style: normal;
font-weight: 700;
line-height: normal;
color: #151515;
background-color: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 6px;
padding-left: 17px;
padding-bottom: 8px;
margin-bottom: 13px;
box-sizing: border-box;`

const WrapperUrl = styled.input`
width: 100%;
height: 30px;
font-family: 'Lato';
font-size: 15px;
font-weight: 700;
color: #151515;
background-color: #EFEFEF;
border-radius: 5px;
padding: 5px 13px 7px 13px;
margin-bottom: 5px;
box-sizing: border-box;`

const WrapperDescription = styled.textarea`
width: 100%;
height: 66px;
font-family: 'Lato';
font-size: 15px;
font-weight: 700;
color: #151515;
background-color: #EFEFEF;
word-break: break-word;
border-radius: 5px;
padding: 5px 13px 7px 13px;
margin-bottom: 5px;
box-sizing: border-box;;

:focus-visible {
  outline: none;
}
:-webkit-autofill {
  background-color: #1877F2;
  opacity: 0.7;
}
:disabled {
  color: #9F9F9F;
  background-color: #F2F2F2;
}
`;
const Div = styled.div`
width: 100%;
position: relative;

ion-icon {
  font-size: 30px;
  color: #DBDBDB;
  position: absolute;
  bottom: 30px;
  right: 17px;
}`;