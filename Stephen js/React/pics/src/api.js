import axios from "axios";

const searchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID Wc7wE8O6H9a9rHup_fG7hBVyuGebmKP0aSkLGhAX6kc",
    },
    params: {
      query: term,
    },
  });

  return response.data.results;
};

export default searchImages;
