// import react from "react"
import axios from 'axios'
import {useRef} from 'react'
import {useHistory} from 'react-router-dom'
export default function DeletePosts(){
    const history=useHistory();
    // const titleRef=useRef();
    // const bodyRef=useRef();
    const idRef=useRef();
  
    function deletePost(){
        // this is js, pure js, we cannot use {} like we do in jsx (js inside html templates)
        // to use a variable here, we have to use string literals with backticks
        axios.delete(`https://sheetdb.io/api/v1/pm0c0w25rm4yr/id/${idRef.current.value}` ).then(()=>history.push('/posts')).catch(e=>console.log(e));
    }
    return (
        <div>
            <input ref={idRef} placeholder="id" /> 
            <button onClick={deletePost}>Delete</button>
        </div>
    )
}