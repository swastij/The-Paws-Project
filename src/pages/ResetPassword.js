import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { resetPassword } from "../api/user";
import {useHistory} from 'react-router-dom';

export default function ResetPassword() {
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory()

  useEffect(() => {
    const code = window.location.href.split("?code=")[1];
    setToken(code);
  }, []);

  const handleLoginNavigation = () => {
    history.push('/login')
  }
  
  const handleResetPassword = async () => {
    setMsg("");
    if (!passwordRef.current.value || !confirmPasswordRef.current.value) {
      setMsg("All fields are mandatory");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setMsg("Password doesn't match");
      return;
    }
    try {
      await resetPassword({
        password: passwordRef.current.value,
        resetToken: token,
      });
      setMsg('Your password is updated, you may login now')
    } catch (e) {}
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
      <Heading>Reset your password</Heading>
      <div style={{ height: 48 }}></div>
      <Input
        ref={passwordRef}
        type="password"
        placeholder="Enter new password"
      />
      <div style={{ height: 16 }}></div>
      <Input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm new password"
      />
      <div style={{ height: 32 }}></div>
      <Button onClick={handleResetPassword} colorScheme="blue" w="300px">
        Reset Password
      </Button>
      <div style={{ height: 8 }}></div>

      <p>OR </p>
      <div style={{ height: 8 }}></div>

      <Button onClick={handleLoginNavigation} colorScheme="blue" w="300px">
        Login
      </Button>
      <div style={{ height: 48 }}></div>
      <p>{msg}</p>
    </Box>
  );
}
