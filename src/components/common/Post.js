import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { PiPencilBold } from "react-icons/pi";
import { TbTrashFilled } from "react-icons/tb";
import { getCorsProxyUrl } from "../../services/APIs";
import noImage from "../../assets/img/no_image.png";

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
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);

  const meta = [];
  $ ('head meta').map((i, item) => {
    if (!item.attribs) return null;

    const property = item.attribs.property || null;
    const content = item.attribs.content || null;

    if (!property || !content) return null;

    meta.push({ tag: property, value: content });
  });

  return Promise.resolve(meta);
}

const getUrl = (text) => {
  const a = document.createElement('a');
  a.href = text;

  const { protocol, host, pathname, search, hash } = a;

  const url = `${protocol}//${host}${pathname}${search}${hash}`;

  const isSameHost = (host === window.location.host);

  if (isSameHost) return null;
  
  return url;
};

export default function Post ( { id, userId, url, description, likes } ) {
  const [disabled, setDisabled] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [form, setForm] = useState({ description: "" });
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const newUrl = getUrl(url);
      try {
        const response = await getCorsProxyUrl(url);
        const html = response.data;
        const meta = await parseHTML(html);
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
      <div>
        <img  alt="user profile image" />
        { like ? <HeartFull/> : <HeartEmpty/> }
        <h6>{likeCount} likes</h6>
      </div>
      <div>
        <div>
          
          <div>
            <EditButton/>
            <DeleteButton/>
          </div>
        </div>
        <DescriptionBox>
          <h5>{description}</h5>
        </DescriptionBox>
        {previewData ?
          <UrlBox>
            <TextBox>
              <Title>{previewData.title}</Title>
              <h5>{previewData.description}</h5>
              <h6>{url}</h6>
            </TextBox>
            <ImageUrl>
              <LinkImage
                src={previewData.image ? previewData.image : noImage}
                alt={previewData.title} />
            </ImageUrl>
          </UrlBox>
        : <h4>Caregando...</h4>}       
      </div>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  height: 209px;
  border-radius: 16px;
  background-color: #171717;  
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 22px 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const DescriptionBox = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 27px 43px 20px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const UrlBox = styled.div`
  width: 503px;
  height: 155px;
  border-radius: 11px;
  border: 1px solid #4D4D4D;
  background-color: rgba(196, 196, 196, 0.00);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const Title = styled.h5`
  width: 250px;
  height: 38px;
  font-size: 16px;
  color: #CECECE;`
  
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

const HeartEmpty = styled(FaRegHeart)`
  font-size: 20px;
  color: #FFFFFF;`

const HeartFull = styled(FaHeart)`
  font-size: 20px;
  color: #FFFFFF;`

const EditButton = styled(PiPencilBold)`
  font-size: 40px;
  color: #FFFFFF;
  margin-right: 10px;`

const DeleteButton = styled(TbTrashFilled)`
  font-size: 40px;
  color: #FFFFFF;

div {
  width: 68px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
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