"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Box, Flex, Text, Avatar, AlertTitle, Button } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import Saved from "./Saved";
import '@/styles/globals.css'

const WishlistProperty = ({
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
    photos
  },
}) => {

  const { data:session } = useSession();

  const [propertyPhoto, setPropertyPhoto] = useState(coverPhoto);
 
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex
        flexWrap="wrap"
        w={{base:'320px', md:'382px'}}
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <Box position={'relative'}>
          <Saved id={id} session={session} property={property} />
          <Button 
            position={'absolute'} 
            top={'40%'}  
            borderRadius={'50%'}
            backgroundColor={'rgb(0,0,0,0.5)'}
            zIndex={'3'}
            color='white'
            _hover={{backgroundColor:'#000'}}
            transition='200ms'
            onClick={(e) => e.stopPropagation() }
            >
              &lt;
          </Button>
          <Image
            src={propertyPhoto}
            alt='property photo'
            width={400}
            height={260}
            className="property_photo"
          />
          <Button 
            position={'absolute'} 
            top={'40%'} 
            right={'0'} 
            zIndex={'3'}
            borderRadius={'50%'}
            backgroundColor={'rgb(0,0,0,0.5)'}
            color='white'
            _hover={{backgroundColor:'#000'}}
            transition='200ms'
            onClick={(e) => e.stopPropagation() }
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
              <Text fontWeight="normal" fontSize="lg" pr='2'>
                {title}
              </Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>

          <Flex
            alignItems="center"
            pl="4"
            w="250px"
            color="blue.400"
          >
            {rooms}<span>&nbsp;</span><FaBed /><span>&nbsp;</span>|<span>&nbsp;</span>{baths}<span>&nbsp;</span><FaBath /><span>&nbsp;</span>|<span>&nbsp;</span>{millify(area)}<span>&nbsp;</span>sqft<span>&nbsp;</span><BsGridFill />
          </Flex>
          <Text fontSize="xs" fontWeight={'semibold'} pl='4'>
            AED {millify(price)} {rentFrequency && `${rentFrequency}`}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}

export default WishlistProperty;
