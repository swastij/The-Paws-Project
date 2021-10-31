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

export const viewPost = async (id) => {
  try {
    const res = await JSONClient.get(`posts/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deletePost = async (id, token) => {
  try {
    const res = await JSONClient.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};
