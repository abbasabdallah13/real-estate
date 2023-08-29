import React, { useContext } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";

const DeleteWishlistModal = () => {
    const { loggedUser, deleteWishlist } = useContext(LoggedUserContext);
    const { openModal, setOpenModal } = useContext(modalContext);

  return (
    <Flex direction='column' alignItems='center' my='4'>
        <Text>Are you sure you want to delete this wishlist ?</Text>
        <Flex mt='2' gap='2'>
            <Button backgroundColor={'white'} color='blue.400' onClick={() => { setOpenModal(false); deleteWishlist(loggedUser.email, openModal.params.wishlistName) } }>Yes</Button>
            <Button color={'red'}  onClick={() => setOpenModal(false)}>Cancel</Button>
        </Flex>
    </Flex>
  )
};

export default DeleteWishlistModal;
