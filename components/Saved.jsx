import React, { useEffect, useContext, useState } from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FcLike } from "react-icons/fc"
import { BsFillSuitHeartFill } from "react-icons/bs"
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";

const Saved = ({ property, id, session }) => {
    const { loggedUser, unSavePost } = useContext(LoggedUserContext)
    const { openModal, setOpenModal } = useContext(modalContext)
    
    const [saved, setSaved] = useState(false);
   

    useEffect(() => {
      console.log(loggedUser)
        if(loggedUser){
          loggedUser?.wishlists?.map(wishlist => {
            wishlist.properties.map(property => {
              if(property.id === id){
                return setSaved(true)
              }
            })  
          })
        }
      }, [loggedUser]);

  return (
    <Box position={'absolute'} right={'1rem'} top={'.5rem'} zIndex={'5'} cursor='pointer'>
    {
      !saved ? (
        <Flex alignItems='center' color='#353535' _hover={{color:'#F44336'}}  gap={'2px'} onClick={(e) => { e.stopPropagation(); !Object.keys(loggedUser).length > 0 ? setOpenModal({type: 'login_register_modal', params:''}) : setOpenModal({type: 'wishlists_modal', params: { propertyId: id, property } })}}>
          <BsFillSuitHeartFill  fontSize={'4xl'}  />
        </Flex>
      ) : (
        <Flex alignItems='center' color='#F44336' gap={'2px'} _hover={{textDecoration:'underline'}}  onClick={(e) => { e.stopPropagation(); setSaved(false); unSavePost(id, loggedUser.email)}}>
          <Text fontSize={'xs'} fontWeight={'bold'}>saved</Text>
          <FcLike fontSize={'4xl'}  />
        </Flex>
      )
    }
  </Box>
  )
};

export default Saved;
