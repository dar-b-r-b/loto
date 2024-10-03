import * as signalR from "@microsoft/signalr";

const SERVER_URL = "http://192.168.0.10:5189/game";

// Функция для создания соединения
const createConnection = () => {
  return new signalR.HubConnectionBuilder()
    .withUrl(SERVER_URL)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
};

export function connect(setConnection) {
  const conn = createConnection();
  setConnection(conn);

  conn.start();

  return () => conn.stop(); // Отключаем соединение при размонтировании компонента
}

export function subscribe(connection, handler) {
  if (!connection) return;

  connection.off("GameState"); // Удаляем старый обработчик
  connection.on("GameState", handler); // Регистрируем новый обработчик
}

export function addUser(userName, connection) {
  if (userName && connection) {
    connection.invoke("AddUser", userName);
  }
}
