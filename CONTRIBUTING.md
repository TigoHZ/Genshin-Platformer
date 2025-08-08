# Contributing to Genshin Impact Platformer

Thanks for your interest in contributing! This project is in early development and we welcome all kinds of contributions.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/genshin-platformer.git
   cd genshin-platformer
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🎯 Areas That Need Help

### High Priority
- **🐛 Fix level selection bugs** - Game flow has several issues
- **🎮 Improve game mechanics** - Platforming physics need refinement
- **📱 Mobile optimization** - Controls and UI for mobile devices
- **🎨 Add character images** - Replace placeholders with real images

### Medium Priority  
- **🔧 Code cleanup** - Remove technical debt and improve structure
- **✨ New elemental abilities** - More creative character powers
- **🏔️ Level design** - More interesting and challenging levels
- **🎵 Sound effects** - Audio feedback for actions

### Low Priority
- **🎨 Visual polish** - Better animations and effects
- **⚙️ Settings menu** - Volume, controls customization
- **📊 Statistics** - Track completion times, attempts
- **🏆 Achievements** - Unlock system for challenges

## 🛠️ Development Guidelines

### Code Style
- Use Vue 3 Composition API when possible
- Follow existing naming conventions
- Add comments for complex game logic
- Keep functions small and focused

### Game Design
- Maintain the Genshin Impact theme and feel
- Ensure each element has unique abilities
- Test on both desktop and mobile
- Focus on fun gameplay over complexity

### Pull Request Process
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with clear commit messages
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

## 🎮 Project Structure

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

## 🐛 Bug Reports

When reporting bugs, please include:
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Browser and device** information
- **Screenshots or videos** if helpful
- **Console errors** if any

## 💡 Feature Requests

For new features, please:
- Check if it fits the game's theme
- Describe the problem it solves
- Consider implementation complexity
- Think about user experience impact

## 📝 License

By contributing, you agree that your contributions will be licensed under the same terms as the project (educational use, respecting Genshin Impact IP).

---

**Thanks for helping make this game better! 🌟**