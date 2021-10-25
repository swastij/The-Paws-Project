import React from "react";
import { Box } from "@chakra-ui/react";

export default function RemoteMessageCard({ body, profile_pic, timestamp }) {
  return (
    <Box position="relative" w="100%" h="60px">
      <Box
        position="absolute"
        left="8px"
        display="grid"
        alignItems="center"
        gridGap="8px"
        gridTemplateColumns="32px 1fr"
      >
        <img style={{ borderRadius: "50%" }} src={profile_pic} />
        <Box position="relative">
          <Box
            color="white"
            borderRadius="8px"
            backgroundColor="blue"
            padding="4px 8px"
          >
            {body}
          </Box>
          <p
            style={{
              position: "absolute",
              bottom: "-16px",
              fontSize: "10px",
              width: "200px",
            }}
          >
            {new Date(timestamp.seconds * 1000).toLocaleString()}
          </p>
        </Box>
      </Box>
    </Box>
  );
}
