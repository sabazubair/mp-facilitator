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

interface GiphyResponse {
  data: Gif[]
}

// Function to get a random Giphy link based on a search term
export async function getRandomGiphyLink(searchTerm: string): Promise<string> {
  try {
    const response = await axios.get<GiphyResponse>(
      "https://api.giphy.com/v1/gifs/search",
      {
        params: {
          api_key: giphyApiKey,
          q: searchTerm,
          limit: 50, // You can adjust the limit based on your preference
          rating: "G", // You can adjust the rating if needed
        },
      },
    )
    const gifs = response.data.data
    if (gifs.length === 0) {
      throw new Error("No GIFs found for the search term")
    }
    // Select a random GIF from the results
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)]
    return randomGif.url
  } catch (error) {
    console.error("Error fetching Giphy link: ", error)
    throw error
  }
}
