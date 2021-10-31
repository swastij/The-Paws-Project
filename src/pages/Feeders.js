import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getFeeders } from "../api/user";
import FeederCard from "../components/Feeder/FeederCard";
// import {getUsers} from "../api/user";
export default function Feeders() {
  const [feeders, setFeeders] = useState([]);
  const handleGetFeeders = async () => {
    const res = await getFeeders();
    console.log(res);
    setFeeders(res);
  };
  useEffect(() => {
    handleGetFeeders();
  }, []);
  return (
    <Box>
      {feeders.map((filteredUser) => {
        return (
          <div>
            <h1><b>{filteredUser._id}</b></h1>
            {filteredUser.feeders.map((feeder) => {
              return <p>{feeder.username}</p>;
            })}
            <div style={{marginTop: '10px', marginBottom: '10px', height: 1, background: '#000', width: '100%'}}></div>
          </div>
        );
      })}
    </Box>
  );
}
