import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Divider, Input, Textarea } from "@chakra-ui/react";
import PostCard from "../components/Home/PostCard";
import { createPost, getAllPosts } from "../api/post";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { RiImageAddFill, RiVideoAddFill } from "react-icons/ri";

export default function Home() {
  const userStore = useSelector((store) => store.userStore);
  const [allPosts, setAllPosts] = useState([]);
  const [caption, setCaption] = useState(null);
  const inputRef = useRef();
  const imgRef = useRef()
  const videoRef = useRef()
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);


  const handleCreatePost = async () => {


    if (userStore.token) {
      var selectedMedia = "";
      var type = -1;
      if(selectedFile){
        selectedMedia = selectedFile
        type = 0;
      }
      else if(selectedVideoFile){
        selectedMedia = selectedVideoFile
        type = 1
      }
      try {
        await createPost({
          token: userStore.token,
          media: selectedMedia,
          location: "",
          mediaType: type,
          caption: inputRef.current.value,
        });
        toast("Posted");
        fetchAllPosts();
        inputRef.current.value="";
        setSelectedFile(null);
        setSelectedVideoFile(null);
      } catch (e) {
        console.log(e);
        toast.error("An error occurred")
      }
    }
  };

  const fetchAllPosts = async () => {
    if (userStore.token) {
      try {
        const posts = await getAllPosts({ token: userStore.token });
        setAllPosts(posts);
        console.log("ALL POSTS " , allPosts);
      } catch (e) {
        console.log(e)
      }
    }else{
      console.log( 'token not found')
    }
  };

  const handleFileChange = (e) => {
    setSelectedVideoFile(null);
    const fileURL = URL.createObjectURL(e.target.files[0])
    console.log(fileURL)
    console.log(e.target.files[0])
    imgRef.current.src = fileURL;
    setSelectedFile(e.target.files[0])
  }

  const handleVideoFileChange = (e) => {
    setSelectedFile(null);
    const fileURL = URL.createObjectURL(e.target.files[0])
    console.log(fileURL)
    console.log(e.target.files[0])
    videoRef.current.src = fileURL;
    setSelectedVideoFile(e.target.files[0])
  }

  useEffect(() => {
    fetchAllPosts();
  }, [userStore]);

  useEffect(()=>{

  }, [allPosts]);

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
        p={4}
        boxShadow="lg"
        marginBottom="16px"
        borderRadius={8}
        h="300px"
        w="100%"
      >
        <Textarea
        ref={inputRef}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What do you want to share?"
          h="160px"
        />
        <Box maxW="100%" display="flex" justifyContent="space-between" h="80px">
        <Box marginTop="16px" maxW="50%" flex="50%" display="flex" justifyContent="flex-start" alignItems="center">
          <label style={{height: '100%', maxWidth: '40px'}}>
            <RiImageAddFill/>
            <input onChange={handleFileChange} style={{visibility: 'hidden'}} type="file" accept="image/png, image/jpg, image/jpeg"/>
          </label>
          <img ref={imgRef} style={{visibility: selectedFile ? 'visible': 'hidden',  height: "50px", width:   "50px"}}/>

          <label style={{ marginLeft: '16px', height: '100%', maxWidth: '40px'}}>
            <RiVideoAddFill/>
            <input onChange={handleVideoFileChange} style={{visibility: 'hidden'}} type="file" accept="video/mp4, video/mkv, video/avi"/>
          </label>
          <video controls autoPlay ref={videoRef} style={{visibility: selectedVideoFile ? 'visible' : 'hidden', height: '80px', width: '160px'}}/>
        </Box>
        <Box maxW="50%" flex="50%" display="flex" justifyContent="flex-end">
          <Button colorScheme="purple" onClick={handleCreatePost} disabled={caption === null || caption === ""} w={100}>
            Post
          </Button>
        </Box>
        </Box>
      </Box>
      <Divider marginBottom="16px" />
      {
        allPosts && allPosts.map((post, index) => (
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
          />  
        ))}
    </Box>
  );
}
