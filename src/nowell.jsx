import React, { useState, useEffect, useRef, useReducer } from "react";
import { Link } from "react-router-dom";

// Импорт спрайтов
import kazuma from "./styles/assets/sprites/kazuma.png";
import darkness from "./styles/assets/sprites/darkness.png";
import aqua from "./styles/assets/sprites/aqua.png";
import megumin from "./styles/assets/sprites/megumin.png";

// Импорт сцен
import { SCENES } from "./scenes";



const Nowell = () => {
// Для сохранения интервалов между рендером.
// Вынести в 1 ref невозможно, потому что каждый из них хранит своё значение, отчитываемое в секундах до исполнения кода в useEffect 
  const intervalRefTS = useRef(null);
  const intervalRefTA = useRef(null);


  
// Данными удобно управлять, но вызывает перерендер, нужно переделать под useReducer, В ПРОЦЕССЕ ИЗУЧЕНИЯ/ВЫПОЛНЕНИЯ
  const [game, setGame] = useState({
    curBranch: "start",
    curSceneInx: 0,
    autoPlayModeNTRD: false, 
    autoSkipModeNTRD: false // Я забыл что такое NTRD, но я пока не буду переписывать новое имя, для autoPlayMode/autoSkipMode и т.д, займёт время для переписи функций.
  });




// Проверка текущейсцены
  // Создание новой функции перебора сцен
const currentScene = SCENES[game.curBranch][game.curSceneInx] || {
    character: "Конец",
    text: "История завершена!",
};



// Функция перехода на другую сцену
//   const goToNextScene = () => {
//     if (game.curSceneInx < SCENES.length - 1) {
//       setGame((prev) => ({
//   ...prev,
//   curSceneInx: prev.curSceneInx + 1
//   })
// );
//     } else {
//       setGame((prev) => ({
//         ...prev,
//         autoPlayModeNTRD: false,
//         autoSkipModeNTRD: false
//       }))
//     }
//   };





// Новая функция перехода на другую сцену:
const goToNextScene = () => {
  if (game.curSceneInx < SCENES[game.curBranch].length - 1) {
   setGame((prev) => ({
    ...prev,
    curSceneInx: prev.curSceneInx + 1
   }));
  } else {
    setGame((prev) => ({
      ...prev,
      autoPlayModeNTRD: false,
      autoSkipModeNTRD: false
    }))
  }
}




// Тоже может пригодиться
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






  // Авто-плей функция
  useEffect(() => {
    if (game.autoPlayModeNTRD) {
      intervalRefTA.current = setInterval(() => {
        goToNextScene();
      }, 1500);
    } else {
      clearInterval(intervalRefTA.current);
    }

    return () => clearInterval(intervalRefTA.current);
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




const CHARACTERS = [
  { key: 'K', src: kazuma, alt: 'Казума'},
  { key: 'M', src: megumin, alt: 'Мегумин'},
  { key: 'D', src: darkness, alt: 'Даркнесс'},
  { key: 'A', src: aqua, alt: 'Аква'}
];



// Вероятно пригодится, пока не рефакторю, для получения данных о позиции персонажа в текущей сцене.
// const getCharacterInScenePosition = (charData) => {
// if (!charData) return null;


// return {
//   '--pos-x': charData.x,
//   '--pos-y': charData.y
//  }
// };


const updateScenes = (next_branch) => {
 setGame((prev) => ({
  ...prev,
  curBranch: next_branch,
  curSceneInx: 0
 }))
}


// Новый useEffect для звуков при смене сцены, рефактор потом, щас функция
useEffect(() => {
  if (!currentScene.sound) return;

  let soundInstance;

  const loadSound = async (soundName) => {
  try {
  const curSceneSound = await import(`./styles/assets/sounds/${soundName}.mp3`);
  
  soundInstance = new Audio(curSceneSound.default);
  soundInstance.volume = 0.01;
  await soundInstance.play();
 }
// Обычная обработка ошибки
 catch(err) {
  console.log(`Произошла ошибка: ${err}`)
 }
}

loadSound(currentScene.sound);

return () => {
  if (soundInstance) {
 soundInstance.pause();
 soundInstance.currentTime = 0;
  }
}

}, [game.curSceneInx]);




  return (
    // novel-container --> onClick={goToNextScene}
    <div className="novel-container">


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
        <div className="choices">
          {currentScene.choices?.map(choice => (
           <button key={choice.next} onClick={() => updateScenes(choice.next, choice.nextInx)} className={`choices__btn`}>{choice.text}</button>
          ))}
        </div>
        <div className="controls">
          <button className={`control-btn`} onClick={goToNextScene}>Далее</button>
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