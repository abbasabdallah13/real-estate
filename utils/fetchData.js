import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "e0e78dbee4msh0d3f4893ec6d209p17051fjsn0ab555d1e57e",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
