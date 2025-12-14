import React, { useState, useEffect } from "react";

import music1 from "@shared/styles/assets/sounds/music1.mp3";
import music2 from "@shared/styles/assets/sounds/music2.mp3";
import music3 from "@shared/styles/assets/sounds/music3.mp3";

// Импорт компонентов
import { MenuLinks } from "./ui/menu-links";
import { Disclaimer } from "./ui/menu-disclaimer";
import { MenuFooter } from "./ui/menu-footer";

// Нужен рефактор компонента.
const MainMenu = () => {
  // Логика переносится в features (В процессе)
  const [currentIndex, setCurrentIndex] = useState(0);


  const musics = [music1, music2, music3];


  // Музыка на фоне
  useEffect(() => {
    const newAudio = new Audio(musics[currentIndex]);
    // Пробуем загрузить
    try {
      const savedVolume = localStorage.getItem('volume-opt');
      if (savedVolume) {
      const volume = JSON.parse(savedVolume).volumeVal;

      if (volume >= 0) {
        newAudio.volume = volume / 1000; // 0.01 т.к уши рвёт, ну его нафиг, потом сделаю более динамично...
      }
    } else {
      newAudio.volume = 0.05;
    }
    } // Обработка ошибки
    catch (error) {
      console.error('Ошибка воспроизведения:', error);
      localStorage.removeItem('volume-opt');
      alert('Настройки музыки слетели, попробуйте задать их снова!');
    }



    //  Проигрываем музыку через 3 секунды после обновления музыки
    const playTimer = setTimeout(() => {
      newAudio.play().catch(e => {
        console.log("Браузер заблокировал авто-воспроизведение");
      });
    }, 3000);

    newAudio.onended = () => {
      setCurrentIndex((prev) => (prev + 1) % musics.length);
    };




    // Любимая функция размонтирования
    return () => {
      if (newAudio) {
        clearTimeout(playTimer);
        newAudio.pause();
        newAudio.src = "";
      }
    };

  }, [currentIndex]); // Запускаем эффект когда меняется currentIndex



// Нужен useEffect для размонтирования (Звук остаётся при переходе на другой роут), но пока useEffect очень плохо работает, либо моя голова... 

  return (
    <div className="component">
      <main className="main">
        <MenuLinks />
{/* Разделяем, сверху меню, снизу дисклеймер */}
        <Disclaimer />
      </main>
      <MenuFooter />
    </div>
  );
};

export default MainMenu;