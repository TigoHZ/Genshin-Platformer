# 🎮 Genshin Impact Platformer

A fun HTML5 Canvas platformer game featuring Genshin Impact characters with unique elemental abilities!

> **⚠️ Work in Progress**: This game is currently under active development. Expect bugs and missing features!

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/genshin-platformer.git
cd genshin-platformer

# Install dependencies  
npm install

# Start development server
npm run dev
```

Then open http://localhost:5173 in your browser!

## ✨ Features

### 🎯 Character Selection
- **29 Genshin Characters**: All major 5-star and 4-star characters
- **Element Filtering**: Filter by Pyro, Hydro, Electro, Cryo, Geo, Anemo, Dendro
- **Name Search**: Real-time search by character name
- **Pagination**: Load more characters as needed

### 🏔️ Level Selection  
- **5 Unique Levels**: From tutorial to expert difficulty
- **Progressive Challenge**: Easy → Medium → Hard → Expert
- **Beautiful UI**: Color-coded difficulty levels

### 🎮 Gameplay
- **Elemental Abilities**: Each vision grants unique powers:
  - 🔥 **Pyro**: 1.3x speed + fire trail
  - 💧 **Hydro**: Double jump ability
  - ⚡ **Electro**: Standard movement
  - ❄️ **Cryo**: Sliding + double jump + faster speed  
  - 🪨 **Geo**: Create platforms with E key
  - 💨 **Anemo**: Higher jump power
  - 🌿 **Dendro**: Teleport with E key

### 🎨 Visual Features
- **Element-based Placeholders**: Colored fallbacks when images are missing
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on desktop and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🖼️ Adding Character Images

See `CHARACTER_IMAGES.md` for detailed instructions on adding character images.

**Quick Setup:**
1. Create `public/images/characters/[character-id]/` folders
2. Add these 4 image types per character:
   - `portrait.png` (character grid)
   - `icon.png` (game UI)
   - `side-icon.png` (selected character)
   - `wish.png` (character preview)

## 🎯 Controls
- **WASD** or **Arrow Keys**: Move
- **Space**: Jump  
- **E**: Use elemental ability (Dendro/Geo only)

## 📁 Project Structure
```
src/
├── components/           # Vue components
│   ├── CharacterSelector.vue
│   └── game/
│       └── PlatformerGame.vue
├── data/                # Game data
│   └── characters.js    # Character database
├── services/            # Game services  
│   └── genshinApi.js    # Character loading
└── App.vue             # Main app component
```

## 🎨 Customization

### Adding New Characters
Edit `src/data/characters.js`:
```javascript
{
  id: 'new-character',
  name: 'Character Name', 
  vision: 'Element',
  weapon: 'Weapon Type',
  rarity: 5,
  // ... other properties
}
```

### Adding New Levels
Edit the `levels` array in `src/App.vue`:
```javascript
{
  id: 6,
  name: "Level Name",
  description: "Description",
  difficulty: "Hard", 
  color: "#ff0000"
}
```

### Modifying Abilities
Edit `setupVisionAbilities()` in `PlatformerGame.vue`

## 🔧 Technical Details
- **Frontend**: Vue 3 + Vite
- **Styling**: Pure CSS with gradients and animations
- **Game Engine**: HTML5 Canvas with 60fps game loop
- **No Backend**: Fully client-side application
- **No Dependencies**: Only Vue.js, no external game libraries

## 🐛 Known Issues
- Level selection flow has some bugs (work in progress)
- Character images are placeholders (need to add real images)
- Game mechanics need refinement
- Mobile controls not optimized

## 🤝 Contributing
This project is in early development and contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License
This project is for educational purposes. Character assets and lore belong to miHoYo/Cognosphere (Genshin Impact).

## 🎉 Credits
- **Characters & Lore**: miHoYo/Cognosphere (Genshin Impact)
- **Game Development**: Custom HTML5 Canvas implementation
- **UI/UX**: Modern web design with Vue 3

---

**⭐ Star this repo if you find it interesting! Have fun playing with your favorite Genshin characters! 🌟**