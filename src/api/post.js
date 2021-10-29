import { FORMClient, JSONClient, URLEncodedClient } from "./bootstrap";

export const getAllPosts = async ({ token }) => {
  try {
    const res = await JSONClient.get("/posts/", {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (e) {}
};

export const createPost2 = async (post, token) => {
  var data = new FormData();
  data.append("image", post.image);
  data.append("post[name]", post.name);
  data.append("post[animal_type]", post.animal_type);
  data.append("post[breed]", post.breed);
  data.append("post[age]", post.age);
  data.append("post[gender]", post.gender);
  data.append("post[isVaccinated]", post.isVaccinated);
  data.append("post[isDewormed]", post.isDewormed);
  try {
    const res = await FORMClient.post("/posts", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

// export const createPost = async ({
//     token,
//     caption,
//     media,
//     location,
//     mediaType
// }) => {
//     try {
//         var mediaID = ""
//         const res = await JSONClient.post("/posts", {
//             caption,
//             location,
//             media: mediaID,
//             mediaType
//         }, {
//             headers: {
//                 Authorization: token
//             }
//         })
//         console.log(res.data)
//         return res.data;
//     } catch (e) {

//     }
// }

export const createComment = async ({ token, post, text }) => {
  try {
    const res = await JSONClient.post(
      "/comment/create",
      {
        post,
        text,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (e) {}
};

export const getComments = async ({ post, token }) => {
  try {
    const res = await JSONClient.get(`/comment/${post}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {}
};

export const createLike = async ({ post, token }) => {
  try {
    const res = await JSONClient.post(
      "/like/add",
      {
        post,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (e) {}
};

export const removeLike = async ({ post, token }) => {
  try {
    const res = await JSONClient.post(
      "/like/delete",
      {
        post,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (e) {}
};

export const getLikes = async ({ post, token }) => {
  try {
    const res = await JSONClient.get(`/like/${post}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (e) {}
};
