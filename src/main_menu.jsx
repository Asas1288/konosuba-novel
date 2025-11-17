import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import githubLogo from "./styles/assets/sprites/github1.png";

import music1 from "./styles/assets/sounds/music1.mp3";
import music2 from "./styles/assets/sounds/music2.mp3";
import music3 from "./styles/assets/sounds/music3.mp3";
import btn from "./styles/assets/sounds/button.mp3";




// Нужен рефактор компонента.
const MainMenu = () => {
  // Заменить на один setMenu --> useState
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  // const audioRef = useRef(null);


  const musics = [music1, music2, music3];



  // Музыка на фоне
  useEffect(() => {
    const newAudio = new Audio(musics[currentIndex]);
    // Пробуем загрузить
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
// Не размонтируется ну и хуй с ней.
const handleMouseEnter = (buttonId) => {
 setActiveButton(buttonId);

// Включаем звук 
const audio = new Audio(btn)
audio.volume = 0.1
audio.play().catch(err => console.log(err));
// Блять наконец-то, я ебал этот код нахуй, похуй что без размонтирования, вообще поебать у него 0.3 секунды воспроизведения, так что похуй.
// Я инженер, я так сделал и оно работает, каким хуем оно работает, тебя ебать не должно, я сам не ебу, но оно работает, сломанно но работает, если надо - смотри ебучие чертежи
};


  // Функция для возврата класса not__active кнопкам
  const handleMouseLeave = () => setActiveButton(null);



  // Массив для цикличного возврата элементов
  const Links = [
    { text: 'Новая игра', params: 'new-game', route: "/nowell" },
    { text: 'Авторы', params: 'authors', route: "/credits" },
    { text: 'Настройки', params: 'options', route: "/settings" },
    { text: 'Новости VK', params: 'news', route: "/news" }
  ];



  // Готова цикличная версия, частичний рефактор, + на заметку что каждому элементу нужен key, без него цикл не будет работать.
  return (
    <div className="component">
      <main className="main">
        <section className="menu">
          <div className="container menu__container">
            <nav className="menu-buttons">
              {Links.map(button => (
                <Link key={button.params} onMouseEnter={() => handleMouseEnter(button.params)} onMouseLeave={handleMouseLeave} className={`menu__btn ${activeButton === button.params ? "is__active" : "not__active"}`} to={button.route}>{button.text}</Link>
              ))}
            </nav>
          </div>
        </section>

        <div className="disclaimers">
          <p className="disclaimer">
            Новелла находится в альфа-разработке, и сюда скидываются референсы
            для работы с логикой, неготовые картинки и
            нестилиризованный интерфейс, просим прощения за неудобства,
            вскорем мы постараемся это исправить.
          </p>
        </div>
      </main>
      <footer className="contacts">
        <div className="container nav__social-box">
          <a href="https://github.com/Asas1288" className="img__link-item">
            <img src={githubLogo} alt="" className="social__logo vk" />
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