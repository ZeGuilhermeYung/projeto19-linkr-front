import styled from "styled-components";
import AuthContext from "../../context/AuthContext";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header ( {username, photo, logoutButton, setLogoutButton} ) {
  const { setToken } = useContext(AuthContext);
  
  function logout() {
    localStorage.removeItem("userData");
    setToken(undefined);
  }

  return (
    <div>
      <Top>
        <h1>linkr</h1>
        <button onClick={() => setLogoutButton(!logoutButton)} >
          { !logoutButton ? <UpArrow/> : <DownArrow/> }
          <h6>Olá,<br/>{username}!</h6>
          <img data-test="avatar" src={photo} alt="" />
        </button>
      </Top>
      {logoutButton ?
      <Link to="/">
        <Logout data-test="menu" >
          <div data-test="logout" onClick={() => logout()}>
            <h4>Logout</h4>
          </div>
        </Logout>
      </Link>  : null}     
    </div>
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

const Logout = styled.section`
  width: 150px;
  height: 47px;
  background-color: #171717;
  border-radius: 0 0 0 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0px;
  top: 70px;
  z-index: 5;
  box-sizing: border-box;

div {
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding-bottom: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
}
  
div h4 {
  font-size: 17px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.85px;
}`;