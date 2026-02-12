import React from "react";
import { Link } from "react-router-dom";

const ExplosionComponent = () => {
  return (
    <div>
      <h2 className="Exp">
        Далёкая волшебница из Акселя взорвала эту Страницу:
        <span style={{ color: "red" }}>
          <br />
          404 ExplosioN 404
        </span>
        <br />
      </h2>
      <p>Попробуйте вернуться в Столицу через телепорт:</p>
      <Link className="back" to="/main-menu">
        Кастовать телепорт в Столицу. . .
      </Link>
    </div>
  );
};

export default ExplosionComponent;
