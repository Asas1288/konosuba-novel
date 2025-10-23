import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import githubLogo from "./styles/assets/sprites/github1.png";

import music1 from "./styles/assets/sounds/music1.mp3";
import music2 from "./styles/assets/sounds/music2.mp3";
import music3 from "./styles/assets/sounds/music3.mp3";

const MainMenu = () => {

  // Нужна починка произведения аудио дорожки
  const [currentIndex, setCurrentIndex] = useState(0); // ДОБАВЬ ЭТУ СТРОЧКУ!
  const [activeButton, setActiveButton] = useState(null);
  const [audio, setAudio] = useState(null);
  // const audioRef = useRef(null);
  



  const musics = [music1, music2, music3];



// Я сам написал ХАХАХАХАХАХХАХА, Я СМОГ БЛЯТь!!!!!!!!!!!!!
  useEffect(() => {
    const newAudio = new Audio(musics[currentIndex]);
    // Пробуем загрузить (ЮРА ПОШЁЛ НАХУЙ ЭТО НЕ НЕЙРОСЕТЬ, Я САМ СТАРАЛСЯ ЭТО ПИСАТЬ, ПО КИРПИЧИКУ СОБИРАЛ)
    try {
      const savedVolume = localStorage.getItem('volume-opt');
      const volume = JSON.parse(savedVolume).volumeVal;
      
      if (volume >= 0) {
        newAudio.volume = volume / 10;
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




    // Любимая функция размонтирования (Я её мать хотел)
    return () => {
      if (newAudio) {
        clearTimeout(playTimer);
        newAudio.pause();
        newAudio.src = "";
      }
    };

  }, [currentIndex]); // Запускаем эффект когда меняется currentIndex


  const handleMouseEnter = (buttonId) => setActiveButton(buttonId);
  const handleMouseLeave = () => setActiveButton(null);




  return (
    <div className="component">
      <main className="main">
        <section className="menu">
          <div className="container menu__container">
            <nav className="menu-buttons">
              <Link onMouseEnter={() => handleMouseEnter('new-game')} onMouseLeave={handleMouseLeave} className={`menu__btn ${activeButton === 'new-game' ? 'is__active' : 'not__active'}`} to="/nowell">
                Новая игра
              </Link>
              <Link onMouseEnter={() => handleMouseEnter('authors')} onMouseLeave={handleMouseLeave} className={`menu__btn ${activeButton === 'authors' ? 'is__active' : 'not__active'}`} to="/credits">
                Авторы
              </Link>
              <Link onMouseEnter={() => handleMouseEnter('servers')} onMouseLeave={handleMouseLeave} className={`menu__btn ${activeButton === 'servers' ? 'is__active' : 'not__active'}`} to="/party">
                Сервера (Бета)
              </Link>
              <Link onMouseEnter={() => handleMouseEnter('options')} onMouseLeave={handleMouseLeave} className={`menu__btn ${activeButton === 'options' ? 'is__active' : 'not__active'}`} to="/settings">
                Настройки
              </Link>
            </nav>
          </div>
        </section>

        <div className="disclaimers">
          <p className="disclaimer">
            Новелла находится в бета-разработке, и сюда скидываются референсы
            для работы с функционалом, неготовые картинки и
            нестилиризованный интерфейс, просим прощения за неудобства,
            вскорем мы постараемся это исправить.
          </p>
        </div>
      </main>
      <footer className="contacts">
        <div className="container nav__social-box">
          <a href="https://github.com/Asas1288" className="img__link-item">
            <img src={githubLogo} alt="" className="social__logo" />
          </a>
          <a href="https://github.com/Asas1288" className="img__link-item">
            <img src={githubLogo} alt="" className="social__logo github" />
          </a>
          <a href="https://github.com/Asas1288" className="img__link-item">
            <img src={githubLogo} alt="" className="social__logo" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainMenu;
