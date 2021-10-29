import "./App.css";
import { useState, useRef, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import JsonPlaceholder from "./pages/JsonPlaceholder";
import DeletePosts from "./pages/DeletePosts";
import DesktopNav from "./components/common/Navbar/DesktopNav";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import Post from "./pages/Post";
import ShowProfile from "./pages/ShowProfile";

function App() {
  const userStore = useSelector((store) => store.userStore);

  useEffect(() => {
    console.log(userStore);
  }, [userStore]);

  return (
    <div>
      <DesktopNav />
      {userStore.token != "" && userStore.token != null ? (
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login">
            <Home />
          </Route>
          <Route path="/json">
            <JsonPlaceholder />
          </Route>
          <Route path="/user/:id">
            <ShowProfile />
          </Route>
          <Route path="/deleteposts">
            <DeletePosts />
          </Route>
          <Route path="/editprofile">
            <EditProfile />
          </Route>
          <Route path="/post/:id" children={<Post />} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/:id">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
