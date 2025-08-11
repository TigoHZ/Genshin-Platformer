<template>
  <div class="character-selector">
    <h2>Choose Your Champion</h2>
    <p class="subtitle">Select a character to play in the platformer adventure!</p>
    
    <!-- Filters -->
    <div v-if="!loading && characters.length > 0" class="filters">
      <div class="filter-group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name..."
          class="search-input"
        >
      </div>
    </div>
    
    <div v-if="loading" class="loading-message">
      <p>Loading awesome characters...</p>
    </div>
    
    <div v-else-if="characters.length === 0" class="no-characters">
      <p>No characters found. Please check your internet connection.</p>
    </div>
    
    <div v-else class="characters-grid">
      <div 
        v-for="character in filteredCharacters" 
        :key="character.id"
        class="character-card"
        :class="{ 
          'selected': selectedCharacter && selectedCharacter.id === character.id
        }"
        @click="selectCharacter(character)"
      >
        <div class="character-image-container">
          <img 
            :src="character.portraitImage" 
            :alt="character.name"
            class="character-image"
            @error="handleImageError"
            loading="lazy"
          >
        </div>
        
        <div class="character-info">
          <h3 class="character-name">{{ character.name }}</h3>
          <p class="character-title">{{ character.title }}</p>
          
          <div class="character-details">
            <span class="power" :class="character.power?.toLowerCase().replace(' ', '_')">
              {{ character.power }}
            </span>
            <span class="origin">{{ character.origin }}</span>
          </div>
          
          <div class="character-description">
            {{ character.description ? 
              (character.description.length > 100 ? 
                character.description.substring(0, 100) + '...' : 
                character.description) : 
              'A mysterious character' }}
          </div>
        </div>
      </div>
      
      <!-- Pagination Info and Load More -->
      <div v-if="!loading && characters.length > 0" class="pagination-info">
        <p>Showing {{ characters.length }} characters{{ hasMoreCharacters ? ` (${totalCharacters} total available)` : '' }}</p>
        <button 
          v-if="hasMoreCharacters"
          class="btn btn-load-more"
          :disabled="loadingMore"
          @click="$emit('load-more')"
        >
          {{ loadingMore ? 'Loading...' : 'Load More Characters' }}
        </button>
      </div>
    </div>
    
    <!-- Character preview modal -->
    <div v-if="selectedCharacter" class="selected-preview">
      <div class="preview-content">
        <img 
          :src="selectedCharacter.wishImage" 
          :alt="selectedCharacter.name"
          class="preview-image"
          @error="handleImageError"
        >
        <div class="preview-info">
          <h3>{{ selectedCharacter.name }}</h3>
          <p class="preview-title">{{ selectedCharacter.title }}</p>
          <div class="preview-stats">
            <span class="stat">⚡ {{ selectedCharacter.power }}</span>
            <span class="stat">🏠 {{ selectedCharacter.origin }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterSelector',
  
  props: {
    characters: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedCharacter: {
      type: Object,
      default: null
    },
    hasMoreCharacters: {
      type: Boolean,
      default: false
    },
    totalCharacters: {
      type: Number,
      default: 0
    },
    loadingMore: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['character-selected', 'load-more'],
  
  data() {
    return {
      searchQuery: ''
    }
  },
  
  computed: {
    filteredCharacters() {
      let filtered = this.characters
      
      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter(character =>
          character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      return filtered
    }
  },
  
  methods: {
    selectCharacter(character) {
      this.$emit('character-selected', character)
    },
    
    handleImageError(event) {
      // Fallback to a solid color placeholder based on element
      const character = this.characters.find(char => 
        event.target.src.includes(char.id) || 
        event.target.alt === char.name
      )
      
      let color = '667eea'
      if (character) {
        const powerColors = {
          'Wind Mastery': '4caf50',
          'Crimson Moon': 'ff6b47'
        }
        color = powerColors[character.power] || color
      }
      
      event.target.src = `https://via.placeholder.com/200x300/${color}/ffffff?text=${character?.name || 'Character'}`
    }
  }
}
</script>

<style scoped>
.character-selector {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.character-selector h2 {
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

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-input {
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #ff6b6b;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}


.pagination-info {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination-info p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.btn-load-more {
  background: linear-gradient(45deg, #48bb78, #38a169);
  color: white;
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

.btn-load-more:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
}

.btn-load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-message, .no-characters {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.character-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.character-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

.character-card.selected {
  border-color: #ff6b6b;
  box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
  background: rgba(255, 107, 107, 0.1);
}


.character-image-container {
  position: relative;
  text-align: center;
  margin-bottom: 15px;
}

.character-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.character-card:hover .character-image {
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.rarity-stars {
  position: absolute;
  top: -5px;
  right: -5px;
  background: rgba(0, 0, 0, 0.7);
  padding: 5px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.character-info {
  text-align: center;
}

.character-name {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #fff;
}

.character-title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  font-style: italic;
}

.character-details {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.power, .origin {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.power.wind_mastery { background: rgba(0, 255, 127, 0.3); }
.power.crimson_moon { background: rgba(255, 69, 0, 0.3); }

.character-description {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

.selected-preview {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-content {
  display: flex;
  gap: 30px;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.preview-image {
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.preview-info h3 {
  font-size: 2rem;
  margin-bottom: 5px;
}

.preview-title {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
  font-style: italic;
}

.preview-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .preview-content {
    flex-direction: column;
    text-align: center;
  }
  
  .character-selector h2 {
    font-size: 2rem;
  }
}
</style>