import {
    FORMClient,
    JSONClient
} from './bootstrap';

export const getAllPosts = async ({
    token
}) => {
    try {
        const res = await JSONClient.get('/posts/', {
            headers: {
                Authorization: token
            }
        })
        console.log(res);
        return res.data;
    } catch (e) {}
}





export const createPost = async ({
    token,
    caption,
    media,
    location,
    mediaType
}) => {
    try {
        var mediaID = ""
        if (media) {
            const formData = new FormData();
            formData.append('file', media)
            const mediaRes = await FORMClient.post('/file/upload', formData)
            mediaID = mediaRes.data
        }
        const res = await JSONClient.post("/post/create", {
            caption,
            location,
            media: mediaID,
            mediaType
        }, {
            headers: {
                Authorization: token
            }
        })
        console.log(res.data)
        return res.data;
    } catch (e) {

    }
}

export const createComment = async ({
    token,
    post,
    text
}) => {
    try {
        const res = await JSONClient.post('/comment/create', {
            post,
            text
        }, {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (e) {

    }
}

export const getComments = async ({
    post,
    token
}) => {
    try {
        const res = await JSONClient.get(`/comment/${post}`, {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (e) {

    }
}

export const createLike = async ({
    post,
    token
}) => {
    try {
        const res = await JSONClient.post('/like/add', {
            post
        }, {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (e) {

    }
}

export const removeLike = async ({
    post,
    token
}) => {
    try {
        const res = await JSONClient.post('/like/delete', {
            post
        }, {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (e) {
        
    }
}

export const getLikes = async ({
    post,
    token
}) => {
    try {
        const res = await JSONClient.get(`/like/${post}`, {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (e) {

    }
}