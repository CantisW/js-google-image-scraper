/**
 * Scrapes Google for images and returns a url.
 * Credits to Jibble330 (https://github.com/Jibble330) for this fantastic idea.
 */

import axios from "axios";

const headers = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
    "Accept-Encoding": "application/json",
};

const baseUrl = "https://www.google.com/search";

/**
 * Scrapes Google for the first image that appears.
 * @param {string} query The string to be searched.
 * @param {number} limit How many URLs to scrape? (default 1)
 * @throws Will throw an error if query is empty.
 * @returns {object} URL
 */
const scrape = async (query, limit = 1) => {
    if (!query) throw new Error("You cannot have an empty query!");
    let urlsArray = [];
    const params = {
        q: query, // search query
        tbm: "isch", // image results
        hl: "en", // search language
        gl: "us", // search country
        ijn: "0", // pg number
    };

    /**
     * The HTML returned by the GET request ideally would return image data alongside the actual HTML (which is in class 'rg_i Q4LuWd')
     * but Google decided that would be bad for performance, so they instead decided to
     * procedurally load images from some script tag in the HTML (or so I think).
     * We are basically finding this script tag and selecting the third one, which contains the actual image data.
     */

    const res = await axios.get(baseUrl, { headers: headers, params: params });
    let body = res.data;
    body = body.slice(body.lastIndexOf("AF_initDataCallback"));
    body = body.slice(body.indexOf("["));
    body = body.slice(0, body.indexOf("</script>")-1);
    body = body.slice(0, body.lastIndexOf(","));
    
    const img = JSON.parse(body);

    const imgObjects = img[56][1][0][0][1][0];

    for (let i = 0; i < limit; i++) {
        if (imgObjects[i] && imgObjects[i][0][0]["444383007"][1]) {
            let url = imgObjects[i][0][0]["444383007"][1][3][0]; // the url
            urlsArray.push(url);
        }
    }
    return { urls: urlsArray };
};

export default scrape;