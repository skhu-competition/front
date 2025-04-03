import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import paperIcon from "../assets/paper-icon.png";
import noPostIcon from "../assets/empty.png";
import logo from "../assets/logo.png";
import "./css/Categorypage.css";

const CategoryPage = ({ posts }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const filteredPosts = posts.filter((post) => post.category === name);

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      const newPost = {
        title,
        content,
        category: name,
        date: new Date().toISOString().split("T")[0],
      };
      alert("글이 등록되었습니다! (임시)");
      setIsModalOpen(false); //현재 비어있는 배열 상태
      setTitle("");
      setContent("");
      // 여기에서 setPosts로 추가해주려면 App에서 상태 관리 필요!
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const currentUser = "전뚠뚠 누나"; // 실제 유저 정보 받으면 props나 context로 수정하겠습니당

  return (
    <div className="wrap">
      <img src={logo} alt="logo" className="title" />
      <ul className="index_list">
        <li></li>
        <li className="active"></li>
        <li></li>
        <li></li>
      </ul>

      <div className="category-bg">
        <div className="category-header">
          <h2 className="category-title">{name} 게시판 ▷</h2>
          <button className="write-btn" onClick={() => setIsModalOpen(true)}>
            🖋 글쓰기
          </button>
        </div>

        <ul className="post-list">
          {filteredPosts.length === 0 ? (
            <div className="empty-box">
              <img src={noPostIcon} alt="empty" className="empty-img" />
              <p className="empty-text">
                아직 작성된 글이 없어요! 📝<br />
                첫 번째 글을 작성해보세요.
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <li className="post-item" key={index}>
                <div className="post-left">
                  <img src={paperIcon} alt="paper" />
                  <span className="post-title">{post.title}</span>
                </div>
                <div className="post-right">
                  <p className="post-content">{post.content}</p>
                  <span className="post-date">{post.date}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* ✅ 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>

            <div className="modal-header">
              <img src={paperIcon} alt="paper" className="modal-icon-small" />
              <div className="modal-header-text">
                <input
                  className="modal-title-input"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div className="modal-subinfo">
                  아이디 : 전뚠뚠 누나<br /> 
                  날짜 : {new Date().toISOString().split("T")[0]}
                </div>
              </div>
            </div>

            <textarea
              className="modal-textarea no-border"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button className="submit-btn" onClick={handleSubmit}>등록하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
