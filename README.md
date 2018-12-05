# Soundboard
Soundboard in HTML

[Soundboard](https://andersahn.github.io/soundboard/)

## Usage

### Sounds & Categories
Sounds are located in static/sounds
For mp3 file, a corresponding meta file is located in folder:
meta/{filename}.json - where {filename} is the same as the mp3 name.
Note: `yarn make-json` will create a meta file for any sounds found.

Sound naming convention: kebab case
spell-magic-missile.mp3
weapon-sword-hit.mp3
weapon-bow-hit.mp3

### Development & Build

```
#Development
yarn install
yarn dev
yarn make-json

# Deploy github pages
yarn deploy
```
