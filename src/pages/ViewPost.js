import react, { useEffect } from "react"
import { ViewPost } from "../api/post";

export default ViewPost=({
    id
})=>{
    const [post, setPost] = useState(null);
    const handleViewPost= async (id)=>{
        const res = await ViewPost(id);
        console.log("post- ", res);
        setPost(res);
    }

    useEffect(()=>{
        handleViewPost();
    },[]);

    return (
        <div>
            {post.name}
        </div>
    )
}