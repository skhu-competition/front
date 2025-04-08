import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import logout_icon from "../assets/logout-icon.png";
import pen_icon from "../assets/pen-icon2.png";
import bookmark_icon from "../assets/bookmark-icon.png"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";

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
        axios.get(`/mypage/info`)
        .then(res => {
            setUserImgURL(res.data.profileImage);
            setUserId(res.data.name);
        })
        .catch(err=> {
            console.error("요청 실패", err);
            setUserImgURL(null);
            setUserId(null);
        })


        axios.get(`/mypage/tip`)
        .then(res => {
            setScrap(res.data);
        })
        .catch(err=> {
            console.error("요청 실패", err);
            setScrap([]);
        })

        axios.get(`/mypage/post/list`)
        .then(res => {
            setTip(res.data);
        })
        .catch(err=> {
            console.error("요청 실패", err);
            setTip([]);
        })
        
    }, [])



    useEffect(() => {
        axios.get(`/mypage/post/list`)
        .then(res => {
            setScrap(res.data);
        })
        .catch(err=> {
            console.error("요청 실패", err);
            setScrap([]);
        })
    }, [])

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

    const Bg = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        width: calc(100% - 15rem);
        height: 85vh;
        border-top-left-radius: 3rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: relative;
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
        height: ${({active}) => (active ? '10em' : '7em')};
        background-color: ${({ active }) => (active ? '#9DBDED' : '#fafcff')};
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        overflow: hidden;
        display: flex;
        justify-content: center;
    
        &:hover {
        cursor: pointer;
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

        display: ${({ isSelected }) => (isSelected ? 'none' : 'block')}
    `;

    const Page1 = styled.div`
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 2rem 5rem;
        box-sizing: border-box;
    `;

    const Intro = styled.p`
        width: 100%;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 2rem;
        margin-top: 30px;
    `;
    
    const MyUl = styled.ul`
        display: flex;
        width: 100%;
        height: 600px;
        list-style: none;
        gap: 2rem;

        & > li{
            height: 100%;
            border-radius: 2rem;
            background-color: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        }
        
    `
   

    const Li1 = styled.li`
        flex: 1;
        height: 100%;
        background: linear-gradient(to bottom, #E0ECFD 0%, #E0ECFD 40%, #fff 40%, #fff 100%);
        display: flex;
        flex-direction: column;  
        justify-content: center; 
        align-items: center;   
        gap: 1.5rem;   
    `

    const Li2 = styled.li`
        flex: 2;
        height: 100%;
        overflow-y: auto;
        max-height: 100%;  
        padding-right: 0.5rem; 
        overflow-x: hidden; 
    `

    
    
    const Profile = styled.img`
        margin-top: -1rem;
        width: 45%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: none;
        outline: none;
        background-color: transparent;
    `

    const Logout = styled.img`
        width: 13%;

        &:hover {
            cursor: pointer;
        }
    `

    const L1BottomUL = styled.ul`
        list-style: none;
        margin: 0;
        padding: 0;
        width: 80%; 
        border-top: 1px solid #ececec;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 1rem; 
        padding-top: 1rem;
    `;

    const BottonLi = styled.li`
        min-width: 100px;
        max-width: 150px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        word-break: keep-all;
    `;

    const BottonIcon = styled.img`
        width: 40%;
        max-width: 40px;
        height: auto;
    `
    const BottomTitle = styled.p`
        margin: 0.5rem 0 0.25rem;
        font-size: 1rem;
        font-weight: bold;
        color: #9DBDED;
        text-align: center;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
    `;

    const BottomP = styled.p`
        margin: 0;
        font-size: 0.7rem;
        color: #777;
        text-align: center;
        word-break: keep-all;
        white-space: normal;
        line-height: 1.3;       
    `;

    const L2Ul = styled.ul`
        padding: 0;
        margin: 0;
        list-style: none;
    `
    const L2Li = styled.li`
        width: 100%;
        background-color: white;
        border-bottom: 1px solid #f3f3f3;
        overflow: hidden; 
        padding: 1.5rem;
        &:last-child {
            border-bottom: 0px;
        }

    `

    const ContentRow = styled.div`
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        width: 100%;
        max-width: 100%;
        overflow: hidden; 
    `;

    const IconWrap = styled.div`
        width: 3rem;
        flex-shrink: 0;
    `;

    const Icon = styled.img`
        width: 100%;
        height: 100%;
        object-fit: contain;
    `;

    const ContentText = styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        overflow: hidden;
    `;
    const Title = styled.p`
        font-weight: bold;
        font-size: 1.1rem;
        margin: 0;
    `;

    const DateText = styled.span`
        font-size: 0.8rem;
        color: #999;
    `;

    const Description = styled.p`
        font-size: 0.9rem;
        color: #444;
        margin: 0.25rem 0 0;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        width: 80%; 
        display: block;
    `;


    const PaginationButtons = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 3rem 2rem;
    `;

    const PaginationBtn = styled.button`
        background-color: #9DBDED;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
        pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    `;
    const PageIndicator = styled.span`
        font-size: 1rem;
        font-weight: bold;
        color: #555;
        align-self: center;
    `;

    const Id = styled.p`
        font-size: 1.5rem;
        font-weight: bold;
        color: #444;
    `

    
    
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
                            <Logout src={logout_icon} alt="logout" />
                            <L1BottomUL>
                                <BottonLi onClick={() => setSubTabIndex(0)}>
                                    <BottonIcon src={pen_icon} alt="pen" />
                                    <BottomTitle>작성한 글</BottomTitle>
                                    <BottomP>작성한 게시물 보기</BottomP>
                                </BottonLi>
                                <BottonLi onClick={() => setSubTabIndex(1)}>
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
                                    <L2Li key={item.postId || idx}>
                                        <ContentRow>
                                            <IconWrap>
                                            <Icon src={subTabIndex === 0 ? pen_icon : bookmark_icon} alt="icon" />
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
                                                : item.status || "내용 없음"}
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