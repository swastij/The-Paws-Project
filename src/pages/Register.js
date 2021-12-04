import React, { useEffect, useRef, useState } from "react";
import { register } from "../api/user";
import {
  Input,
  Button,
  Spacer,
  VStack,
  Select,
  NumberInput,
  Grid,
  Center,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import catdog from "../assets/catdog.jpg";

export default function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const status = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const stateRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const isFeederRef = useRef();

  let button;
  const history = useHistory();
  const handleCreateUser = async () => {
    status.current.innerHTML ='';
    setLoading(true);
    try {
      const user = {
        first_name: firstnameRef.current.value,
        last_name: lastnameRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        phone: phoneRef.current.value,
        state: stateRef.current.value,
        address: addressRef.current.value,
        isFeeder: isFeederRef.current.value,
      };
      const res = await register(user);
      console.log(res);
      dispatch({ type: "SAVE_USER", payload: { user: res } });
      status.current.innerHTML = "Account created";
      history.push("/home");
    } catch (e) {
      if (Object.keys(e.response.data).length > 0) {
        status.current.innerHTML = Object.values(e.response.data)[0]
      }else{
        status.current.innerHTML = "An unexpected error has occurred"
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    button = (
      <Button
        isFullWidth={true}
        onClick={handleCreateUser}
        colorScheme="teal"
        size="md"
      >
        Register
      </Button>
    );
  }, []);

  useEffect(() => {
    if (!loading) {
      button = (
        <Button
          isFullWidth={true}
          onClick={handleCreateUser}
          colorScheme="purple"
          size="md"
        >
          Register
        </Button>
      );
    } else {
      button = (
        <Button
          isLoading
          loadingText="Registering"
          colorScheme="purple"
          size="md"
          spinnerPlacement="end"
        >
          Register
        </Button>
      );
    }
  }, [loading]);
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
              <Input
                ref={firstnameRef}
                variant="outline"
                placeholder="First Name"
                size="md"
              />
              <Spacer />
              <Input
                ref={lastnameRef}
                variant="outline"
                placeholder="Last Name"
                size="md"
              />
              <Spacer />
              <Input
                ref={usernameRef}
                variant="outline"
                placeholder="Username"
                size="md"
              />
              <Spacer />
              <Input
                ref={emailRef}
                variant="outline"
                placeholder="Email"
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
              <Input
                ref={phoneRef}
                variant="outline"
                placeholder="Phone Number"
                size="md"
              />
              <Spacer />
              <Input
                ref={addressRef}
                variant="outline"
                placeholder="Address"
                size="md"
              />
              <Spacer />
              <Select
                ref={isFeederRef}
                variant="outline"
                placeholder="Are you a feeder?"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
              <Spacer />
              <Input
                ref={stateRef}
                variant="outline"
                placeholder="State"
                size="md"
              />
              <Spacer />
              {/* <NumberInput size="md" maxw={16} defaultValue={0} min={0} max={2}>
            <NumberInputField ref={genderRef} placeholder="Gender" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}

              {/* <Select ref={genderRef} placeholder="Select gender">
                <option value="0">Female</option>
                <option value="1">Male</option>
                <option value="2">Others</option>
              </Select>
              <Spacer /> */}
              {/* <Input
                ref={profile_picRef}
                variant="outline"
                placeholder="Profile Pic"
                size="md"
              /> */}
              {/* <Spacer /> */}
              {/* <Textarea
                ref={aboutRef}
                variant="outline"
                placeholder="About"
                size="md"
              /> */}
              {/* <Spacer />
              <NumberInput
                // isFullWidth={true}
                size="md"
                maxw={16}
                defaultValue={18}
                min={18}
                max={100}
              >
                <NumberInputField
                  isFullWidth={true}
                  ref={ageRef}
                  placeholder="Age"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Spacer /> */}
              {/* <Input
                ref={locationRef}
                variant="outline"
                placeholder="Location"
                size="md"
              /> */}
              <Spacer />

              <Button
                isFullWidth={true}
                onClick={handleCreateUser}
                colorScheme="cyan"
                size="md"
              >
                Register
              </Button>
            </VStack>
          </Center>
        </Box>
      </Grid>

      <p ref={status}></p>
    </Box>
  );
}
