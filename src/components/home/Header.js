import styled from "styled-components";

export default function Header ( {username, photo} ) {
  return (
    <Top>
      <h1>linkr</h1>
      <div>
        <h6>Olá,<br/>{username}!</h6>
        <img src={photo} alt="" />
      </div>
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

div {
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div img {
  width: 51px;
  height: 51px;
  border-radius: 50%;
  object-fit: cover;
}
div h6 {
  width: auto;
  height: auto;
  max-width: 200px;
  max-height: 50px;
  font-size: 14px;
  text-align: center;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}`;