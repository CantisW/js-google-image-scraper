# `js-google-image-scraper`
[![GitHub](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/guildedjs/guilded.js/blob/main/LICENSE) [![npm version](https://badge.fury.io/js/js-google-image-scraper.svg)](https://badge.fury.io/js/js-google-image-scraper)

Scrapes Google for images.

  

# Usage
There is one function, `scrape()`, which takes the following arguments:

|  Name  |  Type  |                     Description                      |
|--------|--------|------------------------------------------------------|
| query  | string | The query you want to search.                        |
| limit? | number | How many URLs to return. (defaults to 1, max of 100) |

The function will return an object with an array of URLs.

### Examples
```js
let images = await scrape("GitHub", 3);

console.log(images)
console.log(images.urls[2])
```

```
output:

{ urls: [
	'link1',
	'link2',
	'link3'
] }

"link3"
```