import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import paperIcon from "../assets/paper-icon.png";
import bookmarkOutline from "../assets/bookmark-outline.png";
import bookmarkFilled from "../assets/bookmark-filled.png";
import xIcon from "../assets/x-icon.png";
import "./css/PostDetailPage.css";
import axios from "../api/AxiosInstance";
import { useLocation } from 'react-router-dom';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrapped, setIsScrapped] = useState(false);
  const [postMessage, setPostMessage] = useState(null);
  const location = useLocation();
  const category = location.state?.category;

 

  useEffect(() => {
    axios.get(`/tip/${id}`)
      .then((res) => {
        setPostMessage(res.data);
      })
      .catch((err) => console.log("post 불러오기 실패", err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`/tip/${id}`)
        .then(() => {
          alert("삭제가 완료되었습니다.");
          navigate(-1);  
        })
        .catch((err) => {
          console.log("삭제 실패", err);
          alert("삭제 실패");
        });
    }
  };
  const loginUserName = "한시연"
  if (!postMessage) return <p>해당 글을 찾을 수 없습니다.</p>;

  return (
    <div className="wrap">
      <button className="close-detail-btn" onClick={() => navigate(-1)}>
        <img src={xIcon} alt="닫기" className="close-icon" />
      </button>

      <img src={logo} alt="logo" className="title" onClick={() => navigate('/')} />

      <div className="postdetail-bg">
        <div className="postdetail-top">
          <img src={postMessage.image || paperIcon} alt="paper" className="postdetail-icon" />
          <div className="postdetail-header">
            <h2 className="postdetail-title">{postMessage.title}</h2>
            <div className="postdetail-subinfo">
              {postMessage.userName}<br />
              날짜 : {postMessage.createdAt?.split("T")[0]}
            </div>
          </div>

          {/* 스크랩 버튼 */}
          {/* <div className="scrap-btn" onClick={handleScrap}>
            <img src={isScrapped ? bookmarkFilled : bookmarkOutline} alt="스크랩" />
            <span>스크랩하기</span>
          </div> */}
        </div>

        <div className="postdetail-content">
          {postMessage.content}
        </div>

        {postMessage.userName === loginUserName && (
          <div className="postdetail-btns">
            <button className="delete-btn" onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
