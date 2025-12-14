import React from "react";
import { Link } from "react-router-dom";

// Импортируем готовый интерфейс
import { NavLinks } from "@features/menu-buttons-actions/ui/links.jsx";

// Собираем ГОТОВЫЕ для MainMenu кнопки роутов
export const MenuLinks = () => {
    return (
        <section className="menu">
            <div className="container menu__container">
                <NavLinks />
            </div>
        </section>
    );
};