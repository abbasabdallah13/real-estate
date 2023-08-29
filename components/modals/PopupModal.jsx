import React, { useContext, useEffect, useState } from "react";
import { Box, Flex, ModalFooter, Text } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import LoginRegisterModal from "./LoginRegisterModal";
import WishlistsModal from "./WishlistsModal";
import modalContext from "@/context/modalContext";
import CreateWishlistModal from "./CreateWishlistModal";
import TimedPopup from "./TimedPopup";
import DeleteWishlistModal from "./DeleteWishlistModal";
import '@/styles/globals.css'

const PopupModal = () => {
  const { openModal, setOpenModal } = useContext(modalContext);
  const [modalTop, setModalTop] = useState(0);
  
  useEffect(() => {
    document.addEventListener('scroll', () => {
      setModalTop(document.documentElement.scrollTop)
    })
  }, []);
  

  return (
    <>
    {
      openModal && (
        <Flex justifyContent={'center'} alignItems={'center'} position={'absolute'} top={modalTop} w={'full'} h={'100vh'} zIndex={'10'} bg='rgb(0,0,0,0.5)'>
          <Flex w={{base:'100%', md:'50%'}} h={{base:'100vh', md:'fit-content'}}  maxH={{md:'80vh'}} bg={'white'} flexDirection={'column'} borderRadius={{md:'lg'}} className="modal" position='relative' overflowY={'scroll'}>
              {
                openModal.type === 'timed_popup' ? <TimedPopup /> : (
                  <Box position={'relative'}>
                  <Flex position={'absolute'} top='0' w='full' alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #909090'} p='2' bg='white' zIndex={'99'}  >
                    <Text fontSize={'md'} fontWeight={'bold'}  textAlign={'center'} w='full'>
                    {
                    openModal.type === 'login_register_modal' ?
                    <>Login or Sign Up </> : 
                    openModal.type === 'wishlists_modal' ?
                    <>Choose Wishlist</> : 
                    openModal.type === 'create_wishlist' ? 
                    <>Create new wish list</> :
                    openModal.type === 'delete_wishlist_modal' ? 
                    <>Delete Wishlist</> :
                    ''
                    }              
                    </Text>
                    <AiOutlineCloseCircle style={{fontSize:'1.8rem', cursor: 'pointer'}}  onClick={() => setOpenModal(false)} />
                  </Flex>
                  <Box mt='10'>
                    {
                    openModal.type === 'login_register_modal' ?
                    <LoginRegisterModal /> : 
                    openModal.type === 'wishlists_modal' ?
                    <WishlistsModal /> :
                    openModal.type === 'create_wishlist' ?
                    <CreateWishlistModal /> :
                    openModal.type === 'delete_wishlist_modal' ? 
                    <DeleteWishlistModal /> :
                    ''
                    }
                  </Box>
                  </Box>
                )
              }
          </Flex>
        </Flex>
      )
    }
    </>
  )
};

export default PopupModal;
