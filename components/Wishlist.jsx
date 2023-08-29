import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { IoMdTrash } from 'react-icons/io'
import { Box, Flex, Text } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";
import { baseUrl, fetchApi } from "@/utils/fetchData";

const Wishlist = ({wishlist, i, router}) => {
    const { setOpenModal } = useContext(modalContext);
    
    const [propertiesPhotos, setPropertiesPhotos] = useState([]);
    

    useEffect(() => {
        const getSomePropertiesPhotos = async () => {
         
        if(wishlist.properties.length > 0){
            if(wishlist.properties.length === 1){
                await fetchApi(`${baseUrl}/properties/detail?externalID=${wishlist.properties[0].externalID}`).then(result => setPropertiesPhotos([result.photos[0].url, result.photos[1].url, result.photos[2].url, result.photos[3].url ]))
            }else if(wishlist.properties.length === 2){
                await fetchApi(`${baseUrl}/properties/detail?externalID=${wishlist.properties[0].externalID}`).then(result => {setPropertiesPhotos([...propertiesPhotos,result.photos[0].url, result.photos[1].url])})
                await fetchApi(`${baseUrl}/properties/detail?externalID=${wishlist.properties[1].externalID}`).then(result => setPropertiesPhotos([...propertiesPhotos,result.photos[0].url, result.photos[1].url]))
            }else if(wishlist.properties.length >= 3){
                await fetchApi(`${baseUrl}/properties/detail?externalID=${wishlist.properties[0].externalID}`).then(result => setPropertiesPhotos([...propertiesPhotos,result.photos[0].url]))
                await fetchApi(`${baseUrl}/properties/detail?externalID=${wishlist.properties[1].externalID}`).then(result => setPropertiesPhotos([...propertiesPhotos,result.photos[0].url]))
                await fetchApi(`${baseUrl}/properties/detail?externalID=${wishlist.properties[2].externalID}`).then(result => setPropertiesPhotos([...propertiesPhotos,result.photos[0].url, result.photos[1].url]))

            }
        }
    }
        getSomePropertiesPhotos();
    }, []);
    

  return (
    <Box key={i} w={{md:'15rem'}} h={{md:'15rem'}} cursor={'pointer'} position='relative'  onClick={()=>router.push(`/wishlists/${wishlist.name}`)}>
        <Box position='absolute' right='10px' top='10px' borderRadius={'50%'} backgroundColor={'#dedede'} display='flex' justifyContent={'center'} alignItems={'center'} p='2px' zIndex='10' color='red' cursor='pointer' _hover={{color:'white', backgroundColor:'black'}} onClick={(e) => { e.stopPropagation(); setOpenModal({type: 'delete_wishlist_modal', params: { wishlistName: wishlist.name }}) } }>
            <IoMdTrash />
        </Box>
        {
            propertiesPhotos.length === 0 ? 
                ( 
                    <Flex w={{md:'full'}} h={{md:'full'}} justifyContent={'center'} alignItems={'center'} fontSize={'xl'} color={'#a0a0a0'} border={'6px solid rgb(44,82,130,0.7)'} borderRadius={'lg'}>Empty Wishlist</Flex>
                ) :
                (
                    <Box w={{md:'full'}} h={{md:'full'}} display={'flex'} justifyContent={'center'} alignItems={'center'}  borderRadius={'lg'} border={'6px solid rgb(44,82,130,0.7)'} zIndex={2} >
                        <Flex w='full' h='full' zIndex={1} borderRadius={'lg'}>
                            <Image style={{width:'60%', height: '100%'}}  src={propertiesPhotos[0]} width='500' height='500' alt='pic' />
                            <Flex direction={'column'} w='40%' h='100%'>
                                <Image style={{width:'100%', height: '40%'}}  src={propertiesPhotos[1]} width='500' height='500' alt='pic' />
                                <Image style={{width:'100%', height: '40%'}}  src={propertiesPhotos[2]} width='500' height='500' alt='pic' />
                                <Image style={{width:'100%', height: '20%'}}  src={propertiesPhotos[3]} width='500' height='500' alt='pic' />
                            </Flex>
                        </Flex>
                    </Box>
                ) 
        }

        <Text fontWeight={'normal'} textTransform={'uppercase'} ml='2' >{wishlist.name}</Text>
    </Box>
  )
};

export default Wishlist;
