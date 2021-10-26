import React, { useRef } from "react";
import { login } from "../api/user";
import {
  Input,
  Button,
  Spacer,
  VStack,
  Grid,
  Center,
  Box,
  Heading
} from "@chakra-ui/react";
import {Link} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import { useHistory } from "react-router";

import catdog from '../assets/catdog.jpg';

export default function Login() {
  const dispatch = useDispatch();
  const history= useHistory();
  const status = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  
  const handleLoginUser = async () => {
    try {
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await login(user);
      dispatch({type: 'SAVE_USER', payload: res});
      status.current.innerHTML = "Logged In";
      history.push('/home');

    } catch (e) {
        status.current.innerHTML = e.response.data;
      }
    }
  

  return (
    <Box  w="100%">
      
      <Grid h="100%" templateColumns="repeat(2, 1fr)" gap={0}>
        <Box w="100%" display="flex" alignItems="center" justifyContent="center">
        
        <Box w="80%">
        <img src={catdog} />
        </Box>
        </Box>
        <Box>
          <Center h="100%" w="100%">
            <VStack w="80%">
              <Heading>
                  LOGIN
              </Heading>
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
                Login
              </Button>
              <Link to="/forgot-password">Forgot password?</Link>
              <Center w="100%">
      <p style={{"color": "red", "fontSize" : "20px", "margin": "12px"}} ref={status}></p>
      </Center>
            </VStack>
          </Center>
        </Box>
      </Grid>

      
    </Box>
  );
}
