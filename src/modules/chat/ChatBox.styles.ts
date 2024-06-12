import styled from 'styled-components';

export const ChatContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: ${props => (props.isVisible ? '500px' : '40px')};
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: height 0.3s;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
`;

export const ChatHeader = styled.div`
  height: 40px;
  background-color: #28B446; /* Màu xanh mint */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ChatButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #28B446; /* Màu xanh mint */
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
