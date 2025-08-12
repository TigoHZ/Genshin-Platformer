export const level3 = {
  id: 3,
  name: "Windy Cliffs",
  description: "Scale the grassy cliffsides with Venti's wind powers",
  difficulty: "Medium",
  color: "#48bb78",
  startX: 80,
  startY: 500,
  platforms: [
    // === STARTING LEDGE ===
    { x: 0, y: 540, width: 180, height: 60, color: '#8B4513' },
    { x: 0, y: 540, width: 180, height: 15, color: '#228B22' },
    
    // === CLIFF FACE ASCENT ===
    // First ledge
    { x: 220, y: 480, width: 100, height: 120, color: '#8B4513' },
    { x: 220, y: 480, width: 100, height: 15, color: '#228B22' },
    
    // Small outcropping (requires precise jump or Venti's updraft)
    { x: 380, y: 420, width: 60, height: 30, color: '#8B4513' },
    { x: 380, y: 420, width: 60, height: 15, color: '#228B22' },
    
    // Higher ledge
    { x: 500, y: 360, width: 120, height: 240, color: '#8B4513' },
    { x: 500, y: 360, width: 120, height: 15, color: '#228B22' },
    
    // === FLOATING GRASS ISLANDS ===
    // Series of floating grass platforms (challenging gaps, perfect for wind abilities)
    { x: 700, y: 320, width: 70, height: 25, color: '#8B4513' },
    { x: 700, y: 320, width: 70, height: 15, color: '#228B22' },
    
    { x: 870, y: 280, width: 65, height: 25, color: '#8B4513' },
    { x: 870, y: 280, width: 65, height: 15, color: '#228B22' },
    
    { x: 1040, y: 240, width: 70, height: 25, color: '#8B4513' },
    { x: 1040, y: 240, width: 70, height: 15, color: '#228B22' },
    
    { x: 1220, y: 200, width: 60, height: 25, color: '#8B4513' },
    { x: 1220, y: 200, width: 60, height: 15, color: '#228B22' },
    
    // === NARROW CANYON ===
    // Canyon walls
    { x: 1150, y: 300, width: 40, height: 300, color: '#654321' },
    { x: 1350, y: 300, width: 40, height: 300, color: '#654321' },
    
    // Canyon floor platforms
    { x: 1190, y: 550, width: 160, height: 50, color: '#8B4513' },
    { x: 1190, y: 550, width: 160, height: 15, color: '#228B22' },
    
    // Wall jumping platforms
    { x: 1160, y: 480, width: 30, height: 20, color: '#8B4513' },
    { x: 1160, y: 480, width: 30, height: 15, color: '#228B22' },
    
    { x: 1350, y: 440, width: 30, height: 20, color: '#8B4513' },
    { x: 1350, y: 440, width: 30, height: 15, color: '#228B22' },
    
    { x: 1170, y: 400, width: 30, height: 20, color: '#8B4513' },
    { x: 1170, y: 400, width: 30, height: 15, color: '#228B22' },
    
    { x: 1340, y: 360, width: 30, height: 20, color: '#8B4513' },
    { x: 1340, y: 360, width: 30, height: 15, color: '#228B22' },
    
    // Canyon exit platform
    { x: 1280, y: 320, width: 80, height: 30, color: '#8B4513' },
    { x: 1280, y: 320, width: 80, height: 15, color: '#228B22' },
    
    // === ELEVATED PLATEAU ===
    // Large platform area
    { x: 1420, y: 380, width: 350, height: 220, color: '#8B4513' },
    { x: 1420, y: 380, width: 350, height: 15, color: '#228B22' },
    
    // Decorative grass mounds on plateau
    { x: 1480, y: 360, width: 50, height: 20, color: '#8B4513' },
    { x: 1480, y: 360, width: 50, height: 15, color: '#90EE90' }, // Light green
    
    { x: 1600, y: 365, width: 40, height: 15, color: '#8B4513' },
    { x: 1600, y: 365, width: 40, height: 15, color: '#90EE90' },
    
    { x: 1700, y: 360, width: 45, height: 20, color: '#8B4513' },
    { x: 1700, y: 360, width: 45, height: 15, color: '#90EE90' },
    
    // === FINAL CLIFF CHALLENGE ===
    // High cliff requiring wind powers
    { x: 1820, y: 280, width: 90, height: 320, color: '#8B4513' },
    { x: 1820, y: 280, width: 90, height: 15, color: '#228B22' },
    
    // Very high platform (needs updraft)
    { x: 1970, y: 180, width: 80, height: 30, color: '#8B4513' },
    { x: 1970, y: 180, width: 80, height: 15, color: '#228B22' },
    
    // === SUMMIT GOAL ===
    // Final mountain peak
    { x: 2120, y: 120, width: 100, height: 480, color: '#8B4513' },
    { x: 2120, y: 120, width: 100, height: 15, color: '#32CD32' }, // Bright summit grass
    
    // Goal platform at the very top
    { x: 2140, y: 90, width: 60, height: 30, color: '#DAA520' }, // Golden summit
  ],
  goal: { x: 2160, y: 30 }
}

export default level3