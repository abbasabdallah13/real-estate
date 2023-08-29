"use client"

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaBed, FaBath } from "react-icons/fa";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { fetchApi, baseUrl } from "@/utils/fetchData.js";
import { getIcon } from "../../../utils/getIcons";
import m2Icon from "@/public/assets/icons/m2.png"
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";
import Saved from "@/components/Saved";

const Property = () => {
  const { id } = useParams()
  const { data:session } = useSession();
  
  
  const [details, setDetails] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [saved, setSaved] = useState(null);
  
  
  const { openModal, setOpenModal } = useContext(modalContext)
  const { loggedUser, getLoggedUser, unSavePost } = useContext(LoggedUserContext)

  
  
const slideRight = () => {
  const imageScroll = document.getElementById('imageScroll');
  imageScroll.scroll({
      top:0,
      left: imageScroll.scrollLeft + 100,
      behavior: 'smooth'
    })
}  

const slideLeft = () => {
  const imageScroll = document.getElementById('imageScroll');
  imageScroll.scroll({
    top:0,
    left: imageScroll.scrollLeft - 100,
    behavior: 'smooth'
  })}  

  useEffect(() => {
    async function getPropertyDetails() {
      const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
      setDetails(data)
      setSelectedImage(data?.coverPhoto?.url)
    }
  
    getPropertyDetails();
  }, []);

  useEffect(() => {
    if(session?.user?.email){
      getLoggedUser(session?.user?.email);
    }

  }, [session]);



  return (
    <Box p='2' position='relative'>
      <Saved id={details.id} session={session} property={details} />
      <Text color='blue.700'  fontSize='xl' fontWeight='semibold' textAlign='center' className="secondary-color">{details.title}</Text>
      <Text color='gray.500'  fontSize='xs' fontWeight='normal' textAlign='center' mb='2' fontStyle='italic' className="gray-text">
      {
        details?.location?.map((el, i, arr) => (
          <span key={el.name}>
            {el.name}{i !== arr.length-1 && ' '}
          </span>
        ))
      }
      </Text>
      <Flex flexDirection={{base: 'column', md: 'column'}}>
        <Flex justifyContent='center' alignItems='center'>
          <Box w={{base:'80%', md: '50%'}}>
            <Image src={selectedImage} width={2000} height={600} style={{maxWidth: '100%'}} alt='photo viewer' />
            <Box position={'relative'} maxW={'100%'}>
              <button style={{display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', borderRadius:'50%', padding:'2px', right:0,top:'20%',backgroundColor:'rgb(0,0,0,0.5)',color:'white', width:'20px', height:'20px', zIndex:'5', fontSize:'1rem'}}  onClick={slideRight} >&gt;</button>
              <button style={{display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', borderRadius:'50%', padding:'2px', left:0,top:'20%',backgroundColor:'rgb(0,0,0,0.5)',color:'white', width:'20px', height:'20px', zIndex:'5', fontSize:'1rem'}}  onClick={slideLeft}  >&lt;</button>
              <div style={{position:'relative', overflow:'hidden', whiteSpace:'nowrap'}} id='imageScroll'>
                {
                  details?.photos?.map((el, i) => (
                    <div style={{display:'inline-block', marginLeft:`${i!==0&&'2px'}` ,position:'relative', width:'40px',height:'40px', cursor:'pointer', border:'1px solid #000'}} onClick={() => setSelectedImage(el.url)} key={i}>
                    {
                        selectedImage !== el.url && (
                          <Box bg={'rgb(0,0,0,0.4)'} position={'absolute'} top={'0'} left={'0'} w={'full'} h={'full'}  zIndex={'1'}></Box>
                        )
                      }
                      <Image fill zIndex='2' style={{width:'100%', height:'100%'}} src={el.url} alt={`photo ${i}`} />
                    </div>
                  ))
                }
              </div>
            </Box>
          </Box>
        </Flex>
       <Flex direction='column' justifyContent='center' padding={{md:'1.5rem'}}>
        <Flex color='blue.400' mt='1rem' justifyContent='center' gap='2rem'>
          <Flex alignItems={'center'} gap={'2'}>
            <Text fontSize={'4xl'} className="primary-color">{details.rooms}</Text>
            <FaBed fontSize={'2rem'}  className="primary-color" />
          </Flex>
          <Flex alignItems={'center'} gap={'2'}>
            <Text fontSize={'4xl'} className="primary-color">{details.baths}</Text>
            <FaBath fontSize={'2rem'}  className="primary-color" />
          </Flex>
          <Flex alignItems={'center'} gap={'2'}>
            <Text fontSize={'4xl'} className="primary-color">{Math.floor(details.area)}</Text>
            <Image width={40} height={30} style={{position: 'relative', bottom: '5px'}}  src={m2Icon} alt='meters squared icon' />
          </Flex>
        </Flex>
        <Box>
          <Text fontSize={'lg'} color='blue.700'  fontWeight={'semibold'} mt={'4'}>Amenities</Text>
          <Box display={{sm:'flex'}} flexWrap={{sm:'wrap'}} gap={{sm:'4'}} textAlign={{sm:'center'}}>
          {
            details?.amenities?.map((el,i) => (
              <span key={i}>
                {
                  el?.amenities?.map((el2,i) => (
                    <Flex alignItems={'center'} gap={'2px'} key={i}>
                      <li style={{color: '#707070'}}>{el2.text}</li>
                      {getIcon(el2.text)}
                    </Flex>
                  ))
                }
              </span>
            ))
          }
          </Box>
        </Box>
       </Flex>
    </Flex>
  </Box>
  );
};


export default Property;
