import styled from "styled-components";

export const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #E0ECFD;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const Logo = styled.img`
    position: absolute;
    width: 13rem; 
    top: 3rem;
    left: 1rem;
    cursor: pointer;
    z-index: 2;
`;

export const Bg = styled.div`
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

export const IndexList = styled.ul`
    margin-top: 1.5rem;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    align-self: center;
    flex-direction: column;
    gap: 2rem;
`;

export const Index = styled.div`
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

export const IndexImage = styled.img`
    text-align: center;
    margin: auto 0;
    width: 50px;
    height: 50px;
    display: ${({ isSelected }) => (isSelected ? 'none' : 'block')}
`;

export const Page1 = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem 5rem;
    box-sizing: border-box;
`;

export const Intro = styled.p`
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 2rem;
    margin-top: 30px;
`;

export const MyUl = styled.ul`
    display: flex;
    width: 100%;
    height: 600px;
    list-style: none;
    gap: 2rem;

    & > li {
        height: 100%;
        border-radius: 2rem;
        background-color: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    }
`;

export const Li1 = styled.li`
    flex: 1;
    height: 100%;
    background: linear-gradient(to bottom, #E0ECFD 0%, #E0ECFD 40%, #fff 40%, #fff 100%);
    display: flex;
    flex-direction: column;  
    justify-content: center; 
    align-items: center;   
    gap: 1.5rem;   
`;

export const Li2 = styled.li`
    flex: 2;
    height: 100%;
    overflow-y: auto;
    max-height: 100%;  
    padding-right: 0.5rem; 
    overflow-x: hidden; 
`;

export const Profile = styled.img`
    margin-top: -1rem;
    width: 45%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: none;
    outline: none;
    background-color: transparent;
`;

export const Logout = styled.img`
    width: 13%;

    &:hover {
        cursor: pointer;
    }
`;

export const L1BottomUL = styled.ul`
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

export const BottonLi = styled.li`
    min-width: 100px;
    max-width: 150px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    word-break: keep-all;
`;

export const BottonIcon = styled.img`
    width: 40%;
    max-width: 40px;
    height: auto;
`;

export const BottomTitle = styled.p`
    margin: 0.5rem 0 0.25rem;
    font-size: 1rem;
    font-weight: bold;
    color: #9DBDED;
    text-align: center;
    word-break: keep-all;
    white-space: normal;
    overflow-wrap: break-word;
`;

export const BottomP = styled.p`
    margin: 0;
    font-size: 0.7rem;
    color: #777;
    text-align: center;
    word-break: keep-all;
    white-space: normal;
    line-height: 1.3;       
`;

export const L2Ul = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`;

export const L2Li = styled.li`
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #f3f3f3;
    overflow: hidden; 
    padding: 1.5rem;

    &:last-child {
        border-bottom: 0px;
    }
`;

export const ContentRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    max-width: 100%;
    overflow: hidden; 
`;

export const IconWrap = styled.div`
    width: 3rem;
    flex-shrink: 0;
`;

export const Icon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const ContentText = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
`;

export const Title = styled.p`
    font-weight: bold;
    font-size: 1.1rem;
    margin: 0;
`;

export const DateText = styled.span`
    font-size: 0.8rem;
    color: #999;
`;

export const Description = styled.p`
    font-size: 0.9rem;
    color: #444;
    margin: 0.25rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%; 
    display: block;
`;

export const PaginationButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3rem 2rem;
`;

export const PaginationBtn = styled.button`
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

export const PageIndicator = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: #555;
    align-self: center;
`;

export const Id = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
`;
