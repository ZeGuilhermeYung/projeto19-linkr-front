import styled from "styled-components";

export default function AuthScreen ( {children} ) {
  return (
    <Main>
      <BannerSection>
        <Banner>
          <Title>linkr</Title>
          <Slogan>
            <SloganText>save, share and discover<br/>the best links on the web</SloganText>
          </Slogan>
        </Banner>
      </BannerSection>
      <FormSection>
        {children}
      </FormSection>
    </Main>
  );
}

const Main = styled.main`
width: 100%;
height: 100vh;
background-color: #151515;
display: flex;`

const BannerSection = styled.section`
width: 100%;
height: 100vh;
color: #FFFFFF;
display: flex;
flex-direction: column;`

const Banner = styled.article`
width: 442px;
height: 245px;
margin-top: 301px;
margin-left: 144px;
display: flex;
flex-direction: column;`

const Title = styled.h1`
font-size: 106px;
letter-spacing: 5.3px;`

const Slogan = styled.div`
height: 128px;
display: flex;
flex-direction: column;
align-items: center;`

const SloganText = styled.p`
color: #FFFFFF;
font-size: 43px;
font-style: normal;
font-weight: 700;
line-height: normal;`

const FormSection = styled.section`
width: 535px;
height: 100vh;
background-color: #333333;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

form {
  width: 535px;
  padding: 0 53px 14px 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
h6 {
  color: #FFFFFF;
  font-family: 'Lato';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
}`;