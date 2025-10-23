import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Тестовый запуск и fetch с сервера
const ApiComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL твоего API (замени на актуальный из CodeSandbox)
  const API_URL =
    "https://9hj72r-3000.csb.app/debt?kDebt=10000&aDebt=2000000000&mDebt=1000&dDebt=100000000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Отправляем запрос к API...");
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const result = await response.json();
        console.log("Получены данные:", result);
        setData(result);
      } catch (err) {
        console.error("Ошибка при запросе:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="loading">Загрузка... :hourglass_flowing_sand:</div>;
  if (error) return <div className="error">Ошибка: {error} :boom:</div>;
  return (
    <div>
      <h1>Список долгов Гильдие: </h1>
      <ul>
        {data &&
          data.debtList.map((characterDebt, index) => (
            <li key={index}>
              {characterDebt.character}: Долг {characterDebt.debt} Эрис.
            </li>
          ))}
      </ul>
      <Link className="link" to="/">
        Назад
      </Link>
    </div>
  );
};

export default ApiComponent;
