// Инициадизируем и экспортим состояние
export const initialState = { 
  curBranch: "start",
  curSceneInx: 0,
  autoPlayMode: false, 
  autoSkipMode: false,
  history: []
};
// Импортируем объект для работы с данными
export const ACTION_TYPES = {
  NEXT_SCENE: 'NEXT_SCENE',
  TOGGLE_AUTO_PLAY: 'TOGGLE_AUTO_PLAY',
  TOGGLE_SKIP: 'TOGGLE_SKIP',
  SET_NEW_BRANCH: 'SET_BRANCH',
  ADD_HISTORY_LOG: 'ADD_HISTORY',
  LOAD_GAME: 'LOAD_GAME',
  CLEAR_MODES: 'CLEAR_MODES',
};