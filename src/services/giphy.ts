import * as dotenv from "dotenv"
import axios from "axios"
import fs from "fs"
import path from "path"
import cheerio from "cheerio"
import os from "os"

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

async function getRandomGiphyLink(searchTerm: string): Promise<string> {
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

async function downloadImage(url: string, filepath: string) {
  const response = await axios({ url, responseType: "stream" })
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath)
    response.data.pipe(writer)
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}

// Utility function to get the HTML content of a Giphy link
async function fetchGiphyPage(url: string) {
  const response = await axios.get(url)
  return response.data
}

// Function to parse the HTML and extract the GIF URL
async function extractGifUrl(html: string) {
  const $ = cheerio.load(html)
  const gifUrl = $('meta[property="og:image"]').attr("content")
  return gifUrl
}

export const getGiphyImage = async (searchTerm: string) => {
  const giphyLink = await getRandomGiphyLink(searchTerm)
  const html = await fetchGiphyPage(giphyLink)
  const gifUrl = await extractGifUrl(html)
  const imagePath = path.join(os.tmpdir(), "giphy_image.gif")
  if (!gifUrl) return ""
  await downloadImage(gifUrl, imagePath)
  return imagePath
}
