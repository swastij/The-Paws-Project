import React from "react";
import "./Navbar.css";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Center, Box } from "@chakra-ui/layout";

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
          firstname: "",
          lastname: "",
          email: "",
          profile_pic: "",
          username: "",
          gender: "",
          age: "",
          about: "",
        },
      },
    });
    history.push("/login");
  };

  if (userStore.token === "") {
    return (
      <div className="navbarWrapper">
        
        <Box justifyContent="space-around" className="navbar-row" >
        
          <Box cursor="pointer" onClick={() => handleRouteChange("/")}>Home</Box>

          <Box cursor="pointer" onClick={() => handleRouteChange("/login")}>Login</Box>

          <Box cursor="pointer" onClick={() => handleRouteChange("/register")}>Register</Box>
        </Box>
      </div>
    );
  }
  return (
    <div className="navbarWrapperAuthed">
      <div className="navbar-row">
        <div className="nav-col">Logo</div>
        <div className="nav-col col-center">
          <Link to="/home">Home</Link>
          <Link >Feeders</Link>
          <Link to="profile">Profile</Link>
        </div>
        <div className="nav-col col-right">
          {/* <img
            style={{lineHeight: '40px', height: 40, width: 40, borderRadius: "50%", textAlign:"center" }}
            src={`http://localhost:5000/file/${userStore.user.profile_pic}`}
            alt="dp"
          /> */}
          <p>{userStore.user.username}</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  );
}
