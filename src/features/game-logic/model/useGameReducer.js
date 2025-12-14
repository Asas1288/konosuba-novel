import { useReducer } from "react";

// Импортим состояние и функцию редьюсера
import { initialState, ACTION_TYPES } from "./data";
import { gameReducer } from "./gameReducer";

export const useGameReducer = () => {
 const [state, dispatch] = useReducer(gameReducer, initialState);




// Функция добавления сцены в историю
const addHistoryLog = (currentScene) => {
 dispatch({
  type: ACTION_TYPES.ADD_HISTORY_LOG, 
  log_data: currentScene
 });
};

// Новая функция перехода на другую сцену:
const goToNextScene = (scenes) => {
  if (state.curSceneInx < scenes[state.curBranch].length - 1) {
   dispatch({ type: ACTION_TYPES.NEXT_SCENE });
  } else {
   dispatch({ type: ACTION_TYPES.CLEAR_MODES });
  }
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
};

// Функция обновления веток
const updateScenes = (nextBranch) => {
 dispatch({
  type: ACTION_TYPES.SET_NEW_BRANCH,
  new_branch: nextBranch
 })
};

// Функция сохранения игры
const saveGame = () => {
 localStorage.setItem('saved-progress', JSON.stringify(state));
 alert('Игра сохранена!');
};

// Функция активации авто-плея
const handleAuto = () => {
 dispatch({
  type: ACTION_TYPES.TOGGLE_AUTO_PLAY
 });
};

// Функция активации скипа
const handleSkip = () => {
 dispatch({
  type: ACTION_TYPES.TOGGLE_SKIP
 });
};

// Возвращаем функции для работы + данные
 return {
  state,
  goToNextScene,
  handleAuto,
  handleSkip,
  loadSaveFunct,
  saveGame,
  updateScenes,
  addHistoryLog,
 };
};