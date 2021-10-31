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
import { getProfileById } from "../api/user";

export default function ShowProfile() {
  const userStore = useSelector((store) => store.userStore);
  const history = useHistory();
  const [user, setUser] = useState();

  const handleGetUserByID = async (id) => {
    try {
      const res = await getProfileById(id, userStore.token);
      setUser(res);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    console.log("SHOWPROFILE: ", userStore.token);
    if (userStore.token) {
      const id = window.location.href.split("user/")[1];
      console.log(id);
      handleGetUserByID(id);
    }
  }, [userStore.token]);

  useEffect(() => {
    console.log("Show profile mounted");
  }, []);

  return (
    <Flex direction="row" marginTop="100px" justify="space-between" w="100%">
      {user && (
        <Flex direction="row" marginTop="100px" justify="space-between" w="100%">

        <Flex justify="center" w="50%">
          <Image
            borderRadius="full"
            boxSize="350px"
            src={`https://ui-avatars.com/api/?name=${user.first_name+user.last_name}`}
            alt={user.firstname}
          />
        </Flex>
        <Flex direction="column" align="start" w="50%">
         
          <div style={{ height: 12 }}></div>
  
            <Box style={{backgroundColor: "	lavender", borderRadius: "8px", width: "80%", display: "flex", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
           
            <div style={{ height: 12 }}></div>
          <Text fontSize="lg" color="purple" W="100%">
            {user.user_name} 
          </Text>
          <div style={{ height: 12 }}></div>
          <Text fontSize="lg">
            {user.first_name} {user.last_name}
          </Text>
          <Text fontSize="lg">EMAIL: {user.email}</Text>
          <Text fontSize="lg">PHONE NUMBER: {user.phone}</Text>
          <Text fontSize="lg" >
            ADDRESS: {user.address}
          </Text>
          <Text fontSize="lg">STATE: {user.state}</Text>{" "}
          <Text fontSize="lg" >
            {user.isFeeder? "FEEDER" : "NOT A FEEDER"}
          </Text>
          <div style={{ height: 8 }}></div>
          </Box>
          
        <div style={{ height: 16 }}></div>
  
      
        </Flex>
      </Flex>
      )}
    </Flex>
  );
}
