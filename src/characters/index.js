import { venti } from './venti.js'
import { arlecchino } from './arlecchino.js'

export const characters = [
  venti,
  arlecchino
]

export { venti, arlecchino }

// Helper function to get character by ID
export function getCharacterById(id) {
  return characters.find(character => character.id === id)
}

// Helper function to get all character IDs
export function getAllCharacterIds() {
  return characters.map(character => character.id)
}

export default characters