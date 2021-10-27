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

export default function Profile() {
  const userStore = useSelector((store) => store.userStore);
  const history = useHistory();
  const [user, setUser] = useState();

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
  useEffect(() => {}, [userStore]);
  const handleChangePassword = () => {
    history.push("/change-password");
  };
  return (
  

    <Flex direction="row" marginTop="100px" justify="space-between" w="100%">

      <Flex justify="center" w="50%">
        <Image
          borderRadius="full"
          boxSize="350px"
          src={propic}
          alt={userStore.user.firstname}
        />
      </Flex>
      <Flex direction="column" align="start" w="50%">
       
        <div style={{ height: 12 }}></div>

          <Box style={{backgroundColor: "	lavender", borderRadius: "8px", width: "80%", display: "flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
         
          <div style={{ height: 12 }}></div>
        <Text fontSize="lg" color="purple">
          {userStore.user.username} 
        </Text>
        <div style={{ height: 12 }}></div>
        <Text fontSize="lg">
          {userStore.user.firstname} {userStore.user.lastname}
        </Text>
        <Text fontSize="lg">{userStore.user.age}</Text>
        <Text fontSize="lg" as="cite">
          {userStore.user.about}
        </Text>
        <Text fontSize="lg">{userStore.user.location}</Text>{" "}
        <div style={{ height: 8 }}></div>
        </Box>
      
        <div style={{ height: 16 }}></div>
      
      <Button style={{width:"80%"}} onClick={handleEditProfile} colorScheme="purple" w="150px">
            Edit Profile
      </Button>
      <div style={{ height: 16 }}></div>

      <Button style={{width:"80%"}} colorScheme="purple" w="300px">
          Settings
        </Button>
        <div style={{ height: 16 }}></div>
        <Button style={{width:"80%"}} onClick={handleChangePassword} colorScheme="purple" w="300px">
          Change Password
        </Button>
    
      </Flex>
    </Flex>
  );
}
