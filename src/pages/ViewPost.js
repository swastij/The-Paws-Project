import { Box } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { viewPost } from "../api/post";
import PostCard from "../components/Home/PostCard";
import moment  from "moment";
const ViewPost = () => {
  const [post, setPost] = React.useState(null);
  const userStore = useSelector(state => state.userStore);
  const history = useHistory();
  const handleViewPost = async () => {
    const id = window.location.href.split("/posts/")[1];
    try {
      const res = await viewPost(id);
      setPost(res);
      console.log("post- ", res);
    } catch (e) {
     
    }
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  React.useEffect(() => {
    if(userStore.token != "" || userStore.token != null){
        handleViewPost();
        return 
    }
    history.push("/login");
  }, []);

  return (
    <Box p={12} m="auto" w="1000px">
      {post != null && (
        <PostCard
          key={0}
          postId={post?._id}
          author={post?.author}
          name={post?.name}
          created={post?.created}
          images={post?.images}
          gender={post?.gender}
          breed={post?.breed}
          isVaccinated={post?.isVaccinated}
          isDewormed={post?.isDewormed}
          animal_type={post?.animal_type}
          onDeleted={handleNavigateHome}
        />
      )}
    </Box>
  );
};

export default ViewPost;
