import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { getNotification } from "../api/user";
export default function Notification() {
  const userStore = useSelector((store) => store.userStore);
  const [notifs, setNotifs] = useState([]);
  const history = useHistory();

  const handleView = (id) => {
    id=id.id;
    history.push(`/post/${id}`)
    // console.log(id);
  };

  const fetchNotification = async () => {
    console.log("token from notif", userStore.token);
    if (userStore.token) {
      try {
        const res = await getNotification({ token: userStore.token });
        console.log(res);
        setNotifs(res.data)

        console.log("notifs", notifs);
      } catch (e) {
        console.log("error from notif", e);
      }
    } else {
      console.log("token not found in userSTORE");
    }
  };




  
  useEffect(() => {
    fetchNotification();
  }, [userStore.token]);

  return (
    <Box
    
      m="0 auto"
      w="100%"
      h="100vh"
    >
      { notifs && notifs.map((notif, index) =>(
          <Box display="flex"  alignItems="center" justifyContent="space-around " boxShadow="md" marginBottom="16px"
          borderRadius={8}
          cursor="pointer"
          h="50px"
          w="80%"
          m="16px auto"
          bgColor="purple.100" >
            
            {notif['message'] && <Box>{notif['fromUser'].username} liked you post  </Box>} 
            {!notif['message'] && <Box>{notif['fromUser'].username} commented on your post  </Box>} 
            <Button size="sm" bgColor="purple.300" onClick={()=>handleView(notif['postId'])} >VIEW</Button>
          </Box>
      ))}
    </Box>
  );
}
