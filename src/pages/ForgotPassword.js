import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import { forgotPassword } from "../api/user";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [msg, setMsg] = useState(null);
  const handleForgotPassword = async () => {
    setMsg("")
    if (emailRef.current.value) {
      try {
        const res = await forgotPassword({ email: emailRef.current.value });
        console.log("response forgot pw", res);
        setMsg("Password reset link sent!");
      } catch (e) {
        setMsg(e);
      }
    } else {
      setMsg("Email is required!");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxW="90%"
      w="400px"
      margin="auto"
    >
      <Heading>Forgot password?</Heading>
      <div style={{ height: 48 }}></div>
      <Input ref={emailRef} type="email" placeholder="Enter email address" />
      <div style={{ height: 32 }}></div>
      <Button onClick={handleForgotPassword} colorScheme="blue" w="300px">
        Send reset link
      </Button>
      <div style={{ height: 48 }}></div>
      <p>{msg}</p>
    </Box>
  );
}
