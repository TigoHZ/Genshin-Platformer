<template>
  <div class="app">
    <header class="game-header">
      <div class="header-left">
        <h1>🎮 Pinda Platforming</h1>
      </div>
      <div class="game-controls">
        <button 
          v-if="!gameStarted && !showLevelSelector" 
          class="btn btn-primary"
          :disabled="!selectedCharacter"
          @click="proceedToLevelSelection"
        >
          {{ selectedCharacter ? `Continue with ${selectedCharacter.name}` : 'Select a Character First' }}
        </button>
        <button 
          v-if="showLevelSelector"
          class="btn btn-secondary"
          @click="backToCharacterSelection"
        >
          ← Back to Character Selection
        </button>
        <button 
          v-if="showLevelSelector" 
          class="btn btn-primary"
          :disabled="!selectedLevel"
          @click="startGame"
        >
          {{ selectedLevel ? `Play ${selectedLevel.name}` : 'Select a Level First' }}
        </button>
        <button 
          v-if="gameStarted" 
          class="btn btn-secondary"
          @click="backToLevelSelection"
        >
          ← Back to Level Selection
        </button>
      </div>
    </header>

    <main class="game-content">
      <!-- Character Selection Screen -->
      <div v-if="!showLevelSelector && !gameStarted" class="selection-screen">
        <CharacterSelector 
          :characters="characters"
          :loading="loading"
          :selected-character="selectedCharacter"
          :has-more-characters="hasMoreCharacters"
          :total-characters="allCharacterIds.length"
          :loading-more="loadingMore"
          @character-selected="onCharacterSelected"
          @load-more="loadMoreCharacters"
        />
      </div>
      
      <!-- Level Selection Screen -->
      <div v-else-if="showLevelSelector" class="level-selection-screen">
        <div class="level-selector">
          <h2>Choose Your Level</h2>
          <p class="subtitle">Select a level to begin your adventure with {{ selectedCharacter?.name }}!</p>
          
          <div class="selected-character-info">
            <img 
              :src="selectedCharacter?.iconImage" 
              :alt="selectedCharacter?.name"
              class="selected-character-avatar"
              @error="handleImageError"
            >
            <div class="selected-character-details">
              <h3>{{ selectedCharacter?.name }}</h3>
              <p>{{ selectedCharacter?.power }} • {{ selectedCharacter?.origin }}</p>
            </div>
          </div>
          
          <div class="levels-grid">
            <div 
              v-for="level in levels" 
              :key="level.id"
              class="level-card"
              :class="{ 'selected': selectedLevel && selectedLevel.id === level.id }"
              :style="{ '--level-color': level.color }"
              @click="selectLevel(level)"
            >
              <div class="level-number">{{ level.id }}</div>
              <div class="level-info">
                <h3 class="level-name">{{ level.name }}</h3>
                <p class="level-description">{{ level.description }}</p>
                <div class="level-difficulty" :class="level.difficulty.toLowerCase()">
                  {{ level.difficulty }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Screen -->
      <div v-else-if="gameStarted && selectedCharacter && selectedLevel" class="game-screen">
        <PlatformerGame 
          :selected-character="selectedCharacter"
          :selected-level="selectedLevel"
          @game-over="onGameOver"
        />
      </div>
    </main>

    <!-- Loading overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading characters...</p>
        <div v-if="loadingProgress > 0" class="progress-bar">
          <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
        </div>
        <p v-if="loadingProgress > 0" class="progress-text">{{ loadingProgress }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterSelector from './components/CharacterSelector.vue'
import PlatformerGame from './components/game/PlatformerGame.vue'
import { CharacterAPI } from './services/characterApi.js'
import { levels } from './levels/index.js'

export default {
  name: 'App',
  
  components: {
    CharacterSelector,
    PlatformerGame
  },
  
  data() {
    return {
      characters: [],
      allCharacterIds: [],
      currentPage: 1,
      charactersPerPage: 12,
      selectedCharacter: null,
      selectedLevel: null,
      gameStarted: false,
      showLevelSelector: false,
      loading: true,
      loadingMore: false,
      loadingProgress: 0,
      
      // Level data (imported from levels folder)
      levels
    }
  },
  
  computed: {
    hasMoreCharacters() {
      return this.characters.length < this.allCharacterIds.length
    },
    
    totalPages() {
      return Math.ceil(this.allCharacterIds.length / this.charactersPerPage)
    }
  },
  
  async mounted() {
    await this.loadCharacters()
  },
  
  methods: {
    async loadCharacters() {
      this.loading = true
      this.loadingProgress = 0
      try {
        console.log('🔄 Loading character list...')
        this.allCharacterIds = await CharacterAPI.getAllCharacters()
        console.log('✅ Found', this.allCharacterIds.length, 'total characters')
        
        await this.loadCharacterPage(1)
      } catch (error) {
        console.error('❌ Failed to load characters:', error)
        this.characters = []
      } finally {
        this.loading = false
        this.loadingProgress = 100
      }
    },
    
    async loadCharacterPage(page) {
      const isLoadingMore = page > 1
      if (isLoadingMore) {
        this.loadingMore = true
      }
      
      try {
        const startIndex = (page - 1) * this.charactersPerPage
        const endIndex = startIndex + this.charactersPerPage
        const pageIds = this.allCharacterIds.slice(startIndex, endIndex)
        
        console.log(`🔄 Loading page ${page} (${pageIds.length} characters)...`)
        
        const pageCharacters = await CharacterAPI.getCharactersByIds(pageIds, (progress) => {
          this.loadingProgress = progress
        })
        
        if (isLoadingMore) {
          this.characters.push(...pageCharacters)
        } else {
          this.characters = pageCharacters
        }
        
        this.currentPage = page
        console.log('✅ Page loaded successfully:', pageCharacters.length, 'characters')
      } catch (error) {
        console.error(`❌ Failed to load page ${page}:`, error)
      } finally {
        if (isLoadingMore) {
          this.loadingMore = false
        }
      }
    },
    
    loadMoreCharacters() {
      if (!this.loadingMore && this.hasMoreCharacters) {
        this.loadCharacterPage(this.currentPage + 1)
      }
    },
    
    onCharacterSelected(character) {
      this.selectedCharacter = character
      console.log('Selected character:', character.name)
    },
    
    selectLevel(level) {
      this.selectedLevel = level
      console.log('🎯 Selected level:', level.name, 'ID:', level.id)
    },
    
    proceedToLevelSelection() {
      if (this.selectedCharacter) {
        this.showLevelSelector = true
      }
    },
    
    backToCharacterSelection() {
      this.showLevelSelector = false
      // Keep selectedLevel so user doesn't lose their choice
      console.log('🔙 Back to character selection, keeping level:', this.selectedLevel?.name)
    },
    
    async startGame() {
      if (this.selectedCharacter && this.selectedLevel) {
        console.log('🎮 Starting game with:', this.selectedCharacter.name, 'on level:', this.selectedLevel.name)
        this.gameStarted = true
        this.showLevelSelector = false
      } else {
        console.error('❌ Cannot start game - missing character or level:', {
          character: !!this.selectedCharacter,
          level: !!this.selectedLevel
        })
      }
    },
    
    backToLevelSelection() {
      this.gameStarted = false
      this.showLevelSelector = true
    },
    
    onGameOver(gameResult = {}) {
      console.log('🎮 Game over! Result:', gameResult)
      // Just log the result - no database to update
    },
    
    handleImageError(event) {
      const character = this.selectedCharacter
      let color = '667eea'
      if (character) {
        const powerColors = {
          'Wind Mastery': '4caf50',
          'Crimson Moon': 'ff6b47'
        }
        color = powerColors[character.power] || color
      }
      event.target.src = `https://via.placeholder.com/60x60/${color}/ffffff?text=${character?.name?.charAt(0) || 'C'}`
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  color: white;
}

.game-header {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.game-controls {
  display: flex;
  gap: 10px;
}

.game-header h1 {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.game-content {
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.selection-screen {
  max-width: 1200px;
  margin: 0 auto;
}

.game-screen {
  height: calc(100vh - 120px);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.btn-secondary {
  background: linear-gradient(45deg, #74b9ff, #0984e3);
  color: white;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(116, 185, 255, 0.6);
}

.level-selection-screen {
  max-width: 1200px;
  margin: 0 auto;
}

.level-selector h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.level-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 20px;
}

.level-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

.level-card.selected {
  border-color: var(--level-color);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}

.level-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--level-color);
  text-shadow: 0 0 20px var(--level-color);
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.level-info {
  flex: 1;
}

.level-name {
  font-size: 1.4rem;
  color: white;
  margin-bottom: 8px;
}

.level-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.level-difficulty {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.level-difficulty.easy { background: #48bb78; color: white; }
.level-difficulty.medium { background: #ed8936; color: white; }
.level-difficulty.hard { background: #e53e3e; color: white; }
.level-difficulty.expert { background: #9f7aea; color: white; }

.selected-character-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}

.selected-character-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.selected-character-details h3 {
  color: white;
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}

.selected-character-details p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  text-align: center;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 20px auto 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 5px 0 0 0;
}

@media (max-width: 768px) {
  .game-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .game-header h1 {
    font-size: 1.5rem;
  }
  
  .levels-grid {
    grid-template-columns: 1fr;
  }
  
  .selected-character-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>