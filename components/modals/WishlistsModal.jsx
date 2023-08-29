import React, { useContext, useEffect } from "react";
import { Box, Button, Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import { GrAdd } from 'react-icons/gr'
import { TbJewishStar } from 'react-icons/tb'
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";

const WishlistsModal = () => {
    const { openModal, setOpenModal } = useContext(modalContext)
    const { loggedUser, savePost, loader } = useContext(LoggedUserContext)


    

  return (
    <Box overflowY='hidden'>
            <Button onClick={() => setOpenModal({type:'create_wishlist', params:{ propertyId:openModal.params.propertyId, property: openModal.params.property, action: 'save_post'}})}  w='full' display='flex' alignItems='center' justifyContent={'flex-start'}  fontSize={'lg'} my={2} p='2'>
                <GrAdd /> &nbsp;
                Create a new wish list
            </Button>
                {
                    loader ? (
                    <Flex justifyContent='center' my='2'>
                        <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        /> 
                    </Flex>
                        ) : (
                        <Box padding='2' overflowY={'scroll'} height='200px'>
                        {
                            loggedUser?.wishlists?.map((wishlist,i) => (
                                <Button display='flex' gap='2' my='2px' w='full' alignItems={'center'} justifyContent={'flex-start'} onClick={() => {savePost(openModal.params.propertyId, loggedUser.email, wishlist.name, openModal.params.property); setOpenModal({type:'timed_popup', params: { text: 'Property Saved to Wishlist !'}})} } key={i}  >
                                    <TbJewishStar />
                                    {wishlist.name}
                                </Button>
                            ))
                        }
                            <Divider />
                         </Box>
                    ) 
                }

    </Box>
  )
};

export default WishlistsModal;
