import axios from "axios"
import * as dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

// Get the Giphy API key from environment variables
const giphyApiKey = process.env.GIPHY_API_KEY

if (!giphyApiKey) {
  throw new Error("Giphy API key not found in environment variables")
}

interface Gif {
  url: string
  bitly_url: string
  embed_url: string
}

// Function to get a random Giphy link based on a search term
export async function getRandomGiphyLink(searchTerm: string): Promise<string> {
  try {
    const response = await axios.get<{ data: Gif }>(
      "https://api.giphy.com/v1/gifs/translate",
      {
        params: {
          api_key: giphyApiKey,
          s: searchTerm,
          rating: "G", // You can adjust the rating if needed
        },
      },
    )
    const gif = response.data.data
    return gif.url
  } catch (error) {
    console.error("Error fetching Giphy link: ", error)
    throw error
  }
}
