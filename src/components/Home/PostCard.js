import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
} from "@chakra-ui/react";
import { RiImageAddFill, RiVideoAddFill } from "react-icons/ri";
import moment from 'moment'
import React, { useEffect, useRef, useState } from "react";
import { GoKebabVertical } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RWebShare } from "react-web-share";
import { Button } from "@chakra-ui/button";
import { deletePost, editPost } from "../../api/post";
import { Box, Select, Divider, Input, Textarea } from "@chakra-ui/react";

const PostCard = ({
  postId,
  author,
  name,
  age,
  animal_type,
  breed,
  gender,
  isVaccinated,
  isDewormed,
  created,
  images,
  onDeleted,
  onEdited,
}) => {
  const history = useHistory();
  const [editname, setName] = useState(name);
  const [editage, setAge] = useState(age);
  const [editanimal_type, setAnimalType] = useState(animal_type);
  const [editbreed, setBreed] = useState(breed);
  const [editisDewormed, setIsDewormed] = useState(isDewormed);
  const [editisVaccinated, setIsVaccinated] = useState(isVaccinated);
  const [editgender, setGender] = useState(gender);
  const imgRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("Save changes");
  const [deleteText, setDeleteText] = useState("Delete");
  const userStore = useSelector((store) => store.userStore);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    setName(name);
    setAge(age);
    setAnimalType(animal_type);
    setBreed(breed);
    setIsDewormed(isDewormed);
    setIsVaccinated(isVaccinated);
    setGender(gender)
  }, [postId])

  const handleDelete = async () => {
    setDeleteText("Deleting...");
    try {
      await deletePost(postId, userStore.token);
      onDeleted();
    } catch (e) {}
    setDeleteText("Delete");
  };
  const handleEditPost = async () => {
    setEditText("Saving...");
    try {
      const postObject = {
        id: postId,
        image: selectedFile,
        name: editname,
        age: editage,
        gender: editgender,
        breed: editbreed,
        animal_type: editanimal_type,
        isDewormed: editisDewormed,
        isVaccinated: editisVaccinated,
      };
      await editPost(postObject, userStore.token);
      setIsEditing(false);
      onEdited();
    } catch (e) {}
    setEditText("Save changes");
  };

  const handleFileChange = (e) => {
    const fileURL = URL.createObjectURL(e.target.files[0]);
    imgRef.current.src = fileURL;
    setSelectedFile(e.target.files[0]);
  };

  const handleShowUser = () => {
    history.push(`/user/${author._id}`);
  };
  const handleViewPost= ()=>{
    history.push(`posts/${postId}`);
  }
  return (
    <Box
      boxShadow="lg"
      w="100%"
      display="flex"
      flexDirection="column"
      borderRadius="8px"
      marginBottom="16px"
    >
      <Box
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={handleViewPost}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          cursor="pointer"
          onClick={handleShowUser}
        >
          <img
            style={{
              objectFit: "cover",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
            }}
            src={`https://ui-avatars.com/api/?name=${
              author.first_name + author.last_name
            }`}
            alt="author"
          />
          <Box marginLeft="8px">
            <p>{author.username}</p>
            <p style={{ fontSize: 10 }}>{moment(new Date(created)).fromNow()}</p>
          </Box>
        </Box>
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="32px"
            w="32px"
            cursor="pointer"
            border="1px solid #edf2f7"
            borderRadius="8px"
          >
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GoKebabVertical />}
                variant="outline"
              />
              <MenuList>
                {author._id == userStore.user._id && (
                  <MenuItem onClick={() => setIsEditing(true)}>Edit</MenuItem>
                )}
                {author._id != userStore.user._id && <MenuItem>Report</MenuItem>}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
      {images.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            style={{
              objectFit: "cover",
              height: "650px",
              width: "100%",
            }}
            src={images[0].url}
            alt="media"
          />
        </Box>
      )}
      {isEditing ? (
        <Box>
          <Box m={2} marginTop={4}>
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of the animal"
              value={editname}
              h="40px"
            />
          </Box>
          <Box m={2}>
            <Input
              onChange={(e) => setAnimalType(e.target.value)}
              placeholder="Animal Type (Dog/Cat)"
              value={editanimal_type}
              h="40px"
            />
          </Box>
          <Box m={2}>
            <Input
              onChange={(e) => setGender(e.target.value)}
              placeholder="Gender"
              value={editgender}
              h="40px"
            />
          </Box>
          <Box m={2}>
            <Input
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              value={editage}
              h="40px"
            />
          </Box>
          <Box m={2}>
            <Input
              onChange={(e) => setBreed(e.target.value)}
              placeholder="Breed"
              value={editbreed}
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
              <Box
                maxW="50%"
                flex="50%"
                display="flex"
                justifyContent="flex-end"
              >
                <Button colorScheme="purple" onClick={handleEditPost} w={100}>
                  {editText}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box p={2}> NAME: {name}</Box>
          <Box p={2}> TYPE: {animal_type} </Box>
          <Box p={2}> BREED: {breed} </Box>
          <Box p={2}> VACCINATED`: {isVaccinated ? "YES" : "NO"} </Box>
          <Box p={2}> DEWORMED: {isDewormed ? "YES" : "NO"} </Box>
          <Box p={2}> GENDER: {gender} </Box>
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button flex="1" colorScheme="blue">
              <RWebShare
                data={{
                  text: "Hey! Help me in finding forever home",
                  url: `http://localhost:3000/posts/${postId}`,
                  title: "Adopt me!",
                }}
              >
                <button>Share 🔗</button>
              </RWebShare>
            </Button>
            {userStore.user._id == author._id && <Box width="20px" />}
            {userStore.user._id == author._id && (
              <Button onClick={handleDelete} colorScheme="red" flex="1">
                {deleteText}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostCard;
