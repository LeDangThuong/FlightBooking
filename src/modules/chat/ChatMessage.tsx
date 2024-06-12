import React from 'react';

interface ChatMessageProps {
    message: string;
    isSender: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSender }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: isSender ? 'flex-end' : 'flex-start',
            margin: '5px 0'
        }}>
            <div style={{
                backgroundColor: isSender ? '#007bff' : '#f1f1f1',
                color: isSender ? 'white' : 'black',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '80%'
            }}>
                {message}
            </div>
        </div>
    );
};

export default ChatMessage;
