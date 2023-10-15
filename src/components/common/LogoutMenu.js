import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function LogoutMenu ( { logoutButton } ) {
  const { setToken } = useContext(AuthContext);

  function logout() {
    localStorage.removeItem("userData");
    setToken(undefined);
  }

  return (
    <>
      {logoutButton ?
      <Link to="/">
        <Logout data-test="menu" >
          <div data-test="logout" onClick={() => logout()}>
            <h4>Logout</h4>
          </div>
        </Logout>
      </Link>  : null}
    </>
  );
}

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