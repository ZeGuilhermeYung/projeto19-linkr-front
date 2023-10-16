import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function Header ( {logoutButton, setLogoutButton} ) {
  const { username, photo } = useContext(UserContext).authData;

  return (
    <Top>
      <h1>linkr</h1>
      <button onClick={() => setLogoutButton(!logoutButton)} >
        { !logoutButton ? <UpArrow/> : <DownArrow/> }
        <h6>Olá,<br/>{username}!</h6>
        <img data-test="avatar" src={photo} alt="user profile image" />
      </button>
    </Top>       
  );
}

const Top = styled.header`
width: 100%;
height: 70px;
background-color: #151515;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
padding: 10px 18px 10px 28px;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
left: 0px;
top: 0px;
z-index: 5;
box-sizing: border-box;

button {
  width: auto;
  height: auto;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button img {
  width: 51px;
  height: 51px;
  border-radius: 50%;
  object-fit: cover;
}

button h6 {
  width: auto;
  height: auto;
  max-width: 200px;
  max-height: 50px;
  font-size: 14px;
  text-align: center;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}`

const DownArrow = styled(MdKeyboardArrowDown)`
  font-size: 40px;
  color: #FFFFFF;
  margin-right: 10px;`

const UpArrow = styled(MdKeyboardArrowUp)`
  font-size: 40px;
  color: #FFFFFF;
  margin-right: 10px;`