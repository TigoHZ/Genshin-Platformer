import { level1 } from './level1.js'
import { level2 } from './level2.js'
import { level3 } from './level3.js'
import { level4 } from './level4.js'
import { level5 } from './level5.js'

export const levels = [
  level1,
  level2,
  level3,
  level4,
  level5
]

export { level1, level2, level3, level4, level5 }

// Helper function to get level by ID
export function getLevelById(id) {
  return levels.find(level => level.id === id)
}

// Helper function to get all level IDs
export function getAllLevelIds() {
  return levels.map(level => level.id)
}

export default levels