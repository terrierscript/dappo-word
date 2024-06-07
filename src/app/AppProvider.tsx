"use client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App, { AppProps } from "next/app"
import React, { FC, PropsWithChildren } from "react"
import '@fontsource/zen-old-mincho'

const theme = extendTheme({
})

export const Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
}

