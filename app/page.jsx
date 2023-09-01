"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { RotatingTriangles } from "react-loader-spinner";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import { fetchApi, baseUrl } from "../utils/fetchData";
import Property from "../components/Property";
import GlobalVariablesContext from "@/context/globalVariablesContext";
import SearchFiltersComp from "@/components/SearchFilter";
import { useSearchParams } from "next/navigation";
import NotFound from '@/public/assets/images/notFound.png'
import backToTop from '@/public/assets/images/backToTop.png'

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
  const searchParams = useSearchParams();

  const [propertiesForRent, setPropertiesForRent] = useState([]);
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const [showJumpToTop, setShowJumpToTop] = useState(false);
  
  
    
  const { getLoggedUser, loggedUser } = useContext(LoggedUserContext)
  const { search, setSearch, loading, setLoading } = useContext(GlobalVariablesContext)
  
  
  useEffect(() => {
    async function getProperties(){
      setLoading(true);
      if(!searchParams.get('locationExternalIDs')){
        setSearch(false);

        const propertyForSale = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
        );
        setPropertiesForSale(propertyForSale?.hits);
    
        const propertyForRent = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
        );
        setPropertiesForRent(propertyForRent?.hits)
      }else{
        const purpose = searchParams.get('purpose') || "for-rent";
        const rentFrequency = searchParams.get('rentFrequency') || "monthly";
        const minPrice = searchParams.get('minPrice') || "1";
        const maxPrice = searchParams.get('maxPrice') || "1000000";
        const areaMax = searchParams.get('areaMax') || "35000";
        const roomsMin = searchParams.get('roomsMin') || "1";
        const roomsMax = searchParams.get('roomsMax') || "1";
        const bathsMin = searchParams.get('bathsMin') || "1";
        const bathsMax = searchParams.get('bathsMax') || "1";
        const sort = searchParams.get('sort') || "price-asc";
        const locationExternalIDs = searchParams.get('locationExternalIDs') || "5002";
        const data = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=${purpose}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&areaMin=1&areaMax=${areaMax}&roomsMin=${roomsMin}&roomsMax=${roomsMax}&bathsMin=${bathsMin}&bathsMax=${bathsMax}&sort=${sort}`
        )
        setPropertiesForRent(data?.hits) //propertiesForRent is used here just to display all search results on this page
        setPropertiesForSale([])
      }
      setLoading(false);
    }
  
    getProperties()
    
  }, [searchParams]);

  useEffect(() => {
    if(session?.user?.email){
      getLoggedUser(session?.user?.email);
    }

  }, [session]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 900){
        setShowJumpToTop(true)
      }else{
        setShowJumpToTop(false)
      }
    })
  }, []);
  
  
  const jumpToTop = () => {
    if(window.scrollY > 900){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  return (
    <>
    {
      loading ? (
      <Flex w='full' h='100vh' justifyContent='center' alignItems='center'>
        <RotatingTriangles
          visible={true}
          height="80"
          width="80"
          ariaLabel="rotating-triangels-loading"
          wrapperStyle={{}}
          wrapperClass="rotating-triangels-wrapper"
        />
      </Flex> ) : (
        <Box position={'relative'} border='0px solid black'>
          {
            showJumpToTop && (
              <Box position={'fixed'} bottom={'4'} right='4' borderRadius={'full'} zIndex={101}  onClick={() => jumpToTop()}>
                <Image src={backToTop} alt="back to top" width={70} height={70} />
              </Box>
            )
          }
          {
            search && (
              <Box>
                <SearchFiltersComp />
              </Box>
            )
          }
          {
            !search && (
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
            )
          }
          <Box>
            {
              propertiesForRent.length > 0 ? (
                <Flex flexWrap="wrap" mt={ search && '12'} >
                  {
                    propertiesForRent.map((el) => (
                      <Property property={el} key={el.id} />
                    ))
                  }
                </Flex>
                ) : (
                <Flex direction='column' justifyContent={'center'} alignItems={'center'} mb='12' px={{base:'4', md:'0'}}>
                  <Image src={NotFound} width={300} height={300} style={{width: 'min(50vw, 300px)'}} />
                  <Text fontSize={'x-large'} fontWeight={'semibold'}>Sorry! No results found.</Text>
                  <Text color={'#808080'} fontSize={'medium'}  fontWeight={'normal'}>We're sorry no results were found, try changing your filtered options or check out our available properties.</Text>
                </Flex>
              )
            }
          </Box>
          {
            !search && (
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
            )
          }
          <Flex flexWrap="wrap">
            {propertiesForSale?.map((el) => (
              <Property property={el} key={el.id} />
            ))}
          </Flex>
        </Box>
      ) 
    }
    </>
  );
};


export default Home;
