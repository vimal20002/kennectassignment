'use client'
import Link from 'next/link'
import { useState } from 'react';
import { FaRegComment } from "react-icons/fa";
import Button from './Button';
import Input from './Input';
import CommentCard from './Commentcard';
const Post = ({title, val, userName, uid,id, comments, fetchBlogs}) => {
  const [show, setShow] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const handleAddComment = async()=>{
    const formData = {
      comment: commentValue,
      username:userName,
      id
    }
    setCommentValue("");
    const response = await fetch(`./api/addComment`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    if (response.status === 201) {
      fetchBlogs();
      alert("Comment added succesfully !")
    }
    else {
      alert("Some Glitch Occurred !")
    }
    fetchBlogs();
  }
  return (
    <div className="postBox">
        <span className="post-top"><h4 className="post-title">{title}</h4></span>
        <p className="post-val">{val}</p>
        <Link href={`/user/${uid}`}><h4 className="userName">{userName}</h4> </Link>
        <FaRegComment onClick={()=>{setShow(!show)}}/>
        {
            show ?
              <div className="commentSection">

                {comments?.map((e) => {
                  return <CommentCard username={e?.username} comment={e?.comment} />
                })}
                <div className="commentInput">
                  <Input placeValue={"Add Comment"} onChangeFun={ setCommentValue} type="text" name="" id="" value={commentValue}  />
                  <Button handleSubmit={handleAddComment} value={"Add Comment"} />
                </div>
              </div>
              : ""
          }
    </div>
  )
}

export default Post