import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useAuth } from "./AuthContext";

function Home() {
  const [allPost, setAllPost] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    axios.get("https://artfolio-y03z.onrender.com/api/post/getallpost").then((res) => {
      if (res.data.posts) {
        setAllPost(res.data.posts);
      } else {
        setAllPost([]);
      }
    });
  }, []);

  return (
    <div
      className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-16 p-10 bg-cover bg-center"
      style={{
        background: 'linear-gradient(to right, #000, #000)',
        userSelect: 'none',
        minHeight: '100vh',
        borderBottom: '2px solid #666666',
      }}
    >
      {allPost ? (
        <>
          {allPost.map((data, index) => (
            <div key={index} className="bg-[#1a1a1a] p-4 rounded-md relative text-white">
              <Card
                username={data.username}
                image={`https://artfolio-y03z.onrender.com/images/post/${data.postimage}`}
                likes={data.likes.length}
                avtar={`https://artfolio-y03z.onrender.com/images/avtar/${data.avtar}`}
                mainUser={isLoggedIn.username}
                liked={data.likes.includes(isLoggedIn.username)}
                postid={data._id}
                title={data.posttitle}
              />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
