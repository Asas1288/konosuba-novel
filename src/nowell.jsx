import React, { useState, useEffect, useRef, useReducer } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

// Импорт спрайтов
import kazuma from "./styles/assets/sprites/kazuma.png";
import darkness from "./styles/assets/sprites/darkness.png";
import aqua from "./styles/assets/sprites/aqua.png";
import megumin from "./styles/assets/sprites/megumin.png";

// Импорт сцен
import { SCENES } from "./scenes";

const ACTION_TYPES = {
  NEXT_SCENE: 'NEXT_SCENE',
  TOGGLE_AUTO_PLAY: 'TOGGLE_AUTO_PLAY',
  TOGGLE_SKIP: 'TOGGLE_SKIP',
  SET_NEW_BRANCH: 'SET_BRANCH',
  ADD_HISTORY_LOG: 'ADD_HISTORY',
  LOAD_GAME: 'LOAD_GAME',
  CLEAR_MODES: 'CLEAR_MODES',
}

// Инициадизируем состояние 
const initialState = { 
  curBranch: "start",
  curSceneInx: 0,
  autoPlayMode: false, 
  autoSkipMode: false,
  history: [] 
};


const Nowell = () => {
// Для сохранения интервалов между рендером.
// Вынести в 1 ref невозможно, потому что каждый из них хранит своё значение, отчитываемое в секундах до исполнения кода в useEffect 
  const intervalRefTS = useRef(null);
  const intervalRefTA = useRef(null);
  const location = useLocation(); // Для проверки загрузки

// АЛЛИЛУЯ БЛЯЬТ, 0:40 я заканчиваю работу... 

// Настраиваем функцию диспатча...
const gameReducer = (state, action) => {
 switch (action.type) {
  case ACTION_TYPES.NEXT_SCENE:
    return {
      ...state,
      curSceneInx: state.curSceneInx + 1
    };
  case ACTION_TYPES.TOGGLE_AUTO_PLAY:
    return {
      ...state,
      autoPlayMode: !state.autoPlayMode,
      autoSkipMode: false // Отключаем авто-скип мод
    }
  case ACTION_TYPES.TOGGLE_SKIP:
    return {
      ...state,
      autoSkipMode: !state.autoSkipMode,
      autoPlayMode: false // Отключаем авто-плэй мод
    };
  case ACTION_TYPES.SET_NEW_BRANCH:
    return {
      ...state,
      curSceneInx: 0,
      curBranch: action.new_branch,
      history: []
    };
  case ACTION_TYPES.ADD_HISTORY_LOG:
    return {
      ...state,
      history: [...state.history, action.log_data]
    };
  case ACTION_TYPES.LOAD_GAME:
    return {
      ...state,
      autoPlayMode: false,
      autoSkipMode: false,
      curSceneInx: action.index,
      curBranch: action.branch,
      history: []
    };
  case ACTION_TYPES.CLEAR_MODES:
    return {
      ...state,
      autoPlayMode: false,
      autoSkipMode: false
    }
  default:
    return state;
 }
};

// Настраиваем useReducer
const [state, dispatch] = useReducer(gameReducer, initialState);



// Проверка текущей сцены
  // Создание новой функции перебора сцен
const currentScene = SCENES[state.curBranch][state.curSceneInx] || {
  character: "Конец",
  text: "История завершена!"
};


// Функция загрузки
const loadSaveFunct = () => {
  try {
   const save = localStorage.getItem('saved-progress');
   if (save) {
    const saveData = JSON.parse(save);
    if (saveData && typeof saveData == 'object') {
      dispatch({
        type: ACTION_TYPES.LOAD_GAME,
        index: saveData.curSceneInx,
        branch: saveData.curBranch
      })
    }
   }
  }
  catch (err) {
    console.log(`Произошла ошибка: ${err}`); // В основном для дебага
  }
}


// UseEffect для быстрой загрузки при вмонтировании
useEffect(() => {
 if (location.state.loadSave) loadSaveFunct();
}, []);


// Новая функция перехода на другую сцену:
const goToNextScene = () => {
  if (state.curSceneInx < SCENES[state.curBranch].length - 1) {
   dispatch({ type: ACTION_TYPES.NEXT_SCENE });
  } else {
   dispatch({ type: ACTION_TYPES.CLEAR_MODES });
  }
};




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
    if (state.autoPlayMode) {
      intervalRefTA.current = setInterval(() => {
        goToNextScene();
      }, 1500);
    } else {
      clearInterval(intervalRefTA.current);
    }

    return () => clearInterval(intervalRefTA.current);
  }, [state.autoPlayMode, state.curSceneInx]);









// Функция авто-скипа
  useEffect(() => {
    if (state.autoSkipMode) {
      intervalRefTS.current = setInterval(() => {
        goToNextScene();
      }, 200);
    } else {
      clearInterval(intervalRefTS.current);
    }

    // Функция очистки
    return () => clearInterval(intervalRefTS.current);
  }, [state.autoSkipMode, state.curSceneInx]); // Замена на новые зависимости, небольшой рефакторинг






// Авто-скип мод
  const handleSkip = () => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SKIP
    })
  };




// Авто-плей мод
  const handleAutoPlay = () => {
   dispatch({
    type: ACTION_TYPES.TOGGLE_AUTO_PLAY
   })
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
 dispatch({
  ...state,
  type: ACTION_TYPES.SET_NEW_BRANCH,
  new_branch: next_branch,
 });
};


// Новый useEffect для звуков при смене сцены, рефактор потом, щас функция
useEffect(() => {
  if (!currentScene.sound) return;

  let soundInstance;
// Создаём функцию и передаём в неё soundName конкретной сцены.
  const loadSound = async (soundName) => {
// Пробуем выполнить действие
  try {
  const curSceneSound = await import(`./styles/assets/sounds/${soundName}.mp3`);

// Создаём звук которому нужно проиграться в сцене
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

}, [state.curSceneInx]);




// Функция сохранения прогресса, будем использовать в кнопочке
const saveGame = () => {
 localStorage.setItem('saved-progress', JSON.stringify(state));
 alert('Игра сохранена!');
};


// Функция добавления сцены в историю
const addHistoryLog = () => {
 dispatch({
  type: ACTION_TYPES.ADD_HISTORY_LOG, 
  log_data: currentScene
 });
 console.log(state); // Чекаю данные, для работы
};


// useEffect для хранения истории:
useEffect(() => {
 addHistoryLog();
}, [state.curSceneInx]);


// Нужна функция для смены музыки на фоне, достаточно важная деталь, но сложная по реализации, пока не сегодня.
// Можно реализовать просто смену музыки, но без её задержки и плавного входа, но пока учим дизайн XD.



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
           <button key={choice.next} onClick={() => updateScenes(choice.next)} className={`choices__btn`}>{choice.text}</button>
          ))}
        </div>
        <div className="controls">
          <button className={`control-btn`} onClick={goToNextScene}>Далее</button>
          <button
            onClick={handleAutoPlay}
            className={`control-btn ${state.autoPlayMode ? "active" : ""}`}
          >
            {state.autoPlayMode ? "Стоп" : "Авто"}
          </button>

          <button
            onClick={handleSkip}
            className={`control-btn ${state.autoSkipMode ? "active" : ""}`}
          >
            {state.autoSkipMode ? "Стоп" : "Скип"}
          </button>
          <button
          onClick={saveGame}
          className={`control-btn`}> Сохр. </button>

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