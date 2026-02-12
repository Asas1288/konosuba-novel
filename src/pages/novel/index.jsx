import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Импорт спрайтов
import kazuma from "@shared/styles/assets/sprites/kazuma.png";
import darkness from "@shared/styles/assets/sprites/darkness.png";
import aqua from "@shared/styles/assets/sprites/aqua.png";
import megumin from "@shared/styles/assets/sprites/megumin.png";

// Импорт сцен
import { SCENES } from "@entities/scene/model/scenes";

// Импорт кастомных хуков и функций
import { useGameReducer } from "@features/game-logic/model/useGameReducer";
import { getCharacterColorClass } from "@entities/hooks/model/characterColorClass";
import { useInterval } from "@features/game-intervals/useIntervalMode";
import { useSceneSound } from "@features/game-sounds/useSceneSound";
import { useHistoryLog } from "@features/game-logic/model/useHistoryLog";
import { useLoadSave } from "@features/game-logic/model/useLoadSave";

// Импорт компонентов с подключённой логикой
import { NovelControls } from "@features/game-logic/ui/game-controls";
import { CharacterName } from "@features/game-logic/ui/character-name";
import { DialogueBox } from "@features/game-logic/ui/dialogue-box";
import { GameChoices } from "@features/game-logic/ui/game-choices";

// Рефактор: -250 строк +-
const Novel = () => {
  const location = useLocation(); // Для проверки загрузки

// Кастомный хук для управления состоянием игры, уже вынесен из ЭТОГО ФАЙЛА. P.S state -> данные текущей сцены.
  const { state, goToNextScene, handleAuto, handleSkip, loadSaveFunct, saveGame, updateScenes, addHistoryLog } = useGameReducer();

// Проверка текущей сцены
  const currentScene = SCENES[state.curBranch][state.curSceneInx] || {
    character: "Конец",
    text: "История завершена!"
  };

// useEffect для быстрой загрузки при вмонтировании, УЖЕ АДАПТИРОВАННА ПОД НОВЫЙ ФАЙЛ С КАСТОМНЫМИ ХУКАМИ!
  useLoadSave(loadSaveFunct, location.state.loadSave);

  useInterval(
    state.autoPlayMode,
    () => goToNextScene(SCENES),
    1500
  );

// Создаём интервал
  useInterval(
    state.autoSkipMode,
    () => goToNextScene(SCENES),
    150
  );

// Хук загрузки звука в сцене
useSceneSound(currentScene?.sound, state.curSceneInx);

// useEffect для хранения истории
useHistoryLog(addHistoryLog, state.curSceneInx, currentScene);


  return (
    // novel-container --> onClick={goToNextScene}
    <div className="novel-container">

      <div className="interface">
        <GameChoices currentScene={currentScene} updateScenes={updateScenes} />

        <NovelControls
          state={state}
          goToNextScene={() => goToNextScene(SCENES)}
          handleAuto={handleAuto}
          handleSkip={handleSkip}
          saveGame={saveGame} />
        {/* Пока так, позже перенесу в UI самой новеллы, если смогу */}
        <CharacterName currentScene={currentScene} getCharacterColorClass={() => getCharacterColorClass(currentScene)} />
        <DialogueBox text={currentScene.text} />
      </div>
    </div>
  );
};

export default Novel;