import React from "react";
import githubLogo from "../../../../shared/styles/assets/sprites/github1.png";

const logotips = [
    {}
];

export const MenuFooter = () => {
    return (
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
    )
};