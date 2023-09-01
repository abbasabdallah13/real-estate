"use client"

import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from '@chakra-ui/react'
import { LoggedUserProvider } from '@/context/loggedUserContext'
import { ModalContextProvider } from "@/context/modalContext";
import { GlobalVariablesProvider } from "@/context/globalVariablesContext";


const Provider = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <LoggedUserProvider>
          <ModalContextProvider>
            <GlobalVariablesProvider>
              {children}
            </GlobalVariablesProvider>
          </ModalContextProvider>
        </LoggedUserProvider>
      </ChakraProvider>
    </SessionProvider>
  )
};

export default Provider;
