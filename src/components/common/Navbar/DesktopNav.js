import React from "react";
import "./Navbar.css";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {Image} from "@chakra-ui/react";
import { Center, Box } from "@chakra-ui/layout";
import propic from "../../../assets/propic.jpg"
export default function DesktopNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);
  console.log(userStore);

  const handleRouteChange = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: {
        token: "",
        user: {
          first_name: "",
          last_name: "",
          email: "",
          state: "",
          address: "",
          username: "",
          isFeeder: "",
          phone: "",
        },
      },
    });
    history.push("/login");
  };

  if (userStore.token === "") {
    return (
      <div className="navbarWrapper">
        <Box justifyContent="space-around" className="navbar-row">
          <Box cursor="pointer" onClick={() => handleRouteChange("/")}>
            Home
          </Box>

          <Box cursor="pointer" onClick={() => handleRouteChange("/login")}>
            Login
          </Box>

          <Box cursor="pointer" onClick={() => handleRouteChange("/register")}>
            Register
          </Box>
        </Box>
      </div>
    );
  }
  return (
    <div className="navbarWrapperAuthed">
      <div className="navbar-row">
        <div className="nav-col">
          <Image borderRadius="50%" h="70px" w="70px" src={propic}></Image>

        </div>
        <div className="nav-col col-center">
          <Link to="/home">Home</Link>
          <Link to="/feeders">Feeders</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div className="nav-col col-right">
          {/* <img
            style={{lineHeight: '40px', height: 40, width: 40, borderRadius: "50%", textAlign:"center" }}
            src={`http://localhost:5000/file/${userStore.user.profile_pic}`}
            alt="dp"
          /> */}
         <Link to="profile">{userStore.user.username}</Link>
          <p style={{cursor: "pointer"}} onClick={handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  );
}
