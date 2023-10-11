import styled from "styled-components";

export default function Button ( {title, size, disabled, clickFunction} ) {
  return (
    <Wrapper title={title} size={size} onClick={clickFunction} disabled={disabled} >
      <p>{title}</p>
    </Wrapper>
  );
}

const Wrapper = styled.button`
width: ${props => (
  (props.size === "large") ? "100%"
  : (props.size === "small") ? "84px"
  : "40px")};
height: ${props => (
  (props.size === "large") ? "65px"
  : "35px")};
border-radius: 6px;
background: #1877F2;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
box-sizing: border-box;

p {
  font-size: ${props => (
  (props.size === "large") ? "27px"
  : (props.size === "small") ? "16px"
  : "27px")};
  line-height: ${props => (
  (props.size === "large") ? "normal"
  : (props.size === "small") ? "20px"
  : "27px")};
  font-weight: ${props => (
  (props.size === "large") ? "700"
  : (props.size === "small") ? "normal"
  : "700")};
  text-align: center;
  color: #FFFFFF;
}`;