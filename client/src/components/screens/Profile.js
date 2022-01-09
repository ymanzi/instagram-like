import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1485463969733-3b3853b9d1bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{pics.length} posts</h6>
            <h6>{state ? state.followers.length : "0"} followers</h6>
            <h6>{state ? state.following.length : "0"} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {pics.map((item) => {
          return (
            <img
              //   style={{ width: "150px", height: "150px" }}
              className="item"
              src={item.photo}
              key={item._id}
              alt={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
