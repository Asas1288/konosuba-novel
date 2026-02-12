import React from "react";

export const DialogueBox = ({ text }) => {
    return (
        <div className="dialogue-box">
          <p className="dialogue-text">{text}</p>
        </div>
    );
};