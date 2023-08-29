"use client"

import { useState, useEffect } from "react";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { FcFilledFilter } from "react-icons/fc";
import { fetchApi, baseUrl } from "@/utils/fetchData"
import Property from "@/components/Property";
import SearchFiltersComp from "@/components/SearchFilter";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);

  return (
    <div className={`${searchFilters && 'overflow-hidden h-[108vh] sm:overflow-scroll sm:h-full'}`}>
      <Flex
        cursor=" pointer"
        bg="gray.600"
        alignItems={"center"}
        justifyContent="center"
        onClick={() => {
          setSearchFilters((prevState) => !prevState);
        }}

      >
        <Flex
          p={"4"}
          cursor={"pointer"}
          alignItems={"center"}
          as="u"
          color={"gray.200"}
        >
          Search Property By Filters &nbsp;
          <FcFilledFilter />
        </Flex>
      </Flex>
      {searchFilters && <SearchFiltersComp />}
      <Flex flexWrap={"wrap"} mt={"4"}>
        {properties.map((el) => (
          <Property key={el.id} property={el} />
        ))}
      </Flex>
      <Text>check the above section </Text>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "monthly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const areaMax = query.areaMax || "35000";
  const roomsMin = query.roomsMin || "1";
  const bathsMin = query.bathsMin || "1";
  const sort = query.sort || "price-asc";
  const categoryExternalID = query.categoryExternalID || "4";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const autoCompleteTest = "marina mall";
  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&areaMax=${areaMax}&roomsMin=${roomsMin}&bathsMin=${bathsMin}&sort=${sort}&categoryExternalID=${categoryExternalID}`
  );
  const test = await fetchApi(
    `https://bayut.p.rapidapi.com/auto-complete?query=${autoCompleteTest}`
  );

  return {
    props: {
      properties: data?.hits,
      test: test?.hits,
    },
  };
}

export default Search;
