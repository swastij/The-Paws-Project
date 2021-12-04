import React from "react";

import { useHistory } from "react-router-dom";

import { Box } from "@chakra-ui/react";

const PhotoCard = ({ postId, images }) => {
  const history = useHistory();

  const handleViewPost = () => {
    history.push(`posts/${postId}`);
  };
  return (
    <Box
      boxShadow="lg"
      w="100%"
      height={300}
      display="flex"
      flexDirection="column"
      borderRadius="8px"
      marginBottom="16px"
    >
      {images.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={handleViewPost}
        >
          <img
            style={{
              objectFit: "cover",
              height: "300px",
              width: "100%",
              borderRadius: 4
            }}
            src={images[0].url}
            alt="media"
          />
        </Box>
      )}
    </Box>
  );
};

export default PhotoCard;
