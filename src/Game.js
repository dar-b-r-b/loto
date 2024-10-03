import { HStack, VStack, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import WinnerNotification from "./WinnerNotification";
import "./App.css";
import React from "react";
import Barrel from "./Barrel";

export default function Game({ players, barrels, winner, isAnimating }) {
  function GameContent({ players, barrels, isAnimating }) {
    return (
      <>
        <Barrel players={players} barrels={barrels} isAnimating={isAnimating} />
        <HStack width={players.length !== 1 ? "100%" : "50%"}>
          {players.map((p) => {
            return (
              <VStack width="100%">
                <Text fontSize="1.5em">{p.name}</Text>
                {p.tickets.map((t) => (
                  <Grid
                    templateColumns="repeat(9, 1fr)"
                    templateRows="repeat(3, 1fr)"
                    gap="0"
                    mt="6"
                    width="90%"
                  >
                    {t.map((r) =>
                      r.map((n) => (
                        <GridItem
                          w="100%"
                          h="10"
                          border="1px"
                          textAlign="center"
                          position="relative"
                          justify="center"
                          pt="1"
                        >
                          <Box
                            position="absolute"
                            display={n?.isPainted ? "inline-block" : "none"}
                            borderRadius="full"
                            border="2px"
                            color="red"
                            backgroundColor="yellow"
                            opacity=".5"
                            width="60%"
                            height="100%"
                            ml="-2"
                            mt="-1"
                          ></Box>
                          {n ? n.number : ""}
                        </GridItem>
                      ))
                    )}
                  </Grid>
                ))}
              </VStack>
            );
          })}
        </HStack>
      </>
    );
  }

  return winner ? (
    <WinnerNotification winner={winner} />
  ) : (
    <GameContent
      players={players}
      barrels={barrels}
      isAnimating={isAnimating}
    />
  );
}
