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

export const createToken = async ({ token, deviceToken }) => {
  try {
    const res = await JSONClient.post(
      "/notifications/token/create",
      {
        token: deviceToken,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const res = await JSONClient.post("/user/forgot-password", {
      email,
    });
    return res;
  } catch (e) {
    throw e.response.data;
  }
};

export const resetPassword = async ({ password, resetToken }) => {
  try {
    const res = await JSONClient.post("/user/reset-password", {
      password,
      token: resetToken,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const changePassword = async ({ old_password, new_password, token }) => {
  try {
    const res = await JSONClient.post(
      "/user/change-password",
      {
        old_password: old_password,
        new_password: new_password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};
export const verifyEmail = async ({ email, verification_token }) => {
  try {
    const res = await JSONClient.post("/user/verify-email", {
      email: email,
      verification_token: verification_token,
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e.response.data;
  }
};
export const postNotification = async ({
  fromUser,
  toUser,
  postId,
  message,
}) => {
  try {
    const res = await JSONClient.post("/notifications/save-notification", {
      fromUser: fromUser.id,
      toUser: toUser.id,
      postId: postId,
      message: message,
    });
    console.log("Response from backend", res);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getNotification = async ({ token }) => {
  try {
    const res = await JSONClient.get("/notifications/get-notification", {
      headers: {
        Authorization: token,
      },
    });
    // console.log('Response of get notif from backend', res);
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
