import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from '../api/AxiosInstance';
import paperIcon from "../assets/paper-icon.png";
import noPostIcon from "../assets/empty.png";
import penIcon from "../assets/pen-icon.png";
import xIcon from "../assets/x-icon.png";
import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import "./css/Categorypage.css";

const categoryMapping = [
  { id: '1', category: '공부' },
  { id: '2', category: '새내기' },
  { id: '3', category: '기숙사' }
];

const indexImages = [map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon];
const routes = ['/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage'];

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [preview, setPreview] = useState(null);

  const uploadImg = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [currentUser, setCurrentUser] = useState("익명");

  const categoryCorrect = categoryMapping.find((item) => item.id === id);

  useEffect(() => {
    if (id && !categoryCorrect) navigate('/mainpagehoney', { replace: true });
  }, [id, categoryCorrect, navigate]);

  useEffect(() => {
    if (!id || !categoryCorrect) return;
    axios.get(`/tip/categories/${id}`)
      .then(res => setPosts(res.data))
      .catch(err => console.error("게시글 불러오기 실패", err));
  }, [id, categoryCorrect]);

  const handleSubmit = async () => {
  if (!title.trim() || !content.trim()) return;

  const formData = new FormData();

  try {
    let fileToSend = image;

    if (!image) {
      // 기본 이미지 fetch 후 Blob 생성
      const response = await fetch(paperIcon);
      const blob = await response.blob();
      fileToSend = new File([blob], "default.png", { type: blob.type });
    }

    formData.append("image", fileToSend);

    const uploadRes = await axios.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const fileUrl = uploadRes.data.fileUrl;

    await axios.post('/tip', {
      categoryId: id,
      title,
      content,
      image: fileUrl,
    });

    const res = await axios.get(`/tip/categories/${id}`);
    setPosts(res.data); 

    alert("글이 등록되었습니다!");
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setImage(null);
    setPreview(null);
  } catch (err) {
      console.log("게시글 전송 실패", err);
      setIsModalOpen(false);
      setTitle("");
      setContent("");
  }
};

  const currentDate = new Date().toISOString().split("T")[0];
  

  return (
    <Wrap>
      {!isModalOpen && (
        <Logo src={logo} alt="logo" onClick={() => navigate('/')} tabIndex={-1} />
      )}

      <IndexList>
        {[0, 1, 2, 3].map((i) => (
          <Index
            key={i}
            active={selectedIndex === i}
            onClick={() => {
              setSelectedIndex(i);
              navigate(routes[i]);
            }}
          >
            <IndexImage src={indexImages[i]} isSelected={selectedIndex === i} />
          </Index>
        ))}
      </IndexList>

      <div className="category-bg">
        <div className="category-header">
          <Intro>{categoryCorrect?.category} 게시판 ▷</Intro>
          <button className="write-btn" onClick={() => setIsModalOpen(true)}>
            <img src={penIcon} alt="글쓰기" className="write-icon" /> 글쓰기
          </button>
        </div>

        <ul className="post-list">
          {posts.length === 0 ? (
            <div className="empty-box">
              <img src={noPostIcon} alt="empty" className="empty-img" />
              <p className="empty-text">
                아직 작성된 글이 없어요! 📝<br />첫 번째 글을 작성해보세요.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <li className="post-item" key={post.postId} onClick={() => navigate(`/post/${post.postId}`)}>
                <div className="post-left">
                  <img src={post.image || paperIcon} className="post-img" alt="postImg" />
                  <div className="post-texts">
                    <span className="post-title">{post.title}</span>
                    <p className="post-content">{post.content}</p>
                  </div>
                </div>
                <div className="post-right">
                  {/* <p className="post-content">{post.content}</p> */}
                  <span className="post-username">{post.userName}</span>
                  <span className="post-date">{post.createdAt?.split("T")[0]}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <img src={xIcon} alt="닫기" className="close-icon" />
            </button>
            <div className="modal-header">
              {preview ? (
                <img src={preview} alt="preview" className="modal-icon-small" onClick={() => uploadImg.current?.click()} />
              ) : (
                <img src={paperIcon} alt="paper" className="modal-icon-small" onClick={() => uploadImg.current?.click()} />
              )}

              <input
                type="file"
                accept="image/*"
                ref={uploadImg}
                style={{ display: "none", width: "10%" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreview(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <div className="modal-header-text">
                <input
                  ref={titleRef}
                  className="modal-title-input"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="modal-subinfo">
                  날짜 : {currentDate}
                </div>
              </div>
            </div>

            <textarea
              ref={contentRef}
              className="modal-textarea no-border"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button className="submit-btn" onClick={handleSubmit}>등록하기</button>
          </div>
        </div>
      )}
    </Wrap>
  );
};

export default CategoryPage;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #E0ECFD;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Logo = styled.img`
  position: absolute;
  width: 13rem;
  top: 3rem;
  left: 1rem;
  cursor: pointer;
  z-index: 2;
`;

const IndexList = styled.ul`
  margin-top: 1.5rem;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  align-self: center;
  flex-direction: column;
  gap: 2rem;
`;

const Index = styled.div`
  width: 5rem;
  height: ${({ active }) => (active ? '10rem' : '7rem')};
  background-color: ${({ active }) => (active ? '#9DBDED' : '#FAFCFF')};
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  justify-content: center;
  cursor: pointer;

  &:hover {
    height: 10rem;
    background-color: ${({ active }) => (active ? '#9DBDED' : '#dceaff')};

    img {
      opacity: 0;
    }
  }
`;

const IndexImage = styled.img`
  text-align: center;
  margin: auto 0;
  width: 50px;
  height: 50px;
  display: ${({ isSelected }) => (isSelected ? 'none' : 'block')};
`;

const Intro = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
`;