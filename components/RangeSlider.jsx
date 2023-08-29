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
  } from "@chakra-ui/react";
  
  const RangeSliderComponent = ({
    title,
    defaultValue,
    min,
    max,
    setState,
    state,
    label,
    width
  }) => {
    return (
      <div className="p-2 w-full sm:w-[25%] ">
        <Text>{title}</Text>
        <RangeSlider
          defaultValue={defaultValue}
          min={min}
          max={max}
          onChange={(val) => {setState(val)}}
          onChangeEnd={(val) => {setState(val)} }
        >
          <RangeSliderTrack bg={"#E9E9E9"}>
            <RangeSliderFilledTrack bg={"#000"} />
          </RangeSliderTrack>
          <Tooltip label={label} placement={"bottom"} closeDelay={1000} color="#fff">
            <RangeSliderThumb index={0} bg={'#000'} />
          </Tooltip>
          <Tooltip
            label={label}
            placement={"top"}
            closeDelay={1000}
            color="#fff"
          >
            <RangeSliderThumb index={1} bg={'#000'} />
          </Tooltip>
        </RangeSlider>
      </div>
    );
  };
  
  export default RangeSliderComponent;
  