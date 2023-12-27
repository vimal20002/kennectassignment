"use client"
import Button from "@app/components/Button"
import Input from "@app/components/Input"
import Post from "@app/components/Post"
import { useEffect, useState } from "react"
var result;

const AllBlogPage = () => {
    const [data, setData] = useState(null)
    const fetchBlogs = async()=>{
        const res = await fetch('/api/getAllPost');
        const dt = await res.json();
        result=dt;
        setData(dt)
    }
    useEffect(()=>{
        fetchBlogs()
    },[])
    useEffect(()=>{
    },[data])
    const handleSearch = (val)=>{
        console.log(val)
        if(val.length === 0)
        {
            setData(result)
        }
        else{
        const obj = result?.filter((e)=>{
            return e?.post?.titlte?.toLowerCase().includes(val.toLowerCase()) ;
        })
        setData(obj)
        if(obj?.length === 0)
        {
            const obj2 =  result?.filter((post)=>{
                const dt = post?.comments?.filter((e) => {
                    return e?.comment.toLowerCase().includes(val.toLowerCase());
                  })
                  return dt.length;
        })
                setData(obj2)
        }

        }
    }
  return (
    <div className="allPost">
        <div className="search-box"><input className="inp" type="text" placeholder=" Title Or Comments" name="sch" onChange={(e)=>{handleSearch(e.target.value)}}/>
        <Button value="Search" handleSubmit={handleSearch}/>
        </div>
        {data ?<h1>Recent Blogs</h1>:''}
        {
            data? data?.map((e)=>{
                return <Post comments={e?.comments} title={e?.post.titlte} uid={e?.uid} id={e?._id} key={e?._id} userName={e?.userName} val={e?.post.val} fetchBlogs={fetchBlogs}/>
            }):<h1>Loadinggg.....</h1>
        }
        {data?.length===0 && <h1>Nothing To show</h1>}
        
    </div>
  )
}

export default AllBlogPage