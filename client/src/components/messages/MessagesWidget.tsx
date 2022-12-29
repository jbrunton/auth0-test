import React, { useState, KeyboardEventHandler } from "react";
import { useMessages, usePostMessage } from "../../data/messages";
import { useAccessToken } from "../auth/useAccessToken";

export type MessagesWidgetProps = {
    roomId: string;
}

export const MessagesWidget: React.FC<MessagesWidgetProps> = ({ roomId }) => {
    const { data: messages } = useMessages(roomId);
    const [content, setContent] = useState<string>("");
    const accessToken = useAccessToken();
    const { mutate } = usePostMessage(roomId, content, accessToken)
    const onKeyDown: KeyboardEventHandler = (e) => {
        if (e.key === 'Enter') {
            mutate();
            setContent("");
        }
    };
    return (
        <div>
            {messages && (
                messages.map(msg => (
                    <div key={msg.id}>
                        <p>{msg.content}</p>
                        <span>{msg.time}</span>
                    </div>
                ))
            )}
            <input value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={onKeyDown} />
        </div>
    )
};
