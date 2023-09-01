"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Tooltip,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import RangeSliderComponent from "./RangeSlider";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcFilledFilter, FcSearch } from "react-icons/fc";

const SearchFiltersComp = () => {
  const [value, setValue] = useState("for-rent");
  const [rentFrequency, setRentFrequency] = useState('');
  const [priceRange, setPriceRange] = useState(0);
  const [roomsRange, setRoomsRange] = useState(0);
  const [bathsRange, setBathsRange] = useState(0);
  const [areaRange, setAreaRange] = useState(0);  
  const [sort, setSort] = useState('');
  
  const [filter, setFilter] = useState(true);
  

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if(searchParams.get('locationExternalIDs')){
      setFilter(false)
    }
  }, []);
  
  return (
    <Flex direction={{base: 'column', md: 'row'}} columnGap='2' mt='2' p='2' zIndex={99} >
      {
        !filter && (
          <Flex
           cursor=" pointer"
           bg="gray.600"
           color={"gray.200"}
           alignItems={"center"}
           justifyContent="center"
           gap='2'
           p='2'
           order={{base: '2', md: '1'}}
           mt={{base:'2', md:'0'}} 
           onClick={() => {
            setFilter(true);
           }}
          >
            Filter
            <FcFilledFilter />
        </Flex>
        )
      }
      {
        filter && (
          <Box position={'relative'}  bg='#F0F0F0' p='2' w={{md:'40%', lg: '20%'}} border='8px solid black' order={{base: '2', md: '1'}} mt={{base:'2', md:'0'}}  zIndex='10'>
            <AiOutlineCloseCircle style={{position: 'absolute', top: '5px', right: '5px', fontSize: '1.3rem', cursor: 'pointer'}} onClick={() => setFilter(false)}  />
            <Box>
              <Text textAlign={'center'} fontWeight={'bold'}>Filter</Text>
              <Text>Purpose</Text>
              <RadioGroup value={value} onChange={setValue}>
                <Stack direction={"row"} spacing={4}>
                  <Radio value={"for-rent"} colorScheme="blackAlpha">
                    For Rent
                  </Radio>
                  <Radio value={"for-sale"} colorScheme="blackAlpha">
                    For Sale
                  </Radio>
                </Stack>
              </RadioGroup>
              {value === "for-rent" && (
                <Select
                  placeholder="Rent Frequency"
                  size={"xs"}
                  bg="#D9D9D9"
                  color={"#000"}
                  border={'1px solid black'}
                  cursor='pointer'
                  onChange={(e) => {
                    setRentFrequency(e.target.value);
                  }}
                >
                  <option value={"monthly"}>Monthly</option>
                  <option value={"yearly"}>Yearly</option>
                </Select>
              )}
            </Box>
            <Box>
              {/* price range */}
              <RangeSliderComponent
                title={"Price Range"}
                defaultValue={[2290, 3200]}
                min={2290}
                max={3500}
                setState={setPriceRange}
                state={priceRange}
                width={'100%'}
                label={`${priceRange} AED`}
              />
              {/* Rooms */}
              <RangeSliderComponent
                title={"Rooms Range"}
                defaultValue={[1, 2]}
                min={1}
                max={5}
                setState={setRoomsRange}
                state={roomsRange}
                label={`${roomsRange}`}
              />
              {/* Baths */}
              <RangeSliderComponent
                title={"Baths Range"}
                defaultValue={[1, 2]}
                min={1}
                max={4}
                setState={setBathsRange}
                state={bathsRange}
                label={`${bathsRange} `}

              />

              {/* area range */}
              <RangeSliderComponent
                title={"Area Range"}
                defaultValue={[10, 40]}
                min={0}
                max={90}
                setState={setAreaRange}
                state={areaRange}
                label={`${areaRange} sqft`}

              />
            </Box>
            <Flex columnGap={'2'}  >
              <Select
                placeholder="Sort"
                bg={"#D9D9D9"}
                borderColor={"gray.600"}
                color={"#000"}
                size="sm"
                w='40%'
                textAlign='center'
                cursor='pointer'
                onChange={(e) => setSort(e.target.value)}
              >
                <option value={"asc"}>Lowest to Highest</option>
                <option value={"desc"}>Highest to Lowest</option>
              </Select>
                <Button size={"sm"} border='1px solid black' borderRadius='3' _hover={{border:'0'}} onClick={() => { setFilter(false); router.push(`/?locationExternalIDs=5002&categoryExternalID=4&purpose=${value}&rentFrequency=${rentFrequency}&priceMin=${priceRange[0] || 0}&priceMax=${priceRange[1] || 100000}&areaMin=${areaRange[0] || 0}&areaMax=${areaRange[1] || 350000}&roomsMin=${roomsRange[0] || 1}&roomsMax=${roomsRange[1] || 1}&bathsMin=${bathsRange[0] || 1}&bathsMax=${bathsRange[1] || 1}&sort=${sort}`)}}>
                  Apply Filters
                </Button>
            </Flex>
          </Box>
        )
      }
      <InputGroup order={{base:'1', lg:'2'}}  zIndex='9'>
        <Input 
          type='text'  
          placeholder="Search"
          w='full'
          borderWidth={'2px'}
          borderColor={"gray.400"}
        />
        <InputRightElement>
          <Button 
            p='4px' 
            bg='yellow.500' 
            borderRadius='0' 
            borderTop={'2px'} 
            borderRight={'2px'} 
            borderBottom={'2px'} 
            borderColor={"gray.400"}
            // onClick // to search for properties based on the descriptions of the properties but in this case the properties are fetched based on a limited criteria provided by the API host
          >
            <FcSearch fontSize={'5.3rem'}/>
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchFiltersComp;
