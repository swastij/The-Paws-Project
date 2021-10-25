import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { edit } from "../api/user";
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
  const [firstname, setFirstname] = useState(userStore.user.firstname);
  const [lastname, setLastname] = useState(userStore.user.lastname);
  const [username, setUsername] = useState(userStore.user.username);
  const [gender, setGender] = useState(userStore.user.gender);
  const [about, setAbout] = useState(userStore.user.about);
  const [age, setAge] = useState(userStore.user.age);
  const [location, setLocation] = useState(userStore.user.location);
  const [profile_pic, setProfilePic] = useState(userStore.user.profile_pic);

  let button;

  useEffect(() => {
    imgRef.current.value = userStore.user.profile_pic;
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
        about: about,
        gender: parseInt(gender),
        age: parseInt(age),
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
                onChange={(e) => setAbout(e.target.value)}
                variant="outline"
                value={about}
                size="md"
              />
              <Spacer />

              <Select
                onChange={(e) => setGender(e.target.value)}
                placeholder="Select gender"
              >
                <option value="0">Female</option>
                <option value="1">Male</option>
                <option value="2">Others</option>
              </Select>

              <Spacer />
              <Box display="flex" flexDirection="row">
              <Box w="25%" m="auto"> AGE: </Box>
              <Box w="70%">
              <NumberInput
                // isFullWidth={true}
                size="md"
                maxw={16}
                defaultValue={age}
                min={18}
                max={100}
              >
                <NumberInputField
                  isFullWidth={true}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </Box>
              </Box>
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
