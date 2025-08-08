# Character Images Setup

## Directory Structure  
✅ **Already Created!** The folder structure is now ready in your `public` directory:

```
public/
└── images/
    └── characters/
        ├── albedo/
        │   ├── portrait.png
        │   ├── icon.png
        │   ├── side-icon.png
        │   └── wish.png
        ├── ayaka/
        │   ├── portrait.png
        │   ├── icon.png
        │   ├── side-icon.png
        │   └── wish.png
        └── [character-id]/
            ├── portrait.png
            ├── icon.png
            ├── side-icon.png
            └── wish.png
```

## Character IDs
Use these exact folder names (character IDs) from the characters.js file:

### 5-Star Characters:
- `albedo`, `ayaka`, `ayato`, `childe`, `diluc`, `ganyu`, `hutao`, `kazuha`, `kokomi`, `mona`, `raiden`, `venti`, `zhongli`, `yae`, `traveler`

### 4-Star Characters:
- `amber`, `barbara`, `bennett`, `chongyun`, `diona`, `fischl`, `kaeya`, `lisa`, `noelle`, `razor`, `rosaria`, `sucrose`, `xiangling`, `xingqiu`, `xinyan`, `beidou`, `ningguang`

## Image Types
For each character, you can include these 4 image types:
- **portrait.png** - Full body character portrait (used in character grid)
- **icon.png** - Small character face icon (used in game UI)
- **side-icon.png** - Side view icon (used in selected character display)
- **wish.png** - Gacha/wish banner image (used in character preview)

## Recommended Image Sizes
- **portrait.png**: 200x300px or similar aspect ratio
- **icon.png**: 64x64px square
- **side-icon.png**: 64x64px square  
- **wish.png**: 300x400px or similar aspect ratio

## Fallback System
If any image is missing, the game will show a colored placeholder with the character's name. The placeholder color matches their element:
- 🔥 **Pyro**: Red/Orange
- 💧 **Hydro**: Blue  
- ⚡ **Electro**: Purple
- ❄️ **Cryo**: Light Blue
- 🪨 **Geo**: Gold/Yellow
- 💨 **Anemo**: Green
- 🌿 **Dendro**: Dark Green

## Adding More Characters
To add more characters:
1. Add the character data to `src/data/characters.js`
2. Create their image folder in `public/images/characters/[character-id]/`
3. Add their 4 image files

The game will automatically load and display the new characters!