import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";
import "./css/PostEditPage.css";

const PostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = () => {
    axios.get(`/tip/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setPreviewImage(res.data.image); // 기존 이미지 미리보기
      })
      .catch((err) => {
        console.log("post 불러오기 실패", err);
        alert("게시글 정보를 불러오는데 실패했습니다.");
        navigate(-1);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    axios.put(`/tip/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("수정이 완료되었습니다.");
        navigate(`/post/${id}`);
      })
      .catch((err) => {
        console.log("수정 실패", err);
        alert("게시글 수정에 실패했습니다.");
      });
  };

  return (
    <div className="edit-wrap">
      <h2>게시글 수정</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="edit-title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="edit-content"
      />

      <div className="img-upload-wrap">
        {previewImage ? (
          <img src={previewImage} alt="미리보기" className="preview-img" />
        ) : (
          <div className="img-placeholder">
            이미지를 업로드 해주세요
          </div>
        )}

        <label htmlFor="image-upload" className="img-upload-btn">
          이미지 업로드
        </label>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <div className="edit-btns">
        <button onClick={() => navigate(-1)} className="cancel-btn">취소</button>
        <button onClick={handleUpdate} className="save-btn">수정완료</button>
      </div>
    </div>
  );
};

export default PostEditPage;
