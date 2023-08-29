"use client"

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import millify from "millify";
import { Box, Flex, Text, Avatar, AlertTitle, Button } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { baseUrl, fetchApi } from "@/utils/fetchData";
import Saved from "./Saved";
import '@/styles/globals.css'

const Property = ({
  property,
  property: {
    id,
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {

  const { data:session } = useSession();
  const router = useRouter();

  const [propertyPhoto, setPropertyPhoto] = useState(coverPhoto.url);
  const [propertyPhotos, setPropertyPhotos] = useState();
  const [photoIndex, setPhotoIndex] = useState(0);

  const photoCarousel = useRef(null);
  
  
  useEffect(() => {
    async function getPhotos (){
      const propertyDetails = await fetchApi(`${baseUrl}/properties/detail?externalID=${externalID}`);
      const { photos } = propertyDetails;
      setPropertyPhotos(photos)
      setPhotoIndex(0)
    }
    getPhotos()
  }, []);

  const slideLeft = () => {
    if(window.innerWidth >= 768){
      photoCarousel.current.scrollLeft+=340
    }else if (window.innerWidth < 768){
      photoCarousel.current.scrollLeft+=280
    }
  }

  const slideRight = () => {
    if(window.innerWidth >= 768){
      photoCarousel.current.scrollLeft-=340
    }else if (window.innerWidth < 768){
      photoCarousel.current.scrollLeft-=280
    }  }
  
 
  return (
      <Flex
        flexWrap="wrap"
        w={{base:'320px', md:'382px'}}
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
        overflowX={'hidden'}
        onClick={()=>router.push(`/property/${externalID}`)}
      >
        <Box position={'relative'}>
          <Saved id={id} session={session} property={property} />
          <Button 
            position={'absolute'} 
            top={'40%'}  
            borderRadius={'50%'}
            backgroundColor={'rgb(0,0,0,0.5)'}
            zIndex={'5'}
            color='white'
            _hover={{backgroundColor:'#000'}}
            transition='200ms'
            onClick={(e) => {e.stopPropagation(); slideRight(); setPropertyPhoto(propertyPhotos[photoIndex === 0 ? 0 : photoIndex-1].url); setPhotoIndex(prev => prev===0 ? 0 : prev-1)} }
            >
              &lt;
          </Button>
          <Flex ref={photoCarousel}  overflowX='scroll' width={{xs: 300, md:340}} height={260} className="property_carousel">
            {
              propertyPhotos?.map(photo => (
                <Image 
                  src={photo.url}
                  alt='property image'
                  style={{maxWidth: 'full', maxHeight: 'full'}}
                  height='500'
                  width={500}
                  zIndex='3'
                />
              ))
            }
          </Flex>
          <Button 
            position={'absolute'} 
            top={'40%'} 
            right={'0'} 
            zIndex={'5'}
            borderRadius={'50%'}
            backgroundColor={'rgb(0,0,0,0.5)'}
            color='white'
            _hover={{backgroundColor:'#000'}}
            transition='200ms'
            onClick={(e) => {e.stopPropagation(); slideLeft(); setPropertyPhoto(propertyPhotos[photoIndex === propertyPhotos?.length-1 ? propertyPhotos.length-1 : photoIndex+1].url); setPhotoIndex(prev => prev === propertyPhotos.length-1 ? prev : prev+1)} }
          >
            &gt;
          </Button>
        </Box>
        <Box w="full">
          <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">
                {isVerified && <GoVerified />}
              </Box>
              <Text color='blue.700' fontSize="lg">
                {title}
              </Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>

          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="250px"
            color="blue.400"
          >
            {rooms}
            <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
          </Flex>
          <Text fontSize="xs" fontWeight={'semibold'} color='gray.500'>
            AED {millify(price)} {rentFrequency && `${rentFrequency}`}
          </Text>
        </Box>
      </Flex>
  )
}

export default Property;
