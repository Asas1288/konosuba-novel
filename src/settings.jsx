import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
    const [volume, setVolume] = useState(1);

    // Загрузка сохранения при ПЕРВОЙ загрузке
    useEffect(() => {
       try {
           const savedVolume = localStorage.getItem('volume-opt')
           if (savedVolume) {
               const volumeValue = JSON.parse(savedVolume).volumeVal;
               if (volumeValue && typeof volumeValue === 'number') {
                setVolume(volumeValue * 10);
               }
           }   
       } 
       catch (err) {
        console.error('Ошибка загрузки настроек:', err);
        localStorage.removeItem('volume-opt');
       }
    }, []); // Только при загрузке





    // Сохранение при изменение
    useEffect(() => {
        localStorage.setItem('volume-opt', JSON.stringify({
            volumeVal: volume / 10
        }));

        console.log('Настройка сохранена! Громкость:', volume / 10);
    }, [volume]); // <--- Сохраняем каждый раз при изменение volume





    // Обработчик события 
    const handleVolumeChange = (e) => {
     const newVolumeValue = Number(e.target.value);
     setVolume(newVolumeValue);
    };

    return (
        <div className="settings__panel">
            <label htmlFor="volume">Музыка: {volume}/10</label>
            <input name="volume"
                type="range"
                min={0}
                max={10}
                value={volume}
                onChange={handleVolumeChange}
            />
            <Link to='/main-menu'>Вернуться в меню</Link>
        </div>
    )
}

export default Settings;