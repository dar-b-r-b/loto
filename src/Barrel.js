import "./App.css";
import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { pulse } from "react-animations";

const pulseAnimation = keyframes`${pulse}`;
//const hingeAnimation = keyframes`${hinge}`;

export default function Barrel({ players, barrels, isAnimating }) {
  return (
    <Flex
      border="4px"
      borderRadius="full"
      textAlign="center"
      display={players.length === 0 ? "none" : "inline-block"}
      padding="1"
      mt="3"
      width="7%"
      animation={isAnimating ? `${pulseAnimation} 1s` : "none"}
    >
      <Text
        border="4px"
        borderRadius="full"
        borderColor="red"
        padding="4"
        fontSize="1.5em"
        fontWeight="bold"
      >
        {barrels.length === 0 ? "0" : barrels[barrels.length - 1]}
      </Text>
    </Flex>
  );
}
