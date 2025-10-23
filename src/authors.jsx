import React from "react";
import { Link } from "react-router-dom";

const Authors = () => (
  <div className="credits">
    <h1>Авторы</h1>
    <ul>
      <li>Главный разработчик: Asas</li>
      <li>Дизайн: Asas</li>
      <li>Диалоги: Asas</li>
      <li>Идея: Нацумэ Акацуки - 暁なつめ (создатель Konosuba)</li>
      <li>Технический консультант: DeepSeek-R1 (Дипсик)</li>
    </ul>
    <Link className="back" to="/main-menu">
      Назад
    </Link>
  </div>
);

export default Authors;