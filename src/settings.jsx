import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
// Хы-хы блять, зарефакторил)))
    const [volume, setVolume] = useState(() => {
        const saved = localStorage.getItem('volume-opt');
        if (!saved) return 1;
        try {
            return JSON.parse(saved).volumeVal ?? 1;
        } 
        catch {
            return 1;
        }
    });



    // Сохранение при изменение
    useEffect(() => {
        localStorage.setItem('volume-opt', JSON.stringify({
            volumeVal: volume
        }));

        console.log(`Настройка музыки сохранена: ${volume}%`);
    }, [volume]); // <--- Сохраняем каждый раз при изменение volume





    // Обработчик события 
    const handleVolumeChange = (e) => {
     const newVolumeValue = Number(e.target.value);
     setVolume(newVolumeValue);
    };

    return (
        <div className="settings__panel">
            <label htmlFor="volume" className="settings__volume-label">Фоновая музыка: {volume}/100</label>
            <input name="volume"
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                className="settings__volume-input"
            />
            <Link to='/main-menu' className="settings__back-btn">Вернуться в меню</Link>
        </div>
    )
}

export default Settings;