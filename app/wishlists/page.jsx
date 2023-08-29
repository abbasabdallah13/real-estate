"use client"

import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Text } from "@chakra-ui/react";
import { BiAddToQueue } from 'react-icons/bi'
import modalContext from "@/context/modalContext";
import LoggedUserContext from "@/context/loggedUserContext";
import Wishlists from "@/components/Wishlists";

const page = () => {
  
  const { data:session } = useSession();
  const { setOpenModal } = useContext(modalContext)
  const { loggedUser, getLoggedUser } = useContext(LoggedUserContext)

  useEffect(() => {
      if(session?.user?.email){
          getLoggedUser(session?.user?.email);
        }
  }, [session]);
  
  return (
    <Box p='2' position={'relative'}>
        <Text fontSize={'2xl'} fontWeight={'semibold'} textAlign={'center'}>My Wishlists</Text>
        <Button position={'absolute'} right='1' top='1' display={'flex'} alignItems={'center'} gap='2' fontSize={'xl'} padding={2} onClick={() => setOpenModal({type:'create_wishlist', params:{ action: 'create_wishlist'}})}><BiAddToQueue /></Button>
        <Wishlists wishlists={loggedUser.wishlists} />
    </Box>
  )
};

export default page;
