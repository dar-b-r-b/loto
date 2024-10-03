import "./App.css";
import React, { useState, useEffect } from "react";
import { Alert, Image, AlertTitle } from "@chakra-ui/react";

export default function WinnerNotification({ winner }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const text = `Победил ${winner}`;

  const speakText = (text, duration) => {
    if ("speechSynthesis" in window && text.trim()) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "ru-RU";
      setIsSpeaking(true);
      speechSynthesis.speak(speech);

      setTimeout(() => {
        speechSynthesis.cancel();
        setIsSpeaking(true);
      }, 2000);
    }
  };
  useEffect(() => {
    if (winner && !isSpeaking) {
      speakText(text);
    }
  }, [winner, isSpeaking, text]);

  return (
    <Alert
      status="success"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="300px"
      backgroundColor="white"
      width="30%"
      mt="9"
    >
      <Image boxSize="9em" mr="0" src="./YAS2.gif" />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {text}
      </AlertTitle>
    </Alert>
  );
}
