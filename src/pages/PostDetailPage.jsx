import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import paperIcon from "../assets/paper-icon.png";
import bookmarkOutline from "../assets/bookmark-outline.png";
import bookmarkFilled from "../assets/bookmark-filled.png";
import "./css/PostDetailPage.css";

const PostDetailPage = () => {
  const { id } = useParams();
  const [isScrapped, setIsScrapped] = useState(false);

  const [postMessage] = useState([
    {
      id: 1,
      title: "국수나무 jmt 메뉴 추천해드림",
      content: "이곳에 내용을 적으세요 이렇게 적으세요 ...",
      category: "공부",
      date: "2025-04-03"
    }
  ]);

  const currentPost = postMessage.find(post => post.id === parseInt(id));

  // 처음 마운트될 때 로컬스토리지 확인해서 스크랩 상태 반영
  useEffect(() => {
    const scrapList = JSON.parse(localStorage.getItem("scraps")) || [];
    const alreadyScrapped = scrapList.find(post => post.id === currentPost?.id);
    if (alreadyScrapped) setIsScrapped(true);
  }, [currentPost]);

  const handleScrap = () => {
    const scrapList = JSON.parse(localStorage.getItem("scraps")) || [];

    if (isScrapped) {
      // 스크랩 제거
      const updated = scrapList.filter(post => post.id !== currentPost.id);
      localStorage.setItem("scraps", JSON.stringify(updated));
      setIsScrapped(false);
      alert("스크랩이 취소되었습니다.");
    } else {
      // 스크랩 추가
      scrapList.push(currentPost);
      localStorage.setItem("scraps", JSON.stringify(scrapList));
      setIsScrapped(true);
      alert("스크랩 완료!");
    }
  };

  if (!currentPost) return <p>해당 글을 찾을 수 없습니다.</p>;

  return (
    <div className="wrap">
      <img src={logo} alt="logo" className="title" />

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

          {/* ⭐ 스크랩 버튼 */}
          <div className="scrap-btn" onClick={handleScrap}>
            <img src={isScrapped ? bookmarkFilled : bookmarkOutline} alt="스크랩" />
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
