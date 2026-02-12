import { useEffect } from "react";

export const useHistoryLog = (addLog, sceneInx, currentScene) => {
    useEffect(() => {
        addLog(currentScene);
    }, [sceneInx]);
};