import React from "react";
import { Link } from "react-router-dom";

// Импорт и получение данных логики
import { useLinks } from "@features/menu-buttons-actions/model/useLinks";


export const NavLinks = () => {
    const { activeButton, setButton, setUnactive, Links } = useLinks();

    return (
        <div>
            <nav className="menu-buttons">
                {Links.map(link => (
                    <Link
                        key={link.params}
                        onMouseEnter={() => setButton(link.params)}
                        onMouseLeave={setUnactive}
                        className={`menu__btn ${activeButton === link.params ? "is__active" : "not__active"}`}
                        to={link.route}
                        state={{ loadSave: link.state }}>

                        <span className="menu__btn-text">{link.text}</span>

                    </Link>
                ))}
            </nav>
        </div>
    );
};