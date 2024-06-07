import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Dappo } from '../components/Dappo'

export default function Home() {
  return (
    <Box>
      <Container>
        <Dappo />
      </Container>
    </Box>
  )
}
