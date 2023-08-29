import React, { useContext, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import modalContext from "@/context/modalContext";
import '@/styles/sucess.css'

const TimedPopup = () => {
    const { openModal, setOpenModal,  } = useContext(modalContext)
    useEffect(() => {
      setTimeout(() => {
        setOpenModal(false)
      }, 1500);
    }, []);
    
  return (
    <Flex direction='column' alignItems={'center'} justifyContent={'space-around'}  h={{md:'35vh'}}>
      <div className="success-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
      </div>
      <Text fontSize={'2xl'}>{openModal.params.text}</Text>
    </Flex>
  )
};

export default TimedPopup;
