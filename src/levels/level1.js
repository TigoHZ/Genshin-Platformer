export const level1 = {
  id: 1,
  name: "Green Hill Valley",
  description: "A peaceful journey through the grasslands",
  difficulty: "Easy",
  color: "#48bb78",
  startX: 80,
  startY: 480,
  platforms: [
    // === STARTING AREA ===
    // Main ground - brown with grass top
    { x: 0, y: 520, width: 400, height: 80, color: '#8B4513' },
    { x: 0, y: 520, width: 400, height: 15, color: '#228B22' }, // Grass top
    
    // Small hill rise
    { x: 400, y: 500, width: 120, height: 100, color: '#8B4513' },
    { x: 400, y: 500, width: 120, height: 15, color: '#228B22' },
    
    // === FIRST CHALLENGE ===
    // Step platforms going up with proper gaps
    { x: 600, y: 480, width: 80, height: 120, color: '#8B4513' },
    { x: 600, y: 480, width: 80, height: 15, color: '#228B22' },
    
    { x: 780, y: 450, width: 80, height: 150, color: '#8B4513' },
    { x: 780, y: 450, width: 80, height: 15, color: '#228B22' },
    
    { x: 960, y: 420, width: 80, height: 180, color: '#8B4513' },
    { x: 960, y: 420, width: 80, height: 15, color: '#228B22' },
    
    // === GAP JUMP SECTION ===
    // Platform before gap
    { x: 1140, y: 400, width: 100, height: 200, color: '#8B4513' },
    { x: 1140, y: 400, width: 100, height: 15, color: '#228B22' },
    
    // Floating grass platforms (challenging gaps)
    { x: 1360, y: 430, width: 80, height: 30, color: '#8B4513' },
    { x: 1360, y: 430, width: 80, height: 15, color: '#228B22' },
    
    { x: 1560, y: 390, width: 80, height: 30, color: '#8B4513' },
    { x: 1560, y: 390, width: 80, height: 15, color: '#228B22' },
    
    { x: 1760, y: 440, width: 80, height: 30, color: '#8B4513' },
    { x: 1760, y: 440, width: 80, height: 15, color: '#228B22' },
    
    // === UNDERGROUND SECTION ===
    // Drop down area
    { x: 1900, y: 520, width: 200, height: 80, color: '#8B4513' },
    { x: 1900, y: 520, width: 200, height: 15, color: '#228B22' },
    
    // Underground tunnel walls
    { x: 2100, y: 450, width: 30, height: 150, color: '#654321' },
    { x: 2350, y: 450, width: 30, height: 150, color: '#654321' },
    
    // Underground floor
    { x: 2130, y: 580, width: 220, height: 20, color: '#654321' },
    
    // === CLIMB BACK UP ===
    // Stair platforms with gaps
    { x: 2380, y: 520, width: 70, height: 80, color: '#8B4513' },
    { x: 2380, y: 520, width: 70, height: 15, color: '#228B22' },
    
    { x: 2500, y: 480, width: 70, height: 120, color: '#8B4513' },
    { x: 2500, y: 480, width: 70, height: 15, color: '#228B22' },
    
    { x: 2620, y: 440, width: 70, height: 160, color: '#8B4513' },
    { x: 2620, y: 440, width: 70, height: 15, color: '#228B22' },
    
    { x: 2740, y: 400, width: 70, height: 200, color: '#8B4513' },
    { x: 2740, y: 400, width: 70, height: 15, color: '#228B22' },
    
    // === FINAL STRETCH ===
    // Long ground section
    { x: 2860, y: 480, width: 200, height: 120, color: '#8B4513' },
    { x: 2860, y: 480, width: 200, height: 15, color: '#228B22' },
    
    // Small decorative hills
    { x: 2960, y: 460, width: 60, height: 20, color: '#8B4513' },
    { x: 2960, y: 460, width: 60, height: 15, color: '#228B22' },
    
    // === GOAL AREA ===
    // Goal platform - elevated and special
    { x: 3120, y: 380, width: 120, height: 220, color: '#8B4513' },
    { x: 3120, y: 380, width: 120, height: 15, color: '#32CD32' }, // Brighter grass for goal
  ],
  goal: { x: 3170, y: 320 }
}

export default level1