import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import paperIcon from "../assets/paper-icon.png";
import bookmarkOutline from "../assets/bookmark-outline.png";
import bookmarkFilled from "../assets/bookmark-filled.png";
import "./css/PostDetailPage.css";
import axios from "../api/AxiosInstance";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrapped, setIsScrapped] = useState(false);

  const [postMessage, setPostMessage] = useState([]);

  // const currentPost = postMessage.find(post => post.id === parseInt(id));

  // 처음 마운트될 때 로컬스토리지 확인해서 스크랩 상태 반영
  useEffect(() => {
    axios.get(`/tip/${id}`)
      .then((res) => {
        setPostMessage(res.data);
      })
      .catch((err) => console.log("post 불러오기 실패", err))
    
    // axios.get(`/`)

    // const scrapList = JSON.parse(localStorage.getItem("scraps")) || [];
    // const alreadyScrapped = scrapList.find(post => post.id === currentPost?.id);
    // if (alreadyScrapped) setIsScrapped(true);
  }, []);

  // const handleScrap = () => {
  //   const scrapList = JSON.parse(localStorage.getItem("scraps")) || [];

  //   if (isScrapped) {
  //     // 스크랩 제거
  //     const updated = scrapList.filter(post => post.id !== currentPost.id);
  //     localStorage.setItem("scraps", JSON.stringify(updated));
  //     setIsScrapped(false);
  //     alert("스크랩이 취소되었습니다.");
  //   } else {
  //     // 스크랩 추가
  //     scrapList.push(currentPost);
  //     localStorage.setItem("scraps", JSON.stringify(scrapList));
  //     setIsScrapped(true);
  //     alert("스크랩 완료!");
  //   }
  // };

  if (!postMessage) return <p>해당 글을 찾을 수 없습니다.</p>;

  return (
    <div className="wrap">
      <img src={logo} alt="logo" className="title" onClick={() => navigate('/')}/>

      <div className="postdetail-bg">
        <div className="postdetail-top">
          <img src={postMessage.image || paperIcon} alt="paper" className="postdetail-icon" />
          <div className="postdetail-header">
            <h2 className="postdetail-title">{postMessage.title}</h2>
            <div className="postdetail-subinfo">
              내 아이디는 전뚠뚠 누나<br />
              날짜 : {postMessage.createdAt?.split("T")[0]}
            </div>
          </div>

          {/* ⭐ 스크랩 버튼 */}
          {/* <div className="scrap-btn" onClick={handleScrap}>
            <img src={isScrapped ? bookmarkFilled : bookmarkOutline} alt="스크랩" />
            <span>스크랩하기</span>
          </div> */}
        </div>

        <div className="postdetail-content">
          {postMessage.content}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
