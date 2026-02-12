import { useState } from "react";
import btn from "@shared/styles/assets/sounds/button.mp3"

// Создаём кастомный хук, для управления кнопками
export const useLinks = () => {

    const [activeButton, setActiveButton] = useState(null);

    const setButton = (currentButton) => {
        setActiveButton(currentButton);

        // Включаем звук 
        const audio = new Audio(btn);
        audio.volume = 0.1;
        audio.play().catch(err => console.log(err));
    };

    const setUnactive = () => {
        setActiveButton(null);
    };

// Массив для цикличного возврата элементов
// Нужно переделать под объект с массивами объектов чтобы можно было динамично вставлять разные цикличные данные в Front-end, будет в -> shared - Links/Logotips/etc..
const Links = [
    { text: 'Новая игра', params: 'new-game', route: "/novel" },
    { text: 'Быстрая загрузка', params: 'load-game', route: "/novel", state: true },
    { text: 'Авторы', params: 'authors', route: "/credits" },
    { text: 'Настройки', params: 'options', route: "/settings" },
    { text: 'Новости VK', params: 'news', route: "/news" }
];

    // Ретарним/возвращаем данные
    return {
        activeButton,
        setButton,
        setUnactive,
        Links
    }
};