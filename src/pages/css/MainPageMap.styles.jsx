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
  height: ${({ active }) => (active ? '10rem' : '7rem')};
  background-color: ${({ active }) => (active ? '#9DBDED' : '#FAFCFF')};
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
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 2rem 0 5rem 5rem;
  box-sizing: border-box;
`;

export const Page2 = styled.div`
  flex: 0.7;
  height: 100%;
  max-height: 100%;
  margin-right: 2rem;
  margin-left: 5rem;
`;

export const Intro = styled.p`
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 2rem;
  margin-top: 30px;
`;

export const MapContainer = styled.div`
  border-radius: 2rem;
  margin-top: 20px;
  width: 100%;
  height: 600px;
`;

export const ReviewList = styled.div`
  width: 100%;
  margin-top: 8rem;
  height: 72%;
  overflow-y: auto;
  max-height: 100%;
  overflow-x: hidden; 
  border-radius: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;  
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 10px 0; 
`;

export const ContentText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
  margin-left: 3rem;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
`;

export const Star = styled.img`
  width: 1.3rem;
  margin-bottom: -0.1rem;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  display: block;
`;

export const Author = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 0;
`;

export const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const PaginationButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 2rem;
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

export const EmptyState = styled.div`
  width: 100%;
  height: 70%;
  padding-top: 6rem;
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  line-height: 1.5;

  img {
    width: 100px;
    opacity: 0.6;
    margin-bottom: 1.5rem;
  }
`;

export const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const PopupTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  margin-top: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const PopupActions = styled.div`
  margin-top: 1rem;
  text-align: right;

  button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #9DBDED;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const StarRating = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.25rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;




export const DeleteButton = styled.button`
  margin-right: 2rem;
  background: none;
  border: 1px solid red;
  color: red;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  height: 30px;  
  white-space: nowrap;

  &:hover {
    background-color: red;
    color: white;
  }
`;