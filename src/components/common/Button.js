import styled from "styled-components";

export default function Button ( {
  dataTest,
  title,
  size,
  disabled,
  clickFunction} ) {
  return (
    <Wrapper
      data-test={dataTest}
      title={title}
      size={size}
      onClick={clickFunction}
      disabled={disabled}
    >
      <p>{title}</p>
    </Wrapper>
  );
}

const Wrapper = styled.button`
width: ${props => (
  (props.size === "large") ? "100%"
  : (props.size === "small") ? "112px"
  : "40px")};
height: ${props => (
  (props.size === "large") ? "31px"
  : "35px")};
border-radius: ${props => (
(props.size === "large") ? "6px"
: "5px")};
background: #1877F2;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
box-sizing: border-box;

p {
  font-family: ${props => (
  (props.size === "large") ? 'Oswald'
  : (props.size === "small") ? 'Lato'
  : 'Passion One')};
  font-size: ${props => (
  (props.size === "large") ? "27px"
  : (props.size === "small") ? "14px"
  : "27px")};
  font-weight: 700;
  text-align: center;
  color: #FFFFFF;
}`;