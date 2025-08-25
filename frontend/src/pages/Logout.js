import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageWrapper>
      <LogoutCard>
        <UserName>{currentUser?.name || 'User'}</UserName>
        <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
        <ButtonGroup>
          <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
          <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </ButtonGroup>
      </LogoutCard>
    </PageWrapper>
  );
};

export default Logout;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #8e44ad, #3498db);
  padding: 20px;
`;

const LogoutCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.4s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const UserName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const LogoutMessage = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const LogoutButton = styled.button`
  flex: 1;
  padding: 12px 0;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  &:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background: linear-gradient(135deg, #6c5ce7, #341f97);
  &:hover {
    background: linear-gradient(135deg, #341f97, #1e1466);
  }
`;
