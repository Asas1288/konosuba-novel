import React from "react";
import { Link } from "react-router-dom";

const News = () => {
    return (
        <div className="background-news">
            <main>
                <section>
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#0a0a0a",
                            color: "white",
                            padding: "30px",
                            borderRadius: "16px",
                            fontSize: "16px",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            zIndex: 10000,
                            border: "2px solid #eb0052",
                            boxShadow: "0 12px 48px rgba(235, 0, 82, 0.4)",
                            backdropFilter: "blur(12px)",
                            maxWidth: "380px",
                            lineHeight: "1.6",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "22px",
                                fontWeight: "800",
                                background: "linear-gradient(135deg, #eb0052, #ff6b9c)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                marginBottom: "12px",
                            }}
                        >
                           🚀 СЛЕДИ ЗА ПРОЦЕССОМ!
                        </div>

                        <p style={{ margin: "12px 0", opacity: 0.9 }}>
                           Привет, пользователь! Это живая версия новеллы.

                           Здесь всё обновляется в реальном времени:<br />
- Новые сцены и диалоги <br />
- Фиксы багов и анимации <br />
- Эксперименты с геймплеем
                        </p>

                        <div
                            style={{
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, transparent, #eb0052, transparent)",
                                margin: "16px 0",
                                width: "80%",
                                marginLeft: "10%",
                            }}
                        />

                        <p style={{ margin: "12px 0", fontWeight: "600", fontSize: "18px" }}>
                            Присоединяйся к нашему сообществу — 
делись идеями и следи за разработкой!

                        </p>

                        <a
                            href="https://vk.com/club233630550?from=groups" // ПОДСТАВЬ ССЫЛКУ
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block",
                                color: "white",
                                fontWeight: "700",
                                textDecoration: "none",
                                padding: "14px 32px",
                                marginTop: "16px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, #eb0052, #c4003a)",
                                border: "1px solid #ff2e6d",
                                transition: "all 0.3s ease",
                                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                                fontSize: "16px",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background =
                                    "linear-gradient(135deg, #ff2e6d, #eb0052)";
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 8px 24px rgba(235, 0, 82, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background =
                                    "linear-gradient(135deg, #eb0052, #c4003a)";
                                e.target.style.transform = "translateY(0px)";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            ПРИСОЕДИНИТЬСЯ
                        </a>

                        <div
                            style={{
                                fontSize: "12px",
                                opacity: 0.6,
                                textAlign: "center",
                                marginTop: "16px",
                                fontStyle: "italic",
                            }}
                        >
                            KonoSuba: Бесполезная Новелла
                        </div>
                    </div>
                    <Link 
                        to='/main-menu'
                        style={{
                            position: "fixed",
                            bottom: "40px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "block",
                            color: "black",
                            border: "1px solid black",
                            textDecoration: "none",
                            padding: "12px 30px",
                            fontWeight: "625",
                            fontSize: "18px",
                            textAlign: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "8px",
                            backdropFilter: "blur(10px)",
                            borderColor: "#eb0052",
                            color: "#eb0052",
                            transition: "all 0.3s ease",
                            zIndex: 10001,
                            minWidth: "200px"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#eb0052";
                            e.target.style.color = "white";
                            e.target.style.transform = "translateX(-50%) translateY(-2px)";
                            e.target.style.boxShadow = "0 4px 12px rgba(235, 0, 82, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                            e.target.style.color = "#eb0052";
                            e.target.style.transform = "translateX(-50%) translateY(0px)";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        Вернуться в Меню
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default News;
