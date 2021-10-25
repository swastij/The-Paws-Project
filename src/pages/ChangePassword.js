import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { changePassword } from "../api/user";
import { useSelector, useDispatch  } from "react-redux";
import {useHistory} from 'react-router-dom';

export default function ChangePassword() {
//   const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(null);
  const oldPasswordRef= useRef();
  const newPasswordRef= useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory()
  const userStore = useSelector((store) => store.userStore);
  const handleLoginNavigation = () => {
    history.push('/login')
  }
  const handleChangePassword = async () => {
    setMsg("");
    const token= userStore.token;
    if (!newPasswordRef.current.value || !confirmPasswordRef.current.value || !oldPasswordRef.current.value) {
      setMsg("All fields are mandatory");
      return;
    }

    if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
      setMsg("New passwords don't match");
      return;
    }
    console.log("token form changepw", token)
    if(token){
        try {
        await changePassword({
            old_password: oldPasswordRef.current.value,
            new_password: newPasswordRef.current.value,
            token: token,
        });
        dispatch({
            type: "LOGOUT",
            payload: {
              token: "",
              user: {
                firstname: "",
                lastname: "",
                email: "",
                profile_pic: "",
                username: "",
                gender: "",
                age: "",
                about: "",
              },
            },
          });
        setMsg('Your password is updated, you may login now')
        history.push('/login')
        } catch (e) {
            setMsg(e)
        }
    }
    else{
        setMsg("Unauthorized")
        history.push('/login')
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
      <Heading>Reset your password</Heading>
      <div style={{ height: 48 }}></div>
      <Input
        ref={oldPasswordRef}
        type="password"
        placeholder="Enter old password"
      />
      <div style={{ height: 48 }}></div>
      <Input
        ref={newPasswordRef}
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
      <Button onClick={handleChangePassword} colorScheme="blue" w="300px">
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
