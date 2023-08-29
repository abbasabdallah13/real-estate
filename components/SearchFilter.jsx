"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Tooltip,
  Flex,
  Button,
} from "@chakra-ui/react";
import RangeSliderComponent from "./RangeSlider";

const SearchFiltersComp = () => {
  const [value, setValue] = useState("for-rent");
  const [priceRange, setPriceRange] = useState(0);
  const [roomsRange, setRoomsRange] = useState(0);
  const [bathsRange, setBathsRange] = useState(0);
  const [areaRange, setAreaRange] = useState(0);  
  const [zoom, setZoom] = useState(10);

  const router = useRouter();

  const handleChangeTest = ([a, b]) => {
    const path = router.pathname;
    const { query } = router;
    query[a] = b;
    router.push({ pathname: path, query: query });
  };




  return (
    <div className="bg-[#E4E4E4] p-2 h-screen sm:h-full">
      <div className="sm:flex sm:flex-col sm:justify-center">
        <div>
          <Text as="u">Purpose</Text>
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
              onChange={(e) => {
                handleChangeTest(["rentFrequency", e.target.value]);
              }}
            >
              <option value={"monthly"}>Monthly</option>
              <option value={"yearly"}>Yearly</option>
            </Select>
          )}
        </div>
        <div className="flex flex-col sm:flex-row">
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
        </div>
        <div className="mt-4 flex flex-col items-center">
          <Select
            placeholder="Sort"
            w={"50%"}
            bg={"#D9D9D9"}
            borderColor={"gray.600"}
            textAlign={"center"}
            color={"#000"}
            size="sm"
            onChange={(e) => handleChangeTest(["sort", e.target.value])}
          >
            <option value={"asc"}>Lowest to Highest</option>
            <option value={"desc"}>Highest to Lowest</option>
          </Select>
          <Link
            href={`/search?purpose=${value}&priceMin=${priceRange[0] || 0}&priceMax=${priceRange[1] || 100000}&areaMax=${areaRange[1] || 350000}&roomsMin=${roomsRange[0] || 1}&roomsMax=${roomsRange[1] || 1}&bathsMin=${bathsRange[0] || 1}&bathsMax=${bathsRange[1] || 1}`}
            passHref
          >
            <Button className="mt-4" size={"sm"}>
              Apply Filters
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchFiltersComp;
