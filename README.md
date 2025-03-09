# Welcome to Humbird!
## This is a proof of concept project built during the Cal Poly Humboldt Hackathon for Social Good 2025!
## The proof of concept is based on a 'fun, immersive, and engaging' bridge from citizen science into the realm of published research.

##### Our Project outline includes a minimum viable project with:
 - Integration with at least one citizen science platform. (iNaturalist, eBird, etc.)
 - Integration with Cal Poly Humboldt Digital Commons.
 - Basic audio player for animal sounds.
 - Bird search with basic filtering.
 - User collections for saving favorite bird sounds/images.
 - Simple visualization of sound playback.

##### With stretch goals including:
 - Enhanced Audio/Visual Experiences.
 - Location mapping for sounds and images.
 - Immersive, smooth transitions.

Broadly, to further enchance the play experience of learning.

### From this outline, we narrowed our project to target curious, would be birdwatchers.

#### We started with this rough sketch.
![alt text](https://github.com/johngerving/nature-symphony/blob/main/outline1.jpg "Whiteboard Outline 1") 


#### Which evolved into this more polished, smoother 'one-ish' page format.
![alt text](https://github.com/johngerving/nature-symphony/blob/main/outline2.jpg "Whiteboard Outline 2") 
![alt text](https://github.com/johngerving/nature-symphony/blob/main/forest.jpg "Bird's eye view sketch")

With a goal of being able to browse local Humboldt bird species and their calls, recorded in Humboldt and documented on iNaturalist. For the curious, clicking on a bird in the gallery or on the 'bird's eye view' forest pages opens to a more detailed profile of any given bird!


# Features
- Interactive forest view with local bird observations
- Detailed bird cards with species information
- Real-time iNaturalist data integration
- Responsive design for various screen sizes
- Audio playback for bird calls (where available)


# Setup, Requirements
#### Project Dependencies
This project uses various open-source libraries and frameworks, each with their own licenses. Key dependencies include:
- Svelte 5 (MIT License)
- Node.js (MIT License)
- Supabase (Apache 2.0 License)
- Cloudflare Workers (Apache 2.0 License)

We have utilized yarn to handle our Node.js implementation for our Svelte 5 based web app with a Supabase backend for user controls and authentication and Cloudflare for hosting.

In order to set up this project, be sure to have npm or yarn, with Node.js of course, then run

```bash
yarn add wrangler
yarn install
```
Wrangler is for Cloudflare. `yarn install` will install all of the libraries required for this project, stored in the `yarn.lock` file.

Once you've done this, run
```bash
yarn run dev
```
to see a dev server hosted on your local machine!

# Data Attribution and Copyright

## iNaturalist Data Usage
This project uses data from iNaturalist, a joint initiative of the California Academy of Sciences and the National Geographic Society. The observations and images are contributed by the iNaturalist community under various Creative Commons licenses.
This project uses the iNaturalist API in accordance with their usage guidelines. For more information about the iNaturalist API and its terms of use, visit: https://www.inaturalist.org/pages/api+reference

## Attribution
- All observations from iNaturalist are attributed to their original observers
- Photos are subject to their respective Creative Commons licenses

# Contributing
We welcome contributions!

# Contact
For questions or issues regarding this project, please open an issue on our GitHub repository.

#AI Use
This project included an open conversation with claude-3.5-sonnet through the cursor ai IDE. Claude helped with utilizing Svelte 5, optimizing file structure and SSR, error identification, general troubleshooting, syntax lookup, as well as more complex tasks like: paring down complex code, overcomplicating simple code, data format control, and reminding us what should go into a standard README.