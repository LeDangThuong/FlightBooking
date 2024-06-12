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
}
interface Admin {
    id: number;
    name: string;
    messages: Message[];
}

const ClientChatBox: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [admin, setAdmin] = useState<Admin[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef<WebSocket | null>(null);
    const chatBodyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const connectWebSocket = () => {
            socketRef.current = new WebSocket('ws://localhost:7050/ws');

            socketRef.current.onopen = () => {
                console.log('WebSocket connected');
            };

            socketRef.current.onmessage = (event) => {
                const message: Message = JSON.parse(event.data);
                setMessages((prevMessages) => {
                    const existingMessage = prevMessages.find(msg => msg.content === message.content && msg.senderId === message.senderId);
                    if (!existingMessage) {
                        return [...prevMessages, message];
                    }
                    return prevMessages;
                });
                if (message.senderId !== 1) { // Không hiển thị tin nhắn của admin
                    setAdmin(prev => {
                        const existingCustomer = prev.find(c => c.id === message.senderId);
                        if (existingCustomer) {
                            existingCustomer.messages.push(message);
                            return [...prev];
                        }
                        return [...prev, { id: message.senderId, name: `Customer ${message.senderId}`, messages: [message] }];
                    });
                }
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket disconnected, attempting to reconnect...');
                setTimeout(connectWebSocket, 5000); // Tự động kết nối lại sau 5 giây
            };

            socketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connectWebSocket();

        return () => {
            socketRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
            const message: Message = { content: newMessage, senderId: 1, receiverId: 2 }; // 1 là id của client, 2 là id của admin
            socketRef.current?.send(JSON.stringify(message));
            setMessages(prevMessages => [...prevMessages, message]);
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
                            <div key={index} style={{ textAlign: msg.senderId === 1 ? 'right' : 'left' }}>
                                <ChatMessage key={index} isCustomer={msg.senderId === 1}>
                                    <span>{msg.content}</span>
                                    <MessageTimestamp>{new Date(Date.now()).toLocaleString()}</MessageTimestamp>
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
