"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import { fetchApi, baseUrl } from "../utils/fetchData";
import Property from "../components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text color="gray.500" fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text
        color="gray.700"
        fontSize="lg"
        fontWeight="medium"
        paddingBottom="3"
      >
        {desc1}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const Home = () => {
  const { data:session } = useSession();

  const [propertiesForRent, setPropertiesForRent] = useState([]);
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  
    
  const { getLoggedUser, loggedUser } = useContext(LoggedUserContext)
  
  
  useEffect(() => {
    async function getProperties(){
      const propertyForSale = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
      );
      setPropertiesForSale(propertyForSale?.hits);
  
      const propertyForRent = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
      );
      setPropertiesForRent(propertyForRent?.hits)
  
    }
  
    getProperties()
    
  }, []);

  useEffect(() => {
    if(session?.user?.email){
      getLoggedUser(session?.user?.email);
    }

  }, [session]);
  
  

  return (
    <Box>
      <Banner
        purpose={"RENT A HOME"}
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartmenets, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose-for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent?.map((el) => (
          <Property property={el} key={el.id} />
        ))}
      </Flex>
      <Banner
        purpose={"BUY A HOME"}
        title1="Find, Buy & Own Your Home "
        title2="Everyone"
        desc1="Explore Apartmenets, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose-for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale?.map((el) => (
          <Property property={el} key={el.id} />
        ))}
      </Flex>
    </Box>
  );
};


export default Home;
