import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { verifyEmail } from "../api/user";
import { toast } from 'react-toastify';
import { useHistory } from "react-router";

export default function EmailVerification() {
  //   const emailRef = useRef();
  const history= useHistory();
  const userStore = useSelector((store) => store.userStore);
  const [msg, setMsg] = useState("Please wait, verifying your email");
    const handleVerifyEmail=async ()=>{
    try {
      const verification_token = window.location.href.split("?code=")[1];
      const res = await verifyEmail({email: userStore.user.email, verification_token: verification_token});
      toast("EMAIL VERIFIED")
      console.log(res);
      history.push('/home')
    } catch (e) {
        console.log(e);
      setMsg(e);
    }
}
  useEffect(() =>  {
    handleVerifyEmail()
  }, [userStore]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxW="90%"
      w="400px"
      margin="auto"
    >
      {/* <p>{msg}</p> */}
    </Box>
  );
}
