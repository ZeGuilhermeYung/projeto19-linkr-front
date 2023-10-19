import { useState, useEffect } from "react";
import styled from "styled-components";
import PublishPost from "./PublishPost";
import Post from "./Post";
import { getPosts } from "../../services/APIs";

export default function Posts ( {} ) {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getPosts()
    .then(response => {
			setPosts(response.data);
		})
    .catch((error) => {
      alert(error.message);
    });
	}, []);

  return (
    <Article>
      <Title>
        <h2>timeline</h2>
      </Title>
      <PostsSection>
        <PublishPost/>
        {(posts.length === 0) ? <h3>There are no posts yet</h3>
            : posts.map((post, index) =>
            <Post
              key={index}
              id={post.id}
              userId={post.userId}
              url={post.url}
              description={post.description} 
              likes={post.likes} />)}
      </PostsSection>
    </Article>
  );
}
const Article = styled.article`
  width: 611px;
  height: 100%;
  margin: 53px 0 53px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;`

const Title = styled.div`
  width: 611px;
  height: 100%;
  margin-bottom: 43px;
  box-sizing: border-box;
  display: flex;`

const PostsSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

form {
  width: 100%;
  height: 180px;
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 18px 18px 15px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}
span {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
h3 {
  font-size: 24px;
  font-weight: 400;
}
span h5 {
  margin-right: 23px;
  cursor: pointer;
}
main ul {
  display: flex;
}`;