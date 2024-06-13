import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface Message {
    content: string;
    senderId: number;
    receiverId: number | null;
    createdAt: string;
}

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

const CustomerChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const [isSupportActive, setIsSupportActive] = useState<boolean>(false);
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [supportAgentName, setSupportAgentName] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const socketRef = useRef<WebSocket | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aHVvbmdsZSIsImlhdCI6MTcxODE4MTIwNiwiZXhwIjoxNzE4MTk1NjA2fQ.hJZ7PyD7u2KFOnb6H-JV-C-MC68J-48Smq0c3lPeLwc"; // Token của customer

    useEffect(() => {
        const fetchCustomerId = async () => {
            try {
                const response = await fetch(`http://localhost:7050/users/token?token=${token}`);
                if (response.ok) {
                    const data = await response.json();
                    setCustomerId(data.id);
                } else {
                    console.error('Failed to fetch customer ID');
                }
            } catch (error) {
                console.error('Error fetching customer ID', error);
            }
        };

        fetchCustomerId();
    }, [token]);

    useEffect(() => {
        const connectWebSocket = () => {
            socketRef.current = new WebSocket('ws://localhost:7050/ws');

            socketRef.current.onopen = () => {
                console.log('WebSocket connection established');
            };

            socketRef.current.onmessage = async (event) => {
                const newMessage: Message = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, newMessage]);

                if (newMessage.receiverId === customerId && newMessage.senderId !== customerId) {
                    setReceiverId(newMessage.senderId);
                    // Fetch the admin's name
                    try {
                        const response = await fetch(`http://localhost:7050/message/admin/${newMessage.senderId}`);
                        if (response.ok) {
                            const admin = await response.json();
                            setSupportAgentName(admin.name);
                        }
                    } catch (error) {
                        console.error('Error fetching admin name', error);
                    }
                    setIsSupportActive(true);
                }
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket connection closed');
            };

            socketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [customerId]);

    const sendMessage = () => {
        if (customerId !== null && socketRef.current) {
            const messageContent: Message = {
                content: message,
                senderId: customerId,
                receiverId: receiverId,
                createdAt: new Date().toISOString() // Use ISO 8601 format
            };

            socketRef.current.send(JSON.stringify(messageContent));
            setMessage('');
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
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
                            <div key={index} style={{ textAlign: msg.senderId === customerId ? 'right' : 'left' }}>
                                <ChatMessage key={index} isCustomer={msg.senderId === customerId}>
                                    <span>{msg.content}</span>
                                    <MessageTimestamp>{new Date(msg.createdAt).toLocaleString()}</MessageTimestamp>
                                </ChatMessage>
                            </div>
                        ))}
                        {!isSupportActive && <div>Chờ nhân viên phản hồi</div>}
                        {isSupportActive && <div>Nhân viên {supportAgentName} đang trong cuộc trò chuyện với bạn</div>}
                    </ChatBody>
                    <ChatInputContainer>
                        <ChatInput
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập nội dung..."
                        />
                        <ChatButton onClick={sendMessage}>Gửi</ChatButton>
                    </ChatInputContainer>
                </>
            )}
        </ChatContainer>
    );
};

export default CustomerChat;
