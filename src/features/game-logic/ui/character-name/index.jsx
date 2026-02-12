import React from "react";

export const CharacterName = ({ currentScene, getCharacterColorClass }) => {
 return (
    <div className={`character-name ${getCharacterColorClass(currentScene.character)}`}>
          {currentScene.character}
    </div>
 )
};