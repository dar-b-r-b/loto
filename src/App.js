import "./App.css";
import React, { useState, useEffect } from "react";
import Game from "./Game";
import { connect, subscribe, addUser } from "./connection";
import {
  ChakraProvider,
  HStack,
  Input,
  Button,
  Card,
  CardBody,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";

function App() {
  const [userName, setUserName] = useState("");
  const [connection, setConnection] = useState(null);
  const [players, setPlayers] = useState([]);
  const [barrels, setBarrels] = useState(0);
  const [winner, setWinner] = useState("");

  useEffect(() => connect(setConnection), []);
  useEffect(() => subscribe(connection, handleGameState), [connection]);
  useEffect(() => addUser(userName, connection), [userName, connection]);

  // Обработчик для GameState
  function handleGameState(players, barrels, winner) {
    setPlayers(players);
    setBarrels(barrels);
    setWinner(winner);
  }
  // анимация
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);

    setTimeout(() => setIsAnimating(false), 2000);
  };
  return (
    <ChakraProvider>
      <VStack>
        <HStack>
          <Card mt="4">
            <CardBody>
              <Text justify="center">ПРИЗОВОЙ ФОНД</Text>
            </CardBody>
          </Card>
          <Image src="./mem.png" boxSize="150px" objectFit="contain"></Image>
        </HStack>

        <HStack justify="center">
          <Input
            width="40%"
            placeholder="Представься, тварь"
            size="xs"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            colorScheme="yellow"
            size="xs"
            onClick={() => {
              connection.invoke("Next");
              handleButtonClick();
            }}
          >
            Следующая бочка
          </Button>
          <Button
            colorScheme="red"
            size="xs"
            onClick={() => connection.invoke("StartNewGame")}
          >
            Начать новую игру
          </Button>
        </HStack>
        <Game
          players={players}
          barrels={barrels}
          winner={winner}
          isAnimating={isAnimating}
        />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
