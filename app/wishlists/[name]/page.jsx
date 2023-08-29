"use client"

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Flex } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import WishlistProperty from "@/components/WishlistProperty";

const page = () => {
    const { data:session } = useSession();
    const { name } = useParams();
    
    const [details, setDetails] = useState([]);
        

    const { getLoggedUser, loggedUser } = useContext(LoggedUserContext)

    useEffect(() => {
      if(session?.user?.email){
        getLoggedUser(session?.user?.email);
      }

    }, [session]);
    
    useEffect(() => {
      loggedUser?.wishlists?.map(wishlist => {
        if(wishlist.name === name){
          setDetails(wishlist.properties)
        }
      })
    }, []);
    
  return (
    <Flex my='2' flexWrap={'wrap'} >
      {
        details.map(el => (
          <WishlistProperty property={el} />
        ))
      }
    </Flex>
  )
};

export default page;
