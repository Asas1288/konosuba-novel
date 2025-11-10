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
// Для сохранения интервалов между рендером.
  const intervalRefTS = useRef(null);



  
// Данными удобно управлять, но вызывает перерендер, нужно переделать под useReducer, В ПРОЦЕССЕ ИЗУЧЕНИЯ/ВЫПОЛНЕНИЯ
  const [game, setGame] = useState({
    curSceneInx: 0,
    autoPlayModeNTRD: false, 
    autoSkipModeNTRD: false
  });




// Функция перехода на другую сцену
  const goToNextScene = () => {
    if (game.curSceneInx < SCENES.length - 1) {
      setGame((prev) => ({
  ...prev,
  curSceneInx: prev.curSceneInx + 1
  })
);
    } else {
      setGame((prev) => ({
        ...prev,
        autoPlayModeNTRD: false,
        autoSkipModeNTRD: false
      }))
    }
  };




// Звуки
  // useEffect(() => {
  //   let audio;
  //   if (currentScene.sound) {
  //     audio = new Audio(currentScene.sound);
  //     audio.volume = 0.1;
  //     audio.play();
  //   }
  //   return () => {
  //     if (audio) audio.pause();
  //   };
  // }, [game.curSceneInx]);




// Проверка сцены
  const currentScene = SCENES[game.curSceneInx] || {
    character: "Конец",
    text: "История завершена!",
  };






  // Авто-плей функция
  useEffect(() => {
    if (game.autoPlayModeNTRD) {
      intervalRefTS.current = setInterval(() => {
        goToNextScene();
      }, 1500);
    } else {
      clearInterval(intervalRefTS.current);
    }

    return () => clearInterval(intervalRefTS.current);
  }, [game.autoPlayModeNTRD, game.curSceneInx]);









// Функция авто-скипа
  useEffect(() => {
    if (game.autoSkipModeNTRD) {
      intervalRefTS.current = setInterval(() => {
        goToNextScene();
      }, 200);
    } else {
      clearInterval(intervalRefTS.current);
    }

    // Функция очистки
    return () => clearInterval(intervalRefTS.current);
  }, [game.autoSkipModeNTRD, game.curSceneInx]); // Замена на новые зависимости, небольшой рефакторинг






// Авто-скип мод
  const handleSkip = () => {
    if (game.autoSkipModeNTRD) {
      setGame((prev) => ({
        ...prev,
        autoSkipModeNTRD: false
      }))
    } else {
      setGame((prev) => ({
        ...prev,
        autoSkipModeNTRD: true,
        autoPlayModeNTRD: false
      }))
    }
  };




// Авто-плей мод
  const handleAutoPlay = () => {
     if (game.autoPlayModeNTRD) {
      setGame((prev) => ({
        ...prev,
        autoPlayModeNTRD: false
      }))
    } else {
      setGame((prev) => ({
        ...prev,
        autoPlayModeNTRD: true,
        autoSkipModeNTRD: false
      }))
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




// Пока можно забыть про useReducer, он пока не нужен.
// Работа с useReducer, практика и проба:

// const initialState = {
//   currentScene: 0,
//   inventory: ['Меч'],
//   karma: 50
// }

// const [state, dispatch] = useReducer(gameReducer, initialState);
// 






const CHARACTERS = [
  { key: 'K', src: kazuma, alt: 'Казума'},
  { key: 'M', src: megumin, alt: 'Мегумин'},
  { key: 'D', src: darkness, alt: 'Даркнесс'},
  { key: 'A', src: aqua, alt: 'Аква'}
];



// const getCharacterInScenePosition = (charData) => {
// if (!charData) return null;


// return {
//   '--pos-x': charData.x,
//   '--pos-y': charData.y
//  }
// };




  return (
    // novel-container --> onClick={goToNextScene}
    <div className="novel-container" onClick={goToNextScene}>


    {/* {CHARACTERS.map(char => {
      <img 
      key={char.key}
      src={char.src}
      alt={char.alt}
      className={`character__sprite ${currentScene.charInScene?.[char.key] ? 'character--active' : 'character--hidden'}`}
      style={getCharacterInScenePosition(currentScene.charInScene?.[char.key])}
      />
    })} */}


      <div className="interface">
        <div className="controls">
          <button
            onClick={handleAutoPlay}
            className={`control-btn ${game.autoPlayModeNTRD ? "active" : ""}`}
          >
            {game.autoPlayModeNTRD ? "Стоп" : "Авто"}
          </button>

          <button
            onClick={handleSkip}
            className={`control-btn ${game.autoSkipModeNTRD ? "active" : ""}`}
          >
            {game.autoSkipModeNTRD ? "Стоп" : "Скип"}
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