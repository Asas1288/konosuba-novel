import React from "react";

export const GameChoices = ({ currentScene, updateScenes }) => {
    return (
        <div className="choices">
            {currentScene.choices?.map(choice => (
                <button key={choice.next} onClick={() => updateScenes(choice.next)} className={`choices__btn`}>{choice.text}</button>
            ))}
        </div>
    );
};