import React from "react";

// Чисто компонент disclaimer для меню
export const Disclaimer = () => {
    return (
        <div className="disclaimers">
          <p className="disclaimer">
            Новелла находится в альфа-разработке, и сюда скидываются референсы
            для работы с логикой, неготовые картинки и
            нестилиризованный интерфейс, просим прощения за неудобства,
            вскорем мы постараемся это исправить.
          </p>
        </div>
    );
};