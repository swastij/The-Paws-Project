import React from "react";
import { Box } from "@chakra-ui/react";

export default function MessageCard({ body, profile_pic, timestamp }) {
  return (
    <Box position="relative" w="100%" h="60px">
      <Box
        position="absolute"
        right="8px"
        display="grid"
        alignItems="center"
        gridGap="8px"
        gridTemplateColumns="1fr 32px"
      >
        <Box position="relative">
          <Box
            color="white"
            borderRadius="8px"
            backgroundColor="gray"
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
              right: "-32px",
              textAlign: "right",
            }}
          >
            {new Date(timestamp.seconds * 1000).toLocaleString()}
          </p>
        </Box>

        <img style={{ borderRadius: "50%" }} src={profile_pic} />
      </Box>
    </Box>
  );
}
