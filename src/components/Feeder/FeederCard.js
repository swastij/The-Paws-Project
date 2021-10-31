import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const FeederCard = ({
   state,
   users 
})=>{
    return (
        <Box>
            <Box>
                MP
            </Box>
            <Box>
                user 1
            </Box>
            <Box>
                user 2
            </Box>
        </Box>
    );
}
export default FeederCard;