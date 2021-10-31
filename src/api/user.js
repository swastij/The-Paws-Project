import { FORMClient, JSONClient, URLEncodedClient } from "./bootstrap";
import qs from "qs";

export const register = async (user) => {
  try {
    const res = await URLEncodedClient.post("/register", qs.stringify(user));
    return res.data;
    console.log(res);
  } catch (e) {
    throw e;
  }
};
export const login = async (user) => {
  try {
    const res = await URLEncodedClient.post("/login", qs.stringify(user));
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getProfileById = async (id, token) => {
  try {
    const res = await JSONClient.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};
export const edit = async (user, token) => {
  console.log(user)
  try {
    const res = await URLEncodedClient.put(`/users/${user.id}`, qs.stringify(user), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getUserById = async ({ userID, token }) => {
  try {
    const res = await JSONClient.get(`/user/${userID}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getFeeders = async () =>{
  try{
    const res = await JSONClient.get("/feeders");
    return res.data;
  } catch(e){
    throw e;
  }
}
