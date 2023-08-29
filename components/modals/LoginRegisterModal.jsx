import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { signIn, getProviders } from "next-auth/react";
import { Spinner } from '@chakra-ui/react'
import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, FormLabel, Input, Text, textDecoration } from "@chakra-ui/react";
import GitHubLogo from "@/public/assets/icons/githubLogo.png"
import GoogleLogo from "@/public/assets/icons/google.png"
import FacebookLogo from "@/public/assets/icons/facebook.png"
import LoggedUserContext from "@/context/loggedUserContext";
import modalContext from "@/context/modalContext";

const LoginRegisterModal = () => {
    const { registerUser, loginUser, registerError, loginError, setRegisterError, setLoginError } = useContext(LoggedUserContext);
    const { setOpenModal } = useContext(modalContext)

    const [providers, setProviders] = useState(null);
    const [register, setRegister] = useState(false);
    const [registerDetails, setRegisterDetails] = useState({});
    const [loginDetails, setLoginDetails] = useState({});
    const [loading, setLoading] = useState(false);
    
    
    
    

    useEffect(() => {
      setLoading(false)
      const setUpProviders = async () => {
        const response = await getProviders();
        setProviders(response)
      }  
      setUpProviders();
  
      }, []);

      useEffect(() => {
        if(loginError.length > 0 || registerError.length > 0){
            setLoading(false)
        }
      }, [loginError, registerError]);
      


      const getLogos = (providerName) => {
        switch (providerName) {
            case 'GitHub':
                return GitHubLogo;
            case 'Google':
                return GoogleLogo;
            case 'Facebook':
                return FacebookLogo;
            default:
                return
        }
    }

  return (
    <Box p='4' h='fit-content'>
        <Flex>
            <Text fontSize={'2xl'} mb={2}>Welcome to Real Estates</Text>
            <Flex alignItems='center' fontSize={'xs'} cursor='pointer'ml='2' color='blue.500' _hover={{ textDecoration: 'underline', color:'#AEAEAE'}} onClick={() => setRegister((prev) => !prev)}>
                {
                    register ? 'Already registered ? Login' : 'New account ? Register'
                }
            </Flex>
        </Flex>
        {
            !register ? (
            <form onSubmit={ (e) => { e.preventDefault(); loginUser(loginDetails)}}>
                <FormLabel>Email Address</FormLabel>
                <Input id='email' type='email' onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})}  />
                <FormLabel>Password</FormLabel>
                <Input id='password' type='password' onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})} />
                { loginError && <Text color='red' fontFamily={'monospace'} textAlign={'center'} my='2'>{loginError}</Text> }
                <Flex justifyContent='center' mt={2}>  
                    {
                        loading && 
                        <Spinner style={{display: loginError.length>0 && 'none'}}  color="blue.500" /> 
                    }
                    <button w={"full"} type="submit" style={{display: loading && 'none'}}  className='login-register-btn' onClick={() => {setLoading(true); setLoginError('')}}>Login</button>
                </Flex>
            </form>
            ) : (
            <form onSubmit={ (e) => {e.preventDefault(); registerUser(registerDetails)} }>
                <FormLabel>First Name</FormLabel>
                <Input id='firstName' type='text' onChange={(e) => setRegisterDetails({...registerDetails, firstName: e.target.value})} />
                <FormLabel>Last Name</FormLabel>
                <Input id='lastName' type='text' onChange={(e) => setRegisterDetails({...registerDetails, lastName: e.target.value})} />
                <FormLabel>Email Address</FormLabel>
                <Input id='email' type='email' onChange={(e) => setRegisterDetails({...registerDetails, email: e.target.value})} />
                <FormLabel>Password</FormLabel>
                <Input id='password' type='password' onChange={(e) => setRegisterDetails({...registerDetails, password: e.target.value})} />
                <FormLabel>Confirm Password</FormLabel>
                <Input id='confirmPassword' type='password' onChange={(e) => setRegisterDetails({...registerDetails, confirmPassword: e.target.value})} />
                { registerError && <Text color='red' fontFamily={'monospace'} textAlign={'center'} mt='2'>{registerError}</Text> }
                <Flex justifyContent='center' mt={2}>
                    {
                        loading && 
                        <Spinner style={{display: registerError.length > 0 && 'none'}}  color='blue.500' /> 
                    }
                    <button w={"full"} type="submit" style={{display: loading && 'none'}}  className='login-register-btn' onClick={() => {setLoading(true); setRegisterError('')}}>Register</button>
                </Flex>
            </form>
            ) 
        }
    
        <Box position='relative' padding='4'>
            <Divider />
            <AbsoluteCenter bg='white' px='2'>
                or
            </AbsoluteCenter>
        </Box>                  {
                  providers && (
                      <Flex flexDirection='column' gap='2'>
                      {
                          Object.values(providers)?.map((provider) => (
                          <Button display='flex' w={'full'} onClick={() => signIn(provider.id)} key={provider.id}>
                              <Image src={getLogos(provider.name)} alt={`${provider.name} logo`} width={20} height={20}  />
                          &nbsp; Sign in with {provider.name}
                          </Button>
                          ))
                      }
                      </Flex>
                  )
                  }
    </Box>
    )
};

export default LoginRegisterModal;
