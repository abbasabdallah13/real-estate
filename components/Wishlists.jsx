import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Flex, Text } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import Wishlist from "./Wishlist";

const Wishlists = ({wishlists}) => {
  const router = useRouter();

  return (
    <>
        {
            wishlists?.length !== 0 ? (
                <Flex flexWrap={'wrap'} columnGap={'5%'} rowGap='2rem' mt='2'>
                    {
                        wishlists?.map((wishlist, i) => (
                            <Wishlist wishlist={wishlist} i={i} router={router} key={i} />
                        ))
                    }
                </Flex>
            ) : <Text>You do not have any wishlists yet</Text>
        }
    </>
  )
};

export default Wishlists;
