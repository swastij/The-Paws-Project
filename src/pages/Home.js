import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Select,
  Button,
  Divider,
  Input,
  Textarea,
} from "@chakra-ui/react";
import PostCard from "../components/Home/PostCard";
import { createPost2, getAllPosts } from "../api/post";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RiImageAddFill, RiVideoAddFill } from "react-icons/ri";

export default function Home() {
  const userStore = useSelector((store) => store.userStore);
  const [allPosts, setAllPosts] = useState([]);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [animal_type, setAnimalType] = useState(null);
  const [breed, setBreed] = useState(null);
  const [isDewormed, setIsDewormed] = useState(null);
  const [isVaccinated, setIsVaccinated] = useState(null);
  const [gender, setGender] = useState(null);
  const inputRef = useRef();
  const imgRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreatePost = async () => {
    if (userStore.token) {
      try {
        const post = {
          name: name,
          animal_type: animal_type,
          breed: breed,
          isDewormed: isDewormed,
          isVaccinated: isVaccinated,
          age: age,
          gender: gender,
          image: selectedFile,
        };
        const res = await createPost2(post, userStore.token);
        fetchAllPosts();
        setSelectedFile(null);
      } catch (e) {
        console.log(e);
        toast.error("An error occurred");
      }
    }
  };

  const fetchAllPosts = async () => {
    if (userStore.token) {
      try {
        const posts = await getAllPosts({ token: userStore.token });
        setAllPosts(posts);
        console.log("ALL POSTS ", allPosts);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("token not found");
    }
  };

  const handleFileChange = (e) => {
    const fileURL = URL.createObjectURL(e.target.files[0]);
    console.log(fileURL);
    console.log(e.target.files[0]);
    imgRef.current.src = fileURL;
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchAllPosts();
  }, [userStore]);

  useEffect(() => {}, [allPosts]);

  return (
    <Box
      p={4}
      marginLeft="auto"
      marginRight="auto"
      w={700}
      maxW="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        boxShadow="lg"
        marginBottom="16px"
        borderRadius={8}
        h="440px"
        w="100%"
      >
        <Box m={2} marginTop={4}>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of the animal"
            h="40px"
          />
        </Box>
        <Box m={2}>
          <Input
            onChange={(e) => setAnimalType(e.target.value)}
            placeholder="Animal Type (Dog/Cat)"
            h="40px"
          />
        </Box>
        <Box m={2}>
          <Input
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
            h="40px"
          />
        </Box>
        <Box m={2}>
          <Input
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            h="40px"
          />
        </Box>
        <Box m={2}>
          <Input
            onChange={(e) => setBreed(e.target.value)}
            placeholder="Breed"
            h="40px"
          />
        </Box>
        <Box m={2}>
          <Select
            onChange={(e) => setIsVaccinated(e.target.value)}
            variant="outline"
            placeholder="Is the animal vaccinated?"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </Box>
        <Box m={2}>
          <Select
            onChange={(e) => setIsDewormed(e.target.value)}
            variant="outline"
            placeholder="Is the animal dewormed?"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </Box>
        <Box
          maxW="100%"
          display="flex"
          justifyContent="space-between"
          h="60px"
          m={4}
        >
          <Box
            marginTop="16px"
            maxW="50%"
            flex="50%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <label style={{ height: "100%", maxWidth: "40px" }}>
              <RiImageAddFill />
              <input
                onChange={handleFileChange}
                style={{ visibility: "hidden" }}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
            <img
              ref={imgRef}
              style={{
                visibility: selectedFile ? "visible" : "hidden",
                height: "50px",
                width: "50px",
              }}
            />
          </Box>
          <Box maxW="50%" flex="50%" display="flex" justifyContent="flex-end">
            <Button
              colorScheme="purple"
              onClick={handleCreatePost}
              disabled={
                animal_type === null ||
                animal_type === "" ||
                imgRef.current.value === null
              }
              w={100}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider marginBottom="16px" />
      {allPosts &&
        allPosts.map((post, index) => (
          <PostCard
            key={0}
            postId={post._id}
            author={post.author}
            name={post.name}
            edited={post.edited}
            images={post.images}
            gender={post.gender}
            breed={post.breed}
            isVaccinated={post.isVaccinated}
            isDewormed={post.isDewormed}
            animal_type={post.animal_type}
            onDeleted={fetchAllPosts}
          />
        ))}
    </Box>
  );
}
