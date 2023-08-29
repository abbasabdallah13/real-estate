import React, { useContext, useState } from "react";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";

const CreateWishlistModal = () => {
    const [newWishlist, setNewWishlist] = useState({name:'', properties: []}) 
    
    const { openModal, setOpenModal } = useContext(modalContext)
    const { loggedUser, updateWishLists, savePost } = useContext(LoggedUserContext)
    
    
    function updateNewWishList (e) {
      setNewWishlist({...newWishlist, name:e.target.value})
   }
  return (
    <Flex direction='column' p='4'>
            <FormLabel>Wish list name:</FormLabel>
            <Input type="text" onChange={updateNewWishList}  />
            {
              openModal.params.action === 'save_post' ? (
                <Button mt='2' w='full' onClick={() => {savePost(openModal.params.propertyId, loggedUser.email, newWishlist.name, openModal.params.property), setOpenModal({type: 'timed_popup', params: {text:'Property Saved to Wishlist !'}})}}>Save</Button>
              ) : openModal.params.action === 'create_wishlist' ? (
                <Button mt='2' w='full' onClick={() => {updateWishLists(loggedUser.email, newWishlist); setOpenModal({type: 'timed_popup', params: {text:'Wishlist Created !'}})}}>Save</Button>
              ) : ''
            }
        <Button mt='2' onClick={() => setOpenModal({type:'wishlists_modal', params:''})}  >Back</Button>
    </Flex>
  )
};

export default CreateWishlistModal;
