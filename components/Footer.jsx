import Image from "next/image";
import Link from "next/link";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import FacebookIcon from '@/public/assets/icons/facebookWhite.png';
import InstagramIcon from '@/public/assets/icons/instagram.png';
import TwitterIcon from '@/public/assets/icons/twitter.png';

const Footer = () => {
  return (
   <Flex direction='column' position={'absolute'} bottom='-16vh' rowGap={'2'} bg={'#1D2641'} w='full' h='16vh' >
      <Flex justifyContent={'space-between'} p='6'>
        <Flex columnGap={'6'} color='white'>
          <Link href={"/search?purpose=for-rent"}>Rent</Link>
          <Link href={"/search?purpose=for-sale"}>Buy</Link>
          <Text cursor='pointer'>Login</Text>
        </Flex>
        <Flex columnGap={'2'}>
          <Image src={FacebookIcon} width='25' height='25' alt='facebook icon' style={{cursor: 'pointer'}} />
          <Image src={InstagramIcon} width='25' height='25' alt='instagram icon' style={{cursor: 'pointer'}} />
          <Image src={TwitterIcon} width='25' height='25' alt='twitter icon' style={{cursor: 'pointer'}} />
        </Flex>
      </Flex>
      <Box position='relative' top='2' p='0' w='full'>
            <Divider />
      </Box>  
      <Text color='white' textAlign='center'>&copy;2023 <span style={{color: '#41F0A4'}}>Real Estate</span></Text>
   </Flex>
  );
};

export default Footer;
