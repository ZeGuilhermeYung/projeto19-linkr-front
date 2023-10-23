import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

export default function LikeHeart ( {
  like,
  setLike} ) {
  
  
  return (
    <LikeButton
      data-test="like-btn"
      onClick={() => setLike(!like)} >
      {like ?
        <HeartFull />
      : <HeartEmpty />}
    </LikeButton>
  );
}

const LikeButton = styled.button`
  width: 20px;
  height: 20px;`

const HeartEmpty = styled(FaRegHeart)`
  font-size: 20px;
  color: #FFFFFF;`

const HeartFull = styled(FaHeart)`
  font-size: 20px;
  color: #AC0000;`