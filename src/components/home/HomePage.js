import { useState, useContext, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import Header from "./Header";
import { LogoutMenu } from "../common";
import { Posts } from "../common";

export default function HomePage ({ children }) {
  require("dayjs/locale/pt-br");
  const { authData } = useContext(UserContext);
  const [logoutButton, setLogoutButton] = useState(false);
  const privateRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutButton && privateRef.current && !privateRef.current.contains(event.target)) {
        setLogoutButton(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logoutButton]);

  return (
    <>
    {authData ? 
      <Private
        ref={privateRef} 
        onClick={() => {if (logoutButton) setLogoutButton(false)}} >
        <Header
          logoutButton={logoutButton}
          setLogoutButton={setLogoutButton}/>
        <LogoutMenu logoutButton={logoutButton} />
        <main>
          <Posts/>
        </main>
      </Private>
      : <Navigate to="/" />}
    </>
  );
}

const Private = styled.section` > main {
  width: 100%;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

main > div {
  width: 100%;
  height: 94px;
  background-color: #FFFFFF;
  padding: 13px 13px 13px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
main > div > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
form {
  width: 503px;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
}
span {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
span h5 {
  margin-right: 23px;
  cursor: pointer;
}
main ul {
  display: flex;
}`;