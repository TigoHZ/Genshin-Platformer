import { characters } from '../characters/index.js'

export class CharacterAPI {
  static async getAllCharacters() {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log('📋 Using hardcoded character database')
    return characters.map(char => char.id)
  }

  static async getCharacter(characterId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    const character = characters.find(char => char.id === characterId)
    return character || null
  }

  static async getCharactersWithDetails(limit = 30, onProgress = null) {
    console.log(`🔄 Loading ${limit} characters from local database...`)
    
    // Simulate progressive loading for better UX
    const results = []
    const limitedCharacters = characters.slice(0, limit)
    
    for (let i = 0; i < limitedCharacters.length; i += 5) {
      const batch = limitedCharacters.slice(i, i + 5)
      results.push(...batch)
      
      // Update progress
      if (onProgress) {
        const progress = Math.round((i + 5) / limitedCharacters.length * 100)
        onProgress(Math.min(progress, 100))
      }
      
      // Small delay to simulate loading
      if (i + 5 < limitedCharacters.length) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }

    console.log(`✅ Successfully loaded ${results.length} characters from local database`)
    return results
  }

  static async getCharactersByIds(characterIds, onProgress = null) {
    console.log(`🔄 Loading ${characterIds.length} specific characters from local database...`)
    
    const results = []
    
    for (let i = 0; i < characterIds.length; i += 3) {
      const batch = characterIds.slice(i, i + 3)
      const batchResults = batch.map(id => 
        characters.find(char => char.id === id)
      ).filter(char => char !== null)
      
      results.push(...batchResults)
      
      // Update progress
      if (onProgress) {
        const progress = Math.round((i + 3) / characterIds.length * 100)
        onProgress(Math.min(progress, 100))
      }
      
      // Small delay to simulate loading
      if (i + 3 < characterIds.length) {
        await new Promise(resolve => setTimeout(resolve, 30))
      }
    }

    console.log(`✅ Successfully loaded ${results.length} characters by IDs from local database`)
    return results
  }
}