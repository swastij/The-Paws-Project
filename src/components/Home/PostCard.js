import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { GoKebabVertical } from "react-icons/all";
import { RWebShare } from "react-web-share";

import { postNotification } from "../../api/user";
import { useHistory } from "react-router-dom";
import { Input } from "@chakra-ui/input";
import {
  createComment,
  createLike,
  getComments,
  getLikes,
  removeLike,
} from "../../api/post";
import { useDispatch, useSelector } from "react-redux";
import socialfire from "../../socialfire";
import { toast } from "react-toastify";

const PostCard = ({
  user,
  caption,
  media,
  postId,
  likesNum,
  commentsNum,
  createdAt,
  mediaType,
  whichPage,
}) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(-1); // -1 => not loaded, 0 => not liked, 1 => liked
  const [notifs, setNotifs] = useState(null);

  const dispatch = useDispatch();
  const commentRef = useRef();
  const userStore = useSelector((store) => store.userStore);

  const handleOpenPost = () => {
    history.push(`/post/${postId}`);
  };

  useEffect(() => {
    if (userStore.token) {
      handleFetchComments();
      handleFetchLikes();
    }
  }, [userStore]);

  const handleCreateComment = async () => {
    try {
      await createComment({
        token: userStore.token,
        post: postId,
        text: comment,
      });
      setComment(null);
      commentRef.current.value = null;
      handleNotification(userStore.user,user, postId, false);
      await handleFetchComments();
    } catch (e) {}
  };
  const handleNotification = async (fromUser, toUser, postId, message) => {
    try {
      const res = await postNotification({
        fromUser: fromUser,
        toUser: toUser,
        postId: postId,
        message: message,
      });
      if (res) {
        setNotifs(res);
        toast(res);
      } else {
        console.log(res);
      }
    } catch (e) {
      console.log("error is", e);
    }
  };
  const handleCreateLike = async () => {
    try {
      await createLike({
        token: userStore.token,
        post: postId,
      });
      console.log("on liking", userStore.user,user, postId, 0);
      handleNotification(userStore.user,user, postId, true);
      handleFetchLikes();
    } catch (e) {}
  };

  const handleDeleteLike = async () => {
    try {
      await removeLike({
        token: userStore.token,
        post: postId,
      });
      handleFetchLikes();
    } catch (e) {}
  };

  const checkLiked = () => {
    const isLiked = likes.filter(
      (like) => like.user.username === userStore.user.username
    );
    if (isLiked.length > 0) setLiked(1);
    else setLiked(0);
    return isLiked.length > 0;
  };

  const handleLike = () => {
    if (checkLiked()) handleDeleteLike();
    else handleCreateLike();
  };

  const handleFetchComments = async () => {
    try {
      const res = await getComments({ token: userStore.token, post: postId });
      setComments(res);
    } catch (e) {}
  };

  const handleFetchLikes = async () => {
    try {
      const res = await getLikes({ token: userStore.token, post: postId });
      setLikes(res);
    } catch (e) {}
  };

  useEffect(() => {
    checkLiked();
  }, [likes]);

  useEffect(() => {
    if (comment) setDisabled(false);
    else setDisabled(true);
  }, [comment]);

  const handleCreateChat = () => {
    socialfire
      .firestore()
      .collection("recentChats")
      .add({
        members: [userStore.user.id, user.id],
      })
      .then((v) => {
        toast("Chat room created");
      });
  };

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
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <img
            style={{objectFit: 'cover', height: "50px",width: '50px', borderRadius: "50%" }}
            src={`http://localhost:5000/file/${user.profile_pic}`}
            alt="author"
          />
          <Box marginLeft="8px">
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p style={{ fontSize: 10 }}>{createdAt}</p>
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
      {media.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          {mediaType == 1 ? (
            <video controls src={`http://localhost:5000/file/${media}`} />
          ) : (
            <img src={`http://localhost:5000/file/${media}`} alt="media" />
          )}
        </Box>
      )}
      <Box p={4}> {caption} </Box>

      <Box p={4}>
        <Box display="flex" justifyContent="space-between">
          <p> Likes {likes.length}</p>
          <p> Comments {comments && comments.length}</p>
        </Box>
        <Box marginTop="16px" display="flex" justifyContent="space-between">
          <Button colorScheme="purple" w="30%" onClick={handleLike}>
            {liked == -1 ? "" : liked == 0 ? "LIKE" : "DISLIKE"}
          </Button>
          <Button colorScheme="purple" w="30%" onClick={handleOpenPost}>
            Comment
          </Button>

          {/* <RWebShare
            data={{
              text: { caption },
              url: `http://localhost:3000/post/${postId}`,
              title: "Social Media App Name ",
            }}
            onClick={() => console.log("Shared successfully !")}
          >
            <Button w="30%">Share</Button>
          </RWebShare> */}
          <Button colorScheme="purple" w="30%" onClick={handleCreateChat}>
            Chat
          </Button>
        </Box>
      </Box>
      <Box p={4} display="flex">
        <Input
          ref={commentRef}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="What's on your mind?"
        />
        <Button colorScheme="purple" onClick={handleCreateComment} disabled={disabled}>
          Comment
        </Button>
      </Box>

      {whichPage == 1 &&
        comments &&
        comments.map((comment, index) => (
          <Box p={4} display="flex" alignItems="center" key={index}>
            <img
              style={{ borderRadius: "50%", height: "48px", width: "48px" }}
              src={comment.user.profile_pic}
            />
            <Box marginLeft="8px">
              <b>
                {comment.user.firstname} {comment.user.lastname}
              </b>{" "}
              &bull;{" "}
              <span style={{ fontSize: "12px" }}> {comment.created_at} </span>
              <p style={{ lineHeight: "14px" }}>{comment.text}</p>
            </Box>
          </Box>
        ))}

      {/* {whichPage == 10 &&
        comments &&
        comments.map((comment, index) => (
          <Box p={4} display="flex" alignItems="center" key={index}>
            <img
              style={{ borderRadius: "50%", height: "48px", width: "48px" }}
              src={comment.user.profile_pic}
            />
            <Box marginLeft="8px">
              <b>
                {comment.user.firstname} {comment.user.lastname}
              </b>{" "}
              &bull;{" "}
              <span style={{ fontSize: "12px" }}> {comment.created_at} </span>
              <p style={{ lineHeight: "14px" }}>{comment.text}</p>
            </Box>
          </Box>
        ))} */}
    </Box>
  );
};

export default PostCard;
