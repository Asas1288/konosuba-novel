import React from "react";
import { Link } from "react-router-dom";

export const NovelControls = ({ state, goToNextScene, handleAuto, handleSkip, saveGame }) => {

    return (
        <div className="controls">
            <button className={`control-btn`} onClick={goToNextScene}>Далее</button>
            <button
                onClick={handleAuto}
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
    );
};