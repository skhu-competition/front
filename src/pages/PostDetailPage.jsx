import React, { useState, useEffect, use } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import paperIcon from "../assets/paper-icon.png";
import xIcon from "../assets/x-icon.png";
import bookmarkFilled from "../assets/bookmark-filled.png";
import bookmarkOutline from "../assets/bookmark-outline.png";
import axios from "../api/AxiosInstance";
import "./css/PostDetailPage.css";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [postMessage, setPostMessage] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [scrapList, setScrapList] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchPost();
    fetchComments();  
    fetchScrapList();
  }, [id]);

  const fetchUserInfo = () => {
    axios.get(`/getuserinfo`)
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log("유저 정보 불러오기 실패", err));
  }

  const fetchPost = () => {
    axios.get(`/tip/${id}`)
      .then((res) => setPostMessage(res.data))
      .catch((err) => console.log("post 불러오기 실패", err));
  }

  const fetchComments = () => {
    axios.get(`/tip/${id}/comment`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log("댓글 불러오기 실패", err));
  };

  const fetchScrapList = () => {
    axios.get(`/mypage/post/list`)
      .then((res) => setScrapList(res.data))
      .catch((err) => console.log("스크랩 목록 불러오기 실패", err));
  }

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

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return alert("댓글을 입력해주세요!");

    axios.post(`/tip/${id}/comment`, { content: newComment })
      .then(() => {
        setNewComment("");  // 입력창 초기화
        fetchComments();    // 댓글 새로고침
      })
      .catch((err) => {
        console.log("댓글 작성 실패", err);
        alert("댓글 작성 실패");
      });
  };

  const isScrap = scrapList.some((post) => post.postId === Number(id));

  const handleScrap = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isScrap) {
      try {
        await axios.delete(`/tip/favorite/${id}?userId=${userInfo.userId}`);
        alert("스크랩 삭제 완료!");
        fetchScrapList();
      } catch (err) {
        console.log("스크랩 삭제 실패", err)
      }
      console.log("스크랩 취소 API 호출 자리!");
    } 
    else {
      try {
        await axios.post(`/tip/favorite/${id}?userId=${userInfo.userId}`);
        alert("스크랩 완료!");

        fetchScrapList();
      } catch (err) {
        console.error("스크랩 실패", err);
      }
    }
  };

  if (!postMessage) return <p>해당 글을 찾을 수 없습니다.</p>;

  return (
    <div className="wrap">
      <button className="close-detail-btn" onClick={() => navigate(-1)}>
        <img src={xIcon} alt="닫기" className="close-icon" />
      </button>
      <button className="scrap-btn" onClick={handleScrap}>
        <img src={isScrap ? bookmarkFilled : bookmarkOutline} alt="스크랩" />
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
        </div>

        <div className="postdetail-content">
          {postMessage.content}
        </div>

        {/* 댓글 영역 */}
        <div className="comment-section">
          <h3>댓글</h3>

          {comments.length === 0 ? (
            <p>첫 댓글을 남겨보세요!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.commentId} className="comment-item">
                <strong>{comment.authorName}</strong> | {comment.createdAt?.split("T")[0]}
                <p>{comment.content}</p>
              </div>
            ))
          )}

          <div className="comment-input-wrap">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요."
            />
            <button
              onClick={handleCommentSubmit}
              disabled={newComment.trim() === ""}
            >
              등록
            </button>
          </div>
        </div>

        {postMessage.userId === userInfo.userId && (
          <div className="postdetail-btns">
            <button className="delete-btn" onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
