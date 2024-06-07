"use client"
import { Box, Button, Container, HStack, Spacer, Stack, VStack } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"

const randomWord = () => {
  const chars = [
    "あいうえおかきくけこさしすせそ",
    "たちつてとなにぬねのはひふへほ",
    "まみむめもやゆよらりるれろよわん",
    "がぎぐげござじずぜぞ",
    "だぢづでどばびぶべぼぱぴぷぺぽ"
  ].join("").split("")

  const idx = Math.floor(Math.random() * chars.length)
  return chars[idx]
}

const Charbox: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Box fontSize={"15vmin"} bg="white" borderWidth={1} borderColor={"black"} w={"1.5em"} h={"1.5em"} textAlign={"center"} fontWeight={"bold"}>
    {children}
  </Box>
}
const SampleButton: FC<{ chars: string[], onComplete: () => void }> = ({ chars, onComplete }) => {
  const exec = useRef(false)
  const [display, setDisplay] = useState<string[]>([])
  const say = async (chars: string[]) => {
    if (exec.current) return
    if (chars.length < 1) return
    exec.current = true
    const utters = chars.map(char => {
      const msg = new SpeechSynthesisUtterance()
      msg.text = char
      msg.rate = 0.01
      msg.pitch = 0.01
      return { msg, char }
    })
    await new Promise(resolve => setTimeout(resolve, 500))
    for (let u of utters) {
      speechSynthesis.speak(u.msg)
      setDisplay((c) => [...c, u.char])
      await new Promise(resolve => setTimeout(resolve, 1300))
    }
    onComplete()
  }
  const padDisplay = [...display, ...[, ,]].slice(0, 3)
  useEffect(() => {
    say(chars)
  }, [chars])
  return <HStack minH="25vmin" justifyContent={"space-between"} w="100%">
    {padDisplay.map(char => {
      return char
        ? <Charbox>{char}</Charbox>
        : <Box fontSize={"15vmin"} w="1.5em"></Box>
    })}
  </HStack>
}

export const Dappo: FC<{}> = () => {
  const [tryCount, setTry] = useState(1)
  const [execute, setExecute] = useState(false)
  const [current, setCurrent] = useState<string[]>([])
  return <Container>
    <VStack justifyContent={"space-between"} h="90vh">
      <Spacer />
      <SampleButton key={current.join("")} chars={current} onComplete={() => {
        setExecute(false)
        setTry(t => t + 1)
      }} />
      <Spacer />
      <Box p={1} bg="#73e691" w="100%">

        <Button variant={"outline"} bg="#73e691"
          color="black"
          borderRadius={0}
          size="lg" colorScheme="green" w="100%" isDisabled={execute} onClick={() => {
            const chars = [randomWord(), randomWord(), randomWord()]
            setExecute(true)
            setCurrent(chars)
          }}>
          {tryCount}
          周目
        </Button>
      </Box>
    </VStack>
  </Container>
}