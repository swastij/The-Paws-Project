import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { GoKebabVertical } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RWebShare } from "react-web-share";
import { Button } from "@chakra-ui/button";
import { deletePost } from "../../api/post";

const PostCard = ({
  postId,
  author,
  name,
  animal_type,
  breed,
  gender,
  isVaccinated,
  isDewormed,
  edited,
  images,
  onDeleted
}) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);

  const handleDelete = async () => {
    try{
      await deletePost(postId, userStore.token)
      onDeleted();
    }catch(e){

    }
  }

  const handleShowUser = () => {
    history.push(`/user/${author._id}`);
  };

  useEffect(() => {
    if (userStore.token) {
      console.log(userStore);
    }
  }, [userStore]);

  return (
    <Box
      boxShadow="lg"
      w="100%"
      display="flex"
      flexDirection="column"
      borderRadius="8px"
      marginBottom="16px"
    >
      <Box
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          cursor="pointer"
          onClick={handleShowUser}
        >
          <img
            style={{
              objectFit: "cover",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
            }}
            src={`https://ui-avatars.com/api/?name=${
              author.first_name + author.last_name
            }`}
            alt="author"
          />
          <Box marginLeft="8px">
            <p>{author.username}</p>
            <p style={{ fontSize: 10 }}>{edited}</p>
          </Box>
        </Box>
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="32px"
            w="32px"
            cursor="pointer"
            border="1px solid #edf2f7"
            borderRadius="8px"
          >
            <GoKebabVertical />
          </Box>
        </Box>
      </Box>
      {images.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            style={{
              objectFit: "cover",
              height: "650px",
              width: "100%",
            }}
            src={images[0].url}
            alt="media"
          />
        </Box>
      )}

      <Box p={2}> NAME: {name}</Box>
      <Box p={2}> TYPE: {animal_type} </Box>
      <Box p={2}> BREED: {breed} </Box>
      <Box p={2}> VACCINATED`: {isVaccinated ? "YES" : "NO"} </Box>
      <Box p={2}> DEWORMED: {isDewormed ? "YES" : "NO"} </Box>
      <Box p={2}> GENDER: {gender} </Box>
      <Box  p={2} display="flex" alignItems="center" justifyContent="space-between">
        <Button flex="1" colorScheme="blue">
          <RWebShare
            data={{
              text: "Hey! Help me in finding forever home",
              url: `http://localhost:3000/posts/${postId}`,
              title: "Adopt me!",
            }}
          >
            <button>Share 🔗</button>
          </RWebShare>
        </Button>
        {userStore.user._id == author._id && <Box width="20px"/>}
        {userStore.user._id == author._id && <Button onClick={handleDelete} colorScheme="red" flex="1">Delete</Button>}
      </Box>
    </Box>
  );
};

export default PostCard;
