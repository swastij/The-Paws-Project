import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../../api/user";

export default function RecentChatCard({ userID, docID, onRecentChatSelect }) {
  const userStore = useSelector((store) => store.userStore);
  const [userDetails, setUserDetails] = useState(null);

  const handleGetUser = async () => {
    try {
      const user = await getUserById({
        userID: userID,
        token: userStore.token,
      });
      setUserDetails(user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userStore.token && !userDetails) {
      handleGetUser();
    }
  }, [userStore]);

  if (!userDetails) {
    return <div></div>;
  }

  const handleRecentChatSelect = () => {
    onRecentChatSelect(docID, userDetails)
  }
  return (
    <Box
      onClick={handleRecentChatSelect}
      display="grid"
      gridTemplateColumns="32px 1fr"
      gridGap="8px"
      alignItems="center"
      margin="4px"
      cursor="pointer"
    >
      <img style={{ borderRadius: "50%" }} src={userDetails.profile_pic} />
      <Box>
        <h1>{userDetails.username}</h1>
      </Box>
    </Box>
  );
}
