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
  const [firstname, setFirstname] = useState(userStore.user.first_name);
  const [lastname, setLastname] = useState(userStore.user.last_name);
  const [username, setUsername] = useState(userStore.user.username);
  const [isFeeder, setIsFeeder] = useState(userStore.user.isFeeder);
  const [address, setAddress] = useState(userStore.user.address);
  const [phone, setPhone] = useState(userStore.user.phone);
  const [location, setLocation] = useState(userStore.user.location);
  const [profile_pic, setProfilePic] = useState(userStore.user.profile_pic);

  let button;

  useEffect(() => {
    imgRef.current.value = propic;
    button = (
      <Button isFullWidth={true} colorScheme="teal" size="md">
        Edit
      </Button>
    );
  }, []);

  const handleFileChange = (e) => {
    const fileURL = URL.createObjectURL(e.target.files[0]);
    console.log(fileURL);
    imgRef.current.src = fileURL;
    console.log(e.target.files[0]);
    setProfilePic(e.target.files[0]);
  };

  const handleEditProfile = async () => {
    try {
      const user = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        profile_pic: profile_pic,
        address: address,
        gender: isFeeder,
        phone: parseInt(phone),
        location: location,
      };

      const res = await edit(user, userStore.token);

      dispatch({ type: "SAVE_USER", payload: res });
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
          <label>
            <Image
              ref={imgRef}
              borderRadius="full"
              boxSize="350px"
              src={`http://localhost:5000/file/${profile_pic}`}
              alt={userStore.user.firstname}
            />
            <Spacer />

            <Box display="flex" alignItems="center" justifyContent="center">
              <Box>Change profile pic</Box>
              <input
                onChange={handleFileChange}
                style={{ display: "none" }}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </Box>
          </label>
        </Box>

        <Box>
          <Center h="100%" w="100%">
            <VStack w="80%">
              <Input
                onChange={(e) => setFirstname(e.target.value)}
                variant="outline"
                value={firstname}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setLastname(e.target.value)}
                variant="outline"
                value={lastname}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setUsername(e.target.value)}
                variant="outline"
                value={username}
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setAddress(e.target.value)}
                variant="outline"
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
                size="md"
              />
              <Spacer />
              <Input
                onChange={(e) => setLocation(e.target.value)}
                variant="outline"
                placeholder="location"
                value={location}
                size="md"
              />
              <Spacer />

              <Button
                onClick={handleEditProfile}
                isFullWidth={true}
                colorScheme="teal"
                size="md"
              >
                Edit
              </Button>
            </VStack>
          </Center>
        </Box>
      </Grid>

      <p ref={status}></p>
    </Box>
  );
}
