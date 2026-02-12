// Файл Роутов

// Импорт компонентов
import Confirm from '../../pages/disclaimer';
import MainMenu from "../../pages/menu"
import Novel from '../../pages/novel';
import Authors from '../../pages/authors';
import Settings from '../../pages/settings';
import News from '../../pages/news';
import ExplosionComponent from '../../pages/error';

// Создаём и экспортируем управляемый массив роутов:
export const routes = [
    { path: '/', element: <Confirm /> },
    { path: '/news', element: <News /> },
    { path: '/main-menu', element: <MainMenu /> },
    { path: '/novel', element: <Novel /> },
    { path: '/credits', element: <Authors /> },
    { path: '/settings', element: <Settings /> },
    { path: '*', element: <ExplosionComponent /> },
];