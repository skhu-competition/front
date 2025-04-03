import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import paperIcon from "../assets/paper-icon.png";
import scrapIcon from "../assets/star-img.png";
import "./css/PostDetailPage.css";

const PostDetailPage = () => {
  const { id } = useParams();

  const [postMessage] = useState([
    {
      id: 1,
      title: "국수나무 jmt 메뉴 추천해드림",
      content: "이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요이곳에 내용을 적으세요 이렇게 적으세요 내용을 적으세요 이곳에 내용을 적으세요 이렇게 적으세요",
      category: "공부",
      date: "2025-04-03"
    }
  ]); // 임시 데이터

  const currentPost = postMessage.find(post => post.id === parseInt(id));

  const handleScrap = () => {
    const scrapList = JSON.parse(localStorage.getItem("scraps")) || [];
    const alreadyScrapped = scrapList.find(post => post.id === currentPost.id);
    if (!alreadyScrapped) {
      scrapList.push(currentPost);
      localStorage.setItem("scraps", JSON.stringify(scrapList));
      alert("스크랩 완료!");
    } else {
      alert("이미 스크랩된 글입니다.");
    }
  };

  if (!currentPost) return <p>해당 글을 찾을 수 없습니다.</p>;

  return (
    <div className="wrap">
      {/* 상단 로고 */}
      <img src={logo} alt="logo" className="title" />

      {/* ✅ 상세 게시글 */}
      <div className="postdetail-bg">
        <div className="postdetail-top">
          <img src={paperIcon} alt="paper" className="postdetail-icon" />
          <div className="postdetail-header">
            <h2 className="postdetail-title">{currentPost.title}</h2>
            <div className="postdetail-subinfo">
              내 아이디는 전뚠뚠 누나<br />
              날짜 : {currentPost.date}
            </div>
          </div>
          <div className="scrap-btn" onClick={handleScrap}>
            <img src={scrapIcon} alt="scrap" />
            <span>스크랩하기</span>
          </div>
        </div>

        <div className="postdetail-content">
          {currentPost.content}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
