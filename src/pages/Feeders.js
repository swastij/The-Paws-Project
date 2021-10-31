import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFeeders } from "../api/user";
import FeederCard from "../components/Feeder/FeederCard";
// import {getUsers} from "../api/user";
export default function Feeders() {
  const history = useHistory();
  const [feeders, setFeeders] = useState([]);
  const handleGetFeeders = async () => {
    const res = await getFeeders();
    console.log(res);
    setFeeders(res);
  };
  useEffect(() => {
    handleGetFeeders();
  }, []);

  const handleShowUser = (id) => {
    history.push(`/user/${id}`);
  };
  return (
    <Box>
      {feeders.map((filteredUser) => {
        return (
          <div>
            <Box
              boxShadow="lg"
              w="80%"
              m="auto"
              p={8}
              display="flex"
              flexDirection="column"
              borderRadius="8px"
              marginBottom="16px"
            >
              <b>{filteredUser._id}</b>
              {filteredUser.feeders.map((feeder) => {
                return (
                  <Box
                    p={4}
                    display="flex"
                    onClick={function func(){
                      handleShowUser(feeder.id)
                    }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {feeder.username}
                  </Box>
                );
              })}
            </Box>
          </div>
        );
      })}
    </Box>
  );
}
