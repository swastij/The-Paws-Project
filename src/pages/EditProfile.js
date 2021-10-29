import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { edit } from "../api/user";
import propic from "../assets/propic.jpg";
import {
  Input,
  Image,
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

export default function EditProfile() {
  const history = useHistory();
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  const status = useRef();
  const imgRef = useRef();
  const [first_name, setFirstname] = useState(userStore.user.first_name);
  const [last_name, setLastname] = useState(userStore.user.last_name);
  const [username, setUsername] = useState(userStore.user.username);
  const [isFeeder, setIsFeeder] = useState(userStore.user.isFeeder);
  const [state, setState] = useState(userStore.user.state);
  const [address, setAddress] = useState(userStore.user.address);
  const [phone, setPhone] = useState(userStore.user.phone);

  let button;

  useEffect(() => {
    console.log("image of user: ", userStore.user);
    button = (
      <Button isFullWidth={true} colorScheme="teal" size="md">
        Edit
      </Button>
    );
  }, []);

  const handleEditProfile = async () => {
    try {
      const user = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        isFeeder: isFeeder,
        email: userStore.user.email,
        state: state,
        address: address,
        isFeeder: isFeeder,
        id: userStore.user._id,
        phone: parseInt(phone),
      };

      const res = await edit(user, userStore.token);
      dispatch({
        type: "SAVE_USER",
        payload: {
          ...userStore,
          user: res,
        },
      });
      status.current.innerHTML = "Account edited";
      history.push("/profile");
    } catch (e) {
      if (e.response.status === 401 || e.response.data !== "UNAUTHORIZED") {
        console.log(e.response.data);
        status.current.innerHTML = Object.entries(e.response.data).map(
          (e) => e[0] + ": " + e[1] + "<br/>"
        );
        console.log(Object.entries(e.response.data));
      } else if (e.response.status === 500) {
        status.current.innerHTML = e.response.data;
      }
    }
  };
  // function edit(){
  //   console.log('Edit Profile Page');
  // }
  return (
    <Box w="100%">
      <Grid h="100%" templateColumns="repeat(2, 1fr)" gap={0}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image
            ref={imgRef}
            borderRadius="full"
            boxSize="350px"
            src={`https://ui-avatars.com/api/?name=${
              userStore.user.first_name + userStore.user.last_name
            }`}
            alt={userStore.user.first_name}
          />
          <Spacer />
        </Box>

        <Box>
          <Center h="100%" w="100%">
            <VStack w="80%">
              <Input
                onChange={(e) => setFirstname(e.target.value)}
                variant="outline"
                placeholder="First name"
                value={first_name}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setLastname(e.target.value)}
                variant="outline"
                placeholder="Last Name"
                value={last_name}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setUsername(e.target.value)}
                variant="outline"
                placeholder="Username"
                value={username}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setAddress(e.target.value)}
                variant="outline"
                placeholder="Address"
                value={address}
                size="md"
              />
              <Spacer />

              <Select
                onChange={(e) => setIsFeeder(e.target.value)}
                placeholder="Are you a feeder?"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>

              <Spacer />
              <Input
                onChange={(e) => setPhone(e.target.value)}
                variant="outline"
                placeholder="Phone Number"
                value={phone}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setState(e.target.value)}
                variant="outline"
                placeholder="state"
                value={state}
                size="md"
              />
              <Spacer />

              <Button
                onClick={handleEditProfile}
                isFullWidth={true}
                colorScheme="cyan"
                size="md"
              >
                Edit
              </Button>
            </VStack>
          </Center>
        </Box>
      </Grid>
      <Center>
        <p ref={status}></p>
      </Center>
    </Box>
  );
}
