import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllPosts } from "../api/post";
import { useSelector } from "react-redux";
import PostCard from "../components/Home/PostCard";
import { Box, Button, Divider, Input, Textarea } from "@chakra-ui/react";

export default function Post(token) {
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const userStore = useSelector((store) => store.userStore);
  useEffect(async () => {
    console.log("POST PAGE");
    console.log(userStore)
    if (userStore.token) {
      try {
        const allPosts = await getAllPosts({ token: userStore.token });
        const postres = allPosts.filter((p) => p.id == id);
        setPost(postres[0])
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  }, [userStore]);

  return (
    <Box w="600px" maxW="95%" m="auto">
      
      {/* { post &&  */}
      <PostCard
            whichPage={1}
            postId={1}
            user={post.user}
            caption={"HOLA"}
            createdAt={new Date().toDateString()}
            media={null}
            mediaType={1}
            ></PostCard>
      {/* } */}
    </Box>
  );
}
