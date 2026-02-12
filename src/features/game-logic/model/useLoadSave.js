import { useEffect } from "react";

export const useLoadSave = (loadSave, locationState) => {
    useEffect(() => {
        if (locationState) loadSave();
    }, [loadSave]);
};