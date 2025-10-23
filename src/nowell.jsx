import React, { useState, useEffect, useRef, useReducer } from "react";
import { Link } from "react-router-dom";

// Импорт спрайтов
import kazuma from "./styles/assets/sprites/kazuma.png";
import darkness from "./styles/assets/sprites/darkness.png";
import aqua from "./styles/assets/sprites/aqua.png";
import megumin from "./styles/assets/sprites/megumin.png";



// Персонажи - K-Казума, D-Даркнесс, А-аква, M-Мегумин (Латинскими буквами!)
const SCENES = [
  { character: "Казума", text: "Эй, Аква!", charInScene: { 'K': { x: 150, y: 100 }, 'A': { x: 400, y: 100 } } },
  { character: "Аква", text: "Да, Казума?", sound: "/sounds/yesKazuma.mp3", charInScene: { 'K': { x: 200, y: 100 }, 'A': { x: 400, y: 100 } } },
  {
    character: "Казума",
    text: "Что ты делаешь???",
    charInScene: { 'K': { x: 250, y: 100 }, 'A': { x: 400, y: 100 } },
  },
  {
    character: "Аква",
    text: "Ничего такого...",
    sound: "/sounds/uraAqua2.mp3",
    charInScene: { 'K': { x: 300, y: 100 }, 'A': { x: 400, y: 100 } },
  },
  { character: "Казума", text: "БЕСПОЛЕЗНОГИНЯ!!!", },
  { character: "Аква", text: "ЙЕЕААААААААААХХХХХХХ!!!" },
  { character: "Аква", text: "ТЫ ЧТО ДЕЛАЕШЬ ХИККИ-ЗАДРОТ???" },
  { character: "Даркнесс", text: "Эй, казума..." },
  { character: "Даркнесс", text: "О боже..." },
  {
    character: "Мегумин",
    text: "Даркнесс, Даркнесс, ты не предстовля...",
  },
  { character: "Мегумин", text: "Эмм... что здесь происходит?" },
  { character: "Даркнесс", text: "Этот балбес начал щикотать Акву..." },
  {
    character: "Казума",
    text: "А какого чёрта, эта бесполезность опять пыталась сжечь мою спортивку!?",
  },
  {
    character: "Казума",
    text: "(Кто-то прервал наш повседневный конфликт криком из-вне особняка.)",
  },
  { character: "???", text: "Казума-сан!!!!" },
  {
    character: "Казума",
    text: "(Оххх, как же не узнать этот миленький голос...)",
  },
  { character: "Виз", text: "Казума-сан!!!" },
  { character: "Казума", text: "(Аква рванула на опережение.)" },
  { character: "Казума", text: "А НУ СТОЯТЬ БЕСПОЛЕЗНОСТЬ!" },
  { character: "Аква", text: "Аййййййй!" },
];

