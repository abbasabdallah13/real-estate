"use client"

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from 'next-auth/react' 
import { useRouter } from 'next/navigation'
import { CiLogout } from 'react-icons/ci'
import { FcMenu, FcHome, FcAbout, FcBusinessman } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Flex,
  Box,
  Spacer,
  Text,
  Show,
  Hide,
  Button,
} from "@chakra-ui/react";
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";

const Navbar = () => {
  const router = useRouter();
  const { loggedUser, setLoggedUser, getLoggedUser } = useContext(LoggedUserContext)
  const { setOpenModal } = useContext(modalContext)   

  const signOutFunction = () => {
    signOut();
    setLoggedUser({})
    localStorage.removeItem('email')
    router.push('/')
  }

  const emailLogin = localStorage.getItem('email') || '';
  useEffect(() => {
    getLoggedUser(emailLogin)
  }, [loggedUser]);
  

  return (
    <Flex borderBottom={{ base: "2px" }} borderColor={"gray.400"} p={"2"}>
      <Box cursor={"pointer"}>
        <Link href={"/"}>
          <Text fontSize="3xl" as="cite" color={"blue.700"}>
            Real Estates
          </Text>
        </Link>
      </Box>
      <Spacer />
      <Flex alignItems='center'>
        <Box order={{md:'2'}}>
        {
          Object.keys(loggedUser).length > 0 ? (
              <Menu>
                  <MenuButton>
                      <Image src={loggedUser?.image} alt='user' width={40} height={40} style={{borderRadius:'50%', marginRight:'.5rem'}} />
                  </MenuButton>
                  <MenuList>
                      <MenuItem onClick={() => router.push('/wishlists')}>
                          Wish Lists
                      </MenuItem>
                      <MenuItem onClick={()=>{signOutFunction()}}>
                          <CiLogout /> &nbsp;
                          Log Out
                      </MenuItem>
                  </MenuList>
              </Menu>
              ) : (
              <Button
                  as={IconButton}
                  icon={<FcBusinessman />}
                  isRound
                  sx={{marginRight:'.5rem', borderColor:'gray'}}
                  colorScheme='white'
                  variant='outline'
                  onClick={()=>setOpenModal({type:'login_register_modal', params: ''})}
              ></Button>
          )
        }
        </Box>
        <Hide above="md">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FcMenu />}
              variant="outline"
              colorScheme="blue"
            ></MenuButton>
            <MenuList>
              <Link href="/">
                <MenuItem icon={<FcHome />}>Home</MenuItem>
              </Link>
              <Link href={"/search"}>
                <MenuItem icon={<BsSearch />}>
                  <Text>Search</Text>
                </MenuItem>
              </Link>
              <Link href={"/search?purpose=for-rent"}>
                <MenuItem icon={<FcAbout />}>Rent</MenuItem>
              </Link>{" "}
              <Link href={"/search?purpose=for-sale"}>
                <MenuItem icon={<FiKey />}>Buy</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Hide>
        <Show above="md">
          <Flex>

            <Link href={"/"}>
              <Button
                leftIcon={<FcHome />}
                aria-label="navigate to home page"
                variant="link"
                mr={4}
              >
                Home
              </Button>
            </Link>

            <Link href={"/search"}>
              <Button
                leftIcon={<BsSearch />}
                aria-label="navigate to search page"
                variant="link"
                mr={4}
              >
                Search
              </Button>
            </Link>
            <Link href={"/search?purpose=for-rent"}>
              <Button
                leftIcon={<FcAbout />}
                aria-label="check houses for rent"
                variant="link"
                mr={4}
              >
                Rent
              </Button>
            </Link>
            <Link href={"/search?purpose=for-sale"}>
              <Button
                leftIcon={<FiKey />}
                aria-label="Check houses for sale"
                variant="link"
                mr={4}
              >
                Buy
              </Button>
            </Link>
          </Flex>
        </Show>
      </Flex>
    </Flex>
  );
};

export default Navbar;
