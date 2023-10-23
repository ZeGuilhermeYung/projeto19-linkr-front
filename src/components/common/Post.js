import React, { useState, useEffect } from "react";
import { Parser } from "htmlparser2";
import styled from "styled-components";
import { PiPencilBold } from "react-icons/pi";
import { TbTrashFilled } from "react-icons/tb";
import { getCorsProxyUrl } from "../../services/APIs";
import noImage from "../../assets/img/no_image.png";
import LikeHeart from "./LikeHeart";

const getPreviewData = (tags) => {
  const result = tags.reduce((previewData, item) => {
      switch(item.tag) {
        case 'og:title': previewData.title = item.value;
          break;
        case 'og:description': previewData.description = item.value;
          break;
        case 'og:image': previewData.image = item.value;
          break;
        default: break;
      }
    return previewData;
  }, {});

  return Promise.resolve(result);
}

const parseHTML = (html) => {
  return new Promise((resolve, reject) => {
    const meta = [];
    const parser = new Parser({
      onopentag(name, attribs) {
        if (name === 'meta' && attribs.property && attribs.content) {
          meta.push({ tag: attribs.property, value: attribs.content });
        }
      },
      onend() {
        resolve(meta);
      },
    });

    parser.write(html);
    parser.end();
  });
};

const getUrl = (text) => {
  const a = document.createElement('a');
  a.href = text;

  const { protocol, host, pathname, search, hash } = a;

  const url = `${protocol}//${host}${pathname}${search}${hash}`;

  const isSameHost = (host === window.location.host);

  if (isSameHost) return null;
  
  return url;
};

export default function Post ( {
  id,
  userId,
  url,
  description,
  likes,
  username,
  photo,
  setRefreshPosts} ) {
  const [disabled, setDisabled] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [form, setForm] = useState({ description: "" });
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const newUrl = getUrl(url);
      try {
        const response = await getCorsProxyUrl(newUrl);
        const html = response.data;
        const meta = await parseHTML(html);
        console.log(meta); 
        const data = await getPreviewData(meta);

        setPreviewData(data);

      } catch (error) {
        console.error('Erro ao buscar informações da URL', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <Section data-test="post">
      <LikesDiv>
        <div>
          <img src={photo} alt="user profile image" />
            <LikeHeart
              like={like}
              setLike={setLike} />
          <h6>{likeCount} likes</h6>
        </div>
      </LikesDiv>
      <LinkContent>
        <CardHeader>
          <h4>{username}</h4>
          <div>
            <EditButton/>
            <DeleteButton/>
          </div>
        </CardHeader>
        <DescriptionBox>
          <h5>{description}</h5>
        </DescriptionBox>
        {previewData ?
          <UrlBox
            href={url}
            target="_blank"
            onClick={() => {
              window.open(url, '_blank')}} >
            <TextBox>
              <DivTitle>
                <Title>{previewData.title}</Title>
              </DivTitle>
              <DivDescription>
                <Description>{previewData.description}</Description>
              </DivDescription>
              <DivUrl>
                <h6>{url}</h6>
              </DivUrl>    
            </TextBox>
            <ImageUrl>
              <LinkImage
                src={previewData.image ? previewData.image : noImage}
                alt={previewData.title} />
            </ImageUrl>
          </UrlBox>
        : <h4>Caregando...</h4>}       
      </LinkContent>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  height: 276px;
  border-radius: 16px;
  background-color: #171717;  
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 22px 16px 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const LikesDiv = styled.div`
  width: 87px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 19px;
  }
  h6 {
    margin-top: 4px;
  }`

const LinkContent = styled.div`
  width: 503px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;`

const CardHeader = styled.div`
  width: 100%;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const DescriptionBox = styled.div`
  width: 100%;
  height: 52px;
  margin: 8px 0 10px 0;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;`

const UrlBox = styled.button`
  width: 100%;
  height: 155px;
  border-radius: 11px;
  border: 1px solid #4D4D4D;
  background-color: rgba(196, 196, 196, 0.00);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 23px 27px 43px 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;`

const DivTitle = styled.div`
  width: 250px;
  height: 38px;
  text-align: left;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;`

const Title = styled.h5`
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;     
  color: #CECECE;`

const DivDescription = styled.div`
  width: 303px;
  height: 39px;
  margin: 5px 0 13px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;`

const Description = styled.h6`
  width: 303px;
  height: 39px;
  color: #9B9595;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;`

const DivUrl = styled.div`
  width: 303px;
  height: 13px;
  h6 {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}`
  
const ImageUrl = styled.div` 
  width: 155px;
  height: 100%;
  border-radius: 0px 12px 13px 0px;
  box-sizing: border-box;`

const LinkImage = styled.img` 
  width: 100%;
  height: 100%;
  border-radius: 0px 12px 13px 0px;
  object-fit: cover;
  box-sizing: border-box;`

const EditButton = styled(PiPencilBold)`
  font-size: 17px;
  color: #FFFFFF;
  margin-right: 10px;`

const DeleteButton = styled(TbTrashFilled)`
  font-size: 17px;
  color: #FFFFFF;

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