const Nowell = () => {

// const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [autoPlayMode, setAutoPlayMode] = useState(false);
  const [autoSkipMode, setAutoSkipMode] = useState(false);
  const intervalRef = useRef(null);
  const intervalRefTS = useRef(null);


// Данными удобно управлять, но вызывает перерендер, нужно переделать под useReducer, В ПРОЦЕССЕ ИЗУЧЕНИЯ/ВЫПОЛНЕНИЯ
  const [game, setGame] = useState({
    curSceneInx: 0,
    autoPlayModeNTRD: false, // Не готово
    autoSkipModeNTRD: false // Не готово
  });




// Функция перехода на другую сцену
  const goToNextScene = () => {
    if (game.curSceneInx <= SCENES.length - 2) {
      setGame((prev) => ({
  ...prev,
  curSceneInx: prev.curSceneInx + 1
  })
);
    } else {
      setAutoPlayMode(false);
      setAutoSkipMode(false);
    }
  };




// Звуки
  useEffect(() => {
    let audio;
    if (currentScene.sound) {
      audio = new Audio(currentScene.sound);
      audio.volume = 0.1;
      audio.play();
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [game.curSceneInx]);




// Проверка сцены
  const currentScene = SCENES[game.curSceneInx] || {
    character: "Конец",
    text: "История завершена!",
  };



  // Авто-плей функция
  useEffect(() => {
    if (autoPlayMode) {
      intervalRef.current = setInterval(() => {
        goToNextScene();
      }, 1500);
    } else {
      
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [autoPlayMode, game.curSceneInx]);




// Функция авто-скипа
  useEffect(() => {
    if (autoSkipMode) {
      intervalRefTS.current = setInterval(() => {
        goToNextScene();
      }, 200);
    } else {
      clearInterval(intervalRefTS.current);
    }

    return () => clearInterval(intervalRefTS.current);
  }, [autoSkipMode, game.curSceneInx]);






// Функция перехода на другую сцену (Устаревшая)
  // const goToNextScene = () => {
  //   if (currentSceneIndex < SCENES.length - 1) {
  //     setCurrentSceneIndex((prev) => prev + 1);
  //   } else {
  //     setAutoPlayMode(false);
  //     setAutoSkipMode(false);
  //   }
  // };





// Авто-скип мод
  const handleSkip = () => {
    if (autoSkipMode) {
      setAutoSkipMode(false);
    } else {
      setAutoPlayMode(false);
      setAutoSkipMode(true);
    }
  };




// Авто-плей мод
  const handleAutoPlay = () => {
    if (autoPlayMode) {
      setAutoPlayMode(false);
    } else {
      setAutoSkipMode(false);
      setAutoPlayMode(true);
    }
  };



//  Динамичная проверка классов персонажа
  const getCharacterColorClass = () => {
    if (!currentScene || !currentScene.character) return "character-unknown";

    switch (currentScene.character) {
      case "Казума":
        return "character-kazuma";
      case "Аква":
        return "character-aqua";
      case "Мегумин":
        return "character-megumin";
      case "Даркнесс":
        return "character-darkness";
      case "Виз":
        return "character-wiz";
      case "Юнь-Юнь":
        return "character-yunyun";
      default:
        return "character-unknown";
    }
  };





// Работа с useReducer, практика и проба:

// const initialState = {
//   currentScene: 0,
//   inventory: ['Меч'],
//   karma: 50
// }

// const [state, dispatch] = useReducer(gameReducer, initialState);
// 







  return (
    // novel-container --> onClick={goToNextScene}
    <div className="novel-container" >
      {/* Кнопки с опассити-появлением + анимация */}
        <img src={kazuma} alt="" className={`character__sprite ${currentScene.charInScene?.K?.y ? 'character--active' : 'character--hidden'}`} style={{
          '--pos-x': currentScene.charInScene?.K?.x + '%',
          '--pos-y': currentScene.charInScene?.K?.y + '%',
          '--posPas-x': currentScene.charInScene?.K?.pasX + '%',
          '--posPas-y': currentScene.charInScene?.K?.pasY + '%',
        }} />
        <img src={darkness} alt="" className={`character__sprite ${currentScene.charInScene?.D?.y ? 'character--active' : 'character--hidden'}`} style={{
          '--pos-x': currentScene.charInScene?.D?.x + '%',
          '--pos-y': currentScene.charInScene?.D?.y + '%',
          '--posPas-x': currentScene.charInScene?.D?.pasX + '%',
          '--posPas-y': currentScene.charInScene?.D?.pasY + '%',
        }} />
        <img src={aqua} alt="" className={`character__sprite ${currentScene.charInScene?.A?.y ? 'character--active' : 'character--hidden'}`} style={{
          '--pos-x': currentScene.charInScene?.A?.x + '%',
          '--pos-y': currentScene.charInScene?.A?.y + '%',
          '--posPas-x': currentScene.charInScene?.A?.pasX + '%',
          '--posPas-y': currentScene.charInScene?.A?.pasY + '%',
        }} />
        <img src={megumin} alt="" className={`character__sprite ${currentScene.charInScene?.M?.y ? 'character--active' : 'character--hidden'}`} style={{
          '--pos-x': currentScene.charInScene?.M?.x + '%',
          '--pos-y': currentScene.charInScene?.M?.y + '%',
          '--posPas-x': currentScene.charInScene?.M?.pasX + '%',
          '--posPas-y': currentScene.charInScene?.M?.pasY + '%',
        }} />
      <div className="interface">
        <div className="controls">
          <button onClick={goToNextScene} className="control-btn">
            Далее
          </button>

          <button
            onClick={handleAutoPlay}
            className={`control-btn ${autoPlayMode ? "active" : ""}`}
          >
            {autoPlayMode ? "Стоп" : "Авто"}
          </button>

          <button
            onClick={handleSkip}
            className={`control-btn ${autoSkipMode ? "active" : ""}`}
          >
            {autoSkipMode ? "Стоп" : "Скип"}
          </button>

          <Link to="/main-menu" className="control-btn menu-btn">
            Меню
          </Link>
        </div>
        <div className={`character-name ${getCharacterColorClass()}`}>
          {currentScene.character}
        </div>
        <div className="dialogue-box">
          <p className="dialogue-text">{currentScene.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Nowell;