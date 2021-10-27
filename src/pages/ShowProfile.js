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
        <Flex justify="center" w="100%">
          <img
            style={{
              objectFit: "cover",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
            }}
            src={`https://ui-avatars.com/api/?name=${user.username}`}
            alt="author"
          />
          <h1>{user.username}</h1>
        </Flex>
      )}
    </Flex>
  );
}
