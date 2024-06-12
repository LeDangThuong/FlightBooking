import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: ${props => (props.isVisible ? '400px' : '50px')};
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
`;

const ChatHeader = styled.div`
  background-color: #28B446;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ChatBody = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
  background-color: #f9f9f9;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ChatButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #28B446;
  color: white;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ChatMessage = styled.div<{ isCustomer: boolean }>`
  align-self: ${props => (props.isCustomer ? 'flex-end' : 'flex-start')};
  color: black;
  margin: 5px 0;
  display: inline-block;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  max-width: 70%;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const MessageTimestamp = styled.div`
  font-size: 0.8em;
  color: #888;
  margin-top: 4px;
`;

interface Message {
    content: string;
    senderId: number;
    receiverId?: number;
    type?: string;
    createdAt: string;
}

const ClientChatBox: React.FC = () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aHVvbmdsZSIsImlhdCI6MTcxODE4MTIwNiwiZXhwIjoxNzE4MTk1NjA2fQ.hJZ7PyD7u2KFOnb6H-JV-C-MC68J-48Smq0c3lPeLwc"; // Token của user là customer
    const [isVisible, setIsVisible] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const chatBodyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch(`https://flightbookingbe-production.up.railway.app/users/token?token=${token}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserId(data.id);
                } else {
                    console.error('Failed to fetch user ID');
                }
            } catch (error) {
                console.error('Error fetching user ID', error);
            }
        };

        fetchUserId();
    }, [token]);

    useEffect(() => {
        const connectWebSocket = () => {
            socketRef.current = new WebSocket('wss://flightbookingbe-production.up.railway.app/ws');

            socketRef.current.onopen = () => {
                console.log('WebSocket connected');
                if (socketRef.current && userId) {
                    socketRef.current.send(JSON.stringify({ type: 'JOIN', senderId: userId }));
                }
            };

            socketRef.current.onmessage = (event) => {
                const message: Message = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, message]);
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket disconnected, attempting to reconnect...');
                setTimeout(connectWebSocket, 5000);
            };

            socketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        if (userId) {
            connectWebSocket();
        }

        return () => {
            socketRef.current?.close();
        };
    }, [userId]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && socketRef.current?.readyState === WebSocket.OPEN && userId) {
            const message: Message = {
                content: newMessage,
                senderId: userId,
                createdAt: new Date().toISOString(),
            };
            socketRef.current?.send(JSON.stringify(message));
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
        } else {
            console.log('WebSocket is not open');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <ChatContainer isVisible={isVisible}>
            <ChatHeader onClick={() => setIsVisible(!isVisible)}>
                <HeaderTitle>
                    <div>Golobe - Chat với chúng tôi</div>
                </HeaderTitle>
                <CloseButton onClick={() => setIsVisible(!isVisible)}>×</CloseButton>
            </ChatHeader>
            {isVisible && (
                <>
                    <ChatBody ref={chatBodyRef}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ textAlign: msg.senderId === userId ? 'right' : 'left' }}>
                                <ChatMessage key={index} isCustomer={msg.senderId === userId}>
                                    <span>{msg.content}</span>
                                    <MessageTimestamp>{new Date(msg.createdAt).toLocaleString()}</MessageTimestamp>
                                </ChatMessage>
                            </div>
                        ))}
                    </ChatBody>
                    <ChatInputContainer>
                        <ChatInput
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập nội dung..."
                        />
                        <ChatButton onClick={handleSendMessage}>Gửi</ChatButton>
                    </ChatInputContainer>
                </>
            )}
        </ChatContainer>
    );
};

export default ClientChatBox;
