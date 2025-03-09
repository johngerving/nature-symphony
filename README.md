# Welcome to Humbird!
## This is a proof of concept project built during the Cal Poly Humboldt Hackathon for Social Good 2025!
## The proof of concept is based on a 'fun, immersive, and engaging' bridge from citizen science into the realm of published research.

Our Project outline includes a minimum viable project with:
 - Integration with at least one citizen science platform. (iNaturalist, eBird, etc.)
 - Integration with Cal Poly Humboldt Digital Commons.
 - Basic audio player for animal sounds.
 - Bird search with basic filtering.
 - User collections for saving favorite bird sounds/images.
 - Simple visualization of sound playback.

With stretch goals including:
 - Enhanced Audio/Visual Experiences.
 - Location mapping for sounds and images.
 - Immersive, smooth transitions.

Broadly, to further enchance the play experience of learning.

### From this outline, we narrowed our project to target curious, would be birdwatchers.

##### We started with this rough sketch.
![[outline1.jpg]]

#### Which evolved into this more polished, smoother 'one-ish' page format.
![[outline2.jpg]]
![[forest.jpg]]

With a goal of being able to browse local Humboldt bird species and their calls, recorded in Humboldt and documented on iNaturalist. For the curious, clicking on a bird in the gallery or on the 'bird's eye view' forest pages opens to a more detailed profile of any given bird!


# Setup, Requirements

We have utilized yarn to handle our Node.js implementation for our Svelte 5 based web app with a Supabase backend for user controls and authentication and Cloudflare for hosting.

In order to set up this project, be sure to have npm or yarn, with Node.js of course, then run

```bash
yarn add wrangler
yarn install
```
Wrangler is for Cloudflare. `yarn install` will install all of the libraries required for this project.

Once you've done this, run
```bash
yarn run dev
```
to see a dev server hosted on your local machine!

