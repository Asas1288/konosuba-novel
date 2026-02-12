// Импортируем объект работы с данными
import { ACTION_TYPES } from "./data";

// Создаём и экспортируем функцию редьюсера
export const gameReducer = (state, action) => {
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