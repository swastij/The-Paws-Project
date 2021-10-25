// import react from "react"
import {useEffect, useState} from 'react'
import axios from 'axios'
export default function JsonPlaceholder(){
    const [posts, setPosts]=useState([]);
    useEffect(function(){
        axios.get('https://sheetdb.io/api/v1/pm0c0w25rm4yr').then(function(response){ setPosts(response.data)});
        // axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>{ setPosts(response.data)});
        // axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>setPosts(response.data));
        // axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>setPosts(response.data));



    },[]);
    return (
        <div>
        <div>
            {
                posts.map((post, index)=>
                    <div key={index}>
                        <p>{post.body}</p>
                        <p>{post.title}</p>

                    </div>
                )
            }
        </div>
         {/* <div>
         {
             posts.map((post, index)=>{
                return <div key={index}>
                     <p>{post.body}</p>
                     <p>{post.title}</p>
                     <p>{post.id}</p>
         
                 </div>
             }
             )
         }
     </div>
     <div>
         {
             posts.map(function(post, index){
                return <div key={index}>
                     <p>{post.body}</p>
                     <p>{post.title}</p>
                     <p>{post.id}</p>
         
                 </div>
             }
             )
         }
     </div> */}
     </div>
    )
}