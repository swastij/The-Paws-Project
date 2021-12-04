import { useSelector } from "react-redux";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/layout";
import { Button, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import propic from "../assets/propic.jpg";
import { getAllPosts } from "../api/post";
import PhotoCard from "../components/Home/PhotoCard";

export default function Profile() {
  const userStore = useSelector((store) => store.userStore);
  const history = useHistory();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  console.log(userStore.user.username);
  function handleEditProfile() {
    console.log("Edit Profile");
    history.push("/editprofile");
  }
  // useEffect(()=>{setUser(user)},[])
  const handleSendNotification = async () => {
    await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        data: {
          title: "Someone liekd your post",
          message: "body",
          key1: "val1",
        },
        to: "ezJ6T1AjAf4CeJr2vxkdto:APA91bFMCYiQHdBTt-GNNKxknKZkm_NMxx6utV-XB1m8km_JTIduBLJ-MyUCWQUwfaujmH6QlmbVNGwYPxUdckTq4ot_ojX_lU45ZUNl_AXqKWzHaXSeKMdIIZk7cBGsLhx3T3EepShE",
      },
      {
        headers: {
          Authorization:
            "key=AAAAxu9sbNw:APA91bH-Y9S2XJ3uiOj552zkJ4RVBwkCEe2k3fUZB7y1AiYyshve0qgJz_PiFoWm8dfqvI9RSokL4T8ZvzXWSzwSYrLpVbTp3VE2QT5BlbRkfTTTN34KggDBKklydGmwJJhBTKA5fwKI",
        },
      }
    );
  };

  const fetchAllPosts = async () => {
    if (userStore.token) {
      try {
        const posts = await getAllPosts({ token: userStore.token });
        setPosts(posts);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("token not found");
    }
  };

  useEffect(() => {
    if (userStore.token) fetchAllPosts();
  }, [userStore]);
  const handleChangePassword = () => {
    history.push("/change-password");
  };
  return (
    <div>
      <Flex direction="row" margin="0 auto" justifyContent="space-between" marginTop="100px"  w="70%">
        <Flex justify="center" w="50%" justifyContent="flex-start" alignItems="center">
          <Image
            borderRadius="full"
            boxSize="350px"
            src={`https://ui-avatars.com/api/?name=${
              userStore.user.first_name + userStore.user.last_name
            }`}
            alt={userStore.user.firstname}
          />
        </Flex>
        <Flex direction="column" align="start" w="50%" alignItems="flex-end" justifyContent="center">
          <div style={{ height: 12 }}></div>

          <Box
            style={{
              backgroundColor: "lavender",
              borderRadius: "8px",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ height: 12 }}></div>
            <Text fontSize="lg" color="purple" W="100%">
              {userStore.user.user_name}
            </Text>
            <div style={{ height: 12 }}></div>
            <Text fontSize="lg">
              {userStore.user.first_name} {userStore.user.last_name}
            </Text>
            <Text fontSize="lg">EMAIL: {userStore.user.email}</Text>
            <Text fontSize="lg">PHONE NUMBER: {userStore.user.phone}</Text>
            <Text fontSize="lg">ADDRESS: {userStore.user.address}</Text>
            <Text fontSize="lg">STATE: {userStore.user.state}</Text>{" "}
            <Text fontSize="lg">
              {userStore.user.isFeeder ? "FEEDER" : "NOT A FEEDER"}
            </Text>
            <div style={{ height: 8 }}></div>
          </Box>

          <div style={{ height: 16 }}></div>

          <Button
            style={{ width: "80%" }}
            onClick={handleEditProfile}
            colorScheme="purple"
            w="150px"
          >
            Edit Profile
          </Button>
          <div style={{ height: 16 }}></div>
        </Flex>
      </Flex>
      <Grid width="70%" margin="0 auto" marginTop={12}>
        <h1 style={{fontSize: 24}}><b>Posts</b></h1>
      </Grid>
      <Grid
        width="70%"
        margin="0 auto"
        gap="8"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {posts?.map((post, index) => (
          <PhotoCard postId={post._id} images={post.images} />
        ))}
      </Grid>
    </div>
  );
}
