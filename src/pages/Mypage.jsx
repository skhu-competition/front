import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import logout_icon from "../assets/logout-icon.png";
import pen_icon from "../assets/pen-icon2.png";
import bookmark_icon from "../assets/bookmark-icon.png"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";
import {
  Wrap, Logo, Bg, IndexList, Index,
  IndexImage, Page1, MyUl, Li1, Li2,
  Profile, Logout, L1BottomUL, BottonLi,
  BottonIcon, BottomTitle, BottomP, L2Ul,
  L2Li, ContentRow, IconWrap, Icon,
  ContentText, Title, DateText, Description,
  PaginationButtons, PaginationBtn,
  PageIndicator, Id, Intro,
} from "./css/Mypage.styles";

const Mypage = () => {
    const [selectedIndex, setSelectedIndex] = useState(3);
    const [subTabIndex, setSubTabIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const [userImgURL, setUserImgURL] = useState(null);
    const [userId, setUserId] = useState(null);

    const [scrap, setScrap] = useState([]);
    const [tip, setTip] = useState([]);

    useEffect(() => {
        setCurrentPage(0); 
    }, [subTabIndex]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const [infoRes, scrapRes, tipRes] = await Promise.all([
            axios.get(`/mypage/info`),
            axios.get(`/mypage/post/list`),
            axios.get(`/mypage/tip`)
            ]);
            setUserImgURL(infoRes.data.profileImage);
            setUserId(infoRes.data.name);
            setScrap(scrapRes.data);
            setTip(tipRes.data);
        } catch (err) {
            console.error("데이터 요청 실패", err);
            setUserImgURL(null);
            setUserId(null);
            setScrap([]);
            setTip([]);
        }
    };

    const logoutHandle = async () => {
        try {
            await axios.delete(`/logOut`);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/");
        } catch (err) {
            console.error("로그아웃 실패", err);
        }
    };

    const handleTabChange = (index) => {
        setSubTabIndex(index);
        setCurrentPage(0);
    }

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const routes = [ '/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage' ];
    const indexImages = [ map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon ];

    const itemsPerPage = 4;
    const writtenItems = tip;
    const savedItems = scrap; 
    const currentItems = subTabIndex === 0 ? writtenItems : savedItems;

    const startIdx = currentPage * itemsPerPage;
    const paginatedItems = currentItems.slice(startIdx, startIdx + itemsPerPage);
    const totalPages = Math.ceil(currentItems.length / itemsPerPage);
    
    return (
        <Wrap>
            <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
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
            <Bg>
                <Page1>
                    <Intro>마이페이지</Intro>
                    <MyUl>
                        <Li1>
                            <Id>{userId ? userId : '달님이'}</Id>
                            <Profile src={userImgURL ? userImgURL : mypage_tap_icon} alt="profile" />
                            <Logout src={logout_icon} alt="logout" onClick={logoutHandle}/>
                            <L1BottomUL>
                                <BottonLi onClick={() => handleTabChange(0)}>
                                    <BottonIcon src={pen_icon} alt="pen" />
                                    <BottomTitle>작성한 글</BottomTitle>
                                    <BottomP>작성한 게시물 보기</BottomP>
                                </BottonLi>
                                <BottonLi onClick={() => handleTabChange(1)}>
                                    <BottonIcon src={bookmark_icon} alt="star" />
                                    <BottomTitle>저장한 글</BottomTitle>
                                    <BottomP>스크랩한 글 보기</BottomP>
                                </BottonLi>
                            </L1BottomUL>
                        </Li1>
                        <Li2>
                        {currentItems.length === 0 ? (
                        <p style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                            {subTabIndex === 0 ? "작성한 글이 없습니다." : "저장한 글이 없습니다."}
                        </p>
                        ) : (
                        <>
                            <L2Ul key={subTabIndex === 0 ? "written" : "saved"}>
                                {paginatedItems.map((item, idx) => (
                                    <L2Li key={item.postId || idx} onClick = {()=>{navigate(`/post/${item.postId}`)}}>
                                        <ContentRow>
                                            <IconWrap>
                                                <Icon src={subTabIndex === 0 ? item.image || pen_icon : bookmark_icon} alt="icon" />
                                            </IconWrap>
                                            <ContentText>
                                            <Title>
                                                {item.title || (subTabIndex === 0 
                                                ? `내가 작성한 글 ${startIdx + idx + 1}`
                                                : `내가 스크랩한 글 ${startIdx + idx + 1}`)}
                                            </Title>
                                            <DateText>
                                                {item.createdAt 
                                                ? new Date(item.createdAt).toLocaleDateString("ko-KR")
                                                : ""}
                                            </DateText>
                                            <Description>
                                                {subTabIndex === 0 
                                                ? item.content || "내용 없음"
                                                : item.content || "내용 없음"}
                                            </Description>
                                            </ContentText>
                                        </ContentRow>
                                    </L2Li>
                                    ))}
                                    </L2Ul>
                                    <PaginationButtons>
                                    <PaginationBtn onClick={goToPreviousPage} disabled={currentPage === 0}>
                                        이전
                                    </PaginationBtn>
                                    <PageIndicator>
                                        {currentPage + 1} / {totalPages}
                                    </PageIndicator>
                                    <PaginationBtn onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>
                                        다음
                                    </PaginationBtn>
                                    </PaginationButtons>
                                </>
                            )}
                        </Li2>  
                    </MyUl>
                </Page1>
            </Bg>
        </Wrap>
    );
};

export default Mypage;