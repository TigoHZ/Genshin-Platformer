export const level2 = {
  id: 2,
  name: "Rolling Meadows",
  description: "Master precise jumps across the rolling hills",
  difficulty: "Easy", 
  color: "#48bb78",
  startX: 80,
  startY: 460,
  platforms: [
    // === STARTING VALLEY ===
    { x: 0, y: 500, width: 250, height: 100, color: '#8B4513' },
    { x: 0, y: 500, width: 250, height: 15, color: '#228B22' },
    
    // === ROLLING HILLS ===
    // Hill 1
    { x: 280, y: 480, width: 140, height: 120, color: '#8B4513' },
    { x: 280, y: 480, width: 140, height: 15, color: '#228B22' },
    
    // Valley dip
    { x: 450, y: 520, width: 100, height: 80, color: '#8B4513' },
    { x: 450, y: 520, width: 100, height: 15, color: '#228B22' },
    
    // Hill 2 - higher
    { x: 580, y: 450, width: 160, height: 150, color: '#8B4513' },
    { x: 580, y: 450, width: 160, height: 15, color: '#228B22' },
    
    // Hill 3 - tallest
    { x: 770, y: 400, width: 180, height: 200, color: '#8B4513' },
    { x: 770, y: 400, width: 180, height: 15, color: '#228B22' },
    
    // === FLOATING ISLANDS SECTION ===
    // Descent platforms with challenging gaps
    { x: 1020, y: 440, width: 80, height: 30, color: '#8B4513' },
    { x: 1020, y: 440, width: 80, height: 15, color: '#228B22' },
    
    { x: 1200, y: 480, width: 70, height: 30, color: '#8B4513' },
    { x: 1200, y: 480, width: 70, height: 15, color: '#228B22' },
    
    { x: 1370, y: 450, width: 75, height: 30, color: '#8B4513' },
    { x: 1370, y: 450, width: 75, height: 15, color: '#228B22' },
    
    { x: 1550, y: 410, width: 80, height: 30, color: '#8B4513' },
    { x: 1550, y: 410, width: 80, height: 15, color: '#228B22' },
    
    // === NARROW BRIDGE AREA ===
    // Bridge supports
    { x: 1720, y: 520, width: 40, height: 80, color: '#654321' },
    { x: 1980, y: 520, width: 40, height: 80, color: '#654321' },
    
    // Narrow bridge platforms with bigger gaps
    { x: 1760, y: 460, width: 50, height: 20, color: '#8B4513' },
    { x: 1760, y: 460, width: 50, height: 15, color: '#228B22' },
    
    { x: 1860, y: 430, width: 50, height: 20, color: '#8B4513' },
    { x: 1860, y: 430, width: 50, height: 15, color: '#228B22' },
    
    { x: 1960, y: 460, width: 50, height: 20, color: '#8B4513' },
    { x: 1960, y: 460, width: 50, height: 15, color: '#228B22' },
    
    // === ASCENDING CHALLENGE ===
    // Staggered platforms going up with challenging gaps
    { x: 2080, y: 500, width: 90, height: 100, color: '#8B4513' },
    { x: 2080, y: 500, width: 90, height: 15, color: '#228B22' },
    
    { x: 2240, y: 460, width: 80, height: 140, color: '#8B4513' },
    { x: 2240, y: 460, width: 80, height: 15, color: '#228B22' },
    
    { x: 2390, y: 420, width: 70, height: 180, color: '#8B4513' },
    { x: 2390, y: 420, width: 70, height: 15, color: '#228B22' },
    
    { x: 2530, y: 380, width: 75, height: 220, color: '#8B4513' },
    { x: 2530, y: 380, width: 75, height: 15, color: '#228B22' },
    
    // === FLOWER FIELD SECTION ===
    // Wide grassy area with small decorative platforms
    { x: 2680, y: 460, width: 300, height: 140, color: '#8B4513' },
    { x: 2680, y: 460, width: 300, height: 15, color: '#228B22' },
    
    // Decorative flower mounds
    { x: 2720, y: 440, width: 40, height: 20, color: '#8B4513' },
    { x: 2720, y: 440, width: 40, height: 15, color: '#FF69B4' }, // Pink flowers
    
    { x: 2820, y: 445, width: 35, height: 15, color: '#8B4513' },
    { x: 2820, y: 445, width: 35, height: 15, color: '#FF1493' },
    
    { x: 2920, y: 440, width: 45, height: 20, color: '#8B4513' },
    { x: 2920, y: 440, width: 45, height: 15, color: '#FF69B4' },
    
    // === GOAL HILL ===
    // Final hill with goal (with a gap before it)
    { x: 3100, y: 380, width: 150, height: 220, color: '#8B4513' },
    { x: 3100, y: 380, width: 150, height: 15, color: '#32CD32' },
    
    // Goal platform on top of hill
    { x: 3150, y: 350, width: 50, height: 30, color: '#DAA520' }, // Golden platform
  ],
  goal: { x: 3165, y: 290 }
}

export default level2