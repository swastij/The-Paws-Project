import React, { useEffect, useRef, useState } from "react";
import { login } from "../api/user";
import {
  Input,
  Button,
  Spacer,
  VStack,
  Grid,
  Center,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import catdog from "../assets/catdog.jpg";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleLoginUser = async () => {
    status.current.innerHTML = "";
    setIsProcessing(true);
    try {
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await login(user);
      dispatch({ type: "SAVE_USER", payload: res });
      history.push("/home");
    } catch (e) {
      if (e?.response) {
        if (Object.keys(e?.response?.data).length > 0) {
          status.current.innerHTML = Object.values(e?.response?.data)[0];
        } else {
          status.current.innerHTML = "An unexpected error has occurred";
        }
      }
      else{
        console.log(e);
      }
      // status.current.innerHTML = e.response.data;
    }
    setIsProcessing(false);
  };

  return (
    <Box w="100%">
      <Grid h="100%" templateColumns="repeat(2, 1fr)" gap={0}>
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="80%">
            <img src={catdog} />
          </Box>
        </Box>
        <Box>
          <Center h="100%" w="100%">
            <VStack w="80%">
              <Heading>LOGIN</Heading>
              <Spacer />
              <Spacer />
              <Input
                ref={usernameRef}
                variant="outline"
                placeholder="Username"
                size="md"
              />
              <Spacer />

              <Input
                ref={passwordRef}
                variant="outline"
                placeholder="Password"
                size="md"
              />
              <Spacer />

              <Button
                isFullWidth={true}
                onClick={handleLoginUser}
                colorScheme="cyan"
                size="md"
              >
                {isProcessing ? "Please wait..." : "Login"}
              </Button>
              <Link to="/forgot-password">Forgot password?</Link>
              <Center w="100%">
                <p
                  style={{ color: "red", fontSize: "20px", margin: "12px" }}
                  ref={status}
                ></p>
              </Center>
            </VStack>
          </Center>
        </Box>
      </Grid>
    </Box>
  );
}
