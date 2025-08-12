export const level4 = {
  id: 4,
  name: "Mushroom Forest",
  description: "Bounce through the mystical mushroom groves",
  difficulty: "Medium",
  color: "#48bb78",
  startX: 80,
  startY: 480,
  platforms: [
    // === FOREST FLOOR ENTRANCE ===
    { x: 0, y: 520, width: 200, height: 80, color: '#8B4513' },
    { x: 0, y: 520, width: 200, height: 15, color: '#228B22' },
    
    // === GIANT MUSHROOM SECTION ===
    // Mushroom stem 1
    { x: 250, y: 400, width: 60, height: 200, color: '#F5DEB3' }, // Beige stem
    // Mushroom cap 1 (bouncy platform)
    { x: 220, y: 370, width: 120, height: 30, color: '#DC143C' }, // Red mushroom cap
    { x: 220, y: 370, width: 120, height: 15, color: '#FFB6C1' }, // Light red top
    
    // Mushroom stem 2 - taller
    { x: 450, y: 320, width: 70, height: 280, color: '#F5DEB3' },
    // Mushroom cap 2
    { x: 415, y: 290, width: 140, height: 30, color: '#8B4513' }, // Brown mushroom
    { x: 415, y: 290, width: 140, height: 15, color: '#DEB887' }, // Light brown top
    
    // Small mushrooms as stepping stones
    { x: 600, y: 450, width: 40, height: 60, color: '#F5DEB3' },
    { x: 585, y: 435, width: 70, height: 15, color: '#FF69B4' }, // Pink mushroom
    
    { x: 720, y: 410, width: 45, height: 100, color: '#F5DEB3' },
    { x: 700, y: 395, width: 85, height: 15, color: '#32CD32' }, // Green mushroom
    
    // === ELEVATED FOREST PATH ===
    // Tree branch platforms
    { x: 850, y: 360, width: 150, height: 25, color: '#8B4513' },
    { x: 850, y: 360, width: 150, height: 15, color: '#228B22' },
    
    { x: 1050, y: 320, width: 120, height: 25, color: '#8B4513' },
    { x: 1050, y: 320, width: 120, height: 15, color: '#228B22' },
    
    // === MUSHROOM BRIDGE ===
    // Series of medium mushrooms forming a bridge
    { x: 1220, y: 380, width: 50, height: 80, color: '#F5DEB3' },
    { x: 1205, y: 365, width: 80, height: 15, color: '#FF6347' }, // Orange-red mushroom
    
    { x: 1320, y: 340, width: 55, height: 120, color: '#F5DEB3' },
    { x: 1302, y: 325, width: 90, height: 15, color: '#FF4500' },
    
    { x: 1440, y: 300, width: 50, height: 160, color: '#F5DEB3' },
    { x: 1425, y: 285, width: 80, height: 15, color: '#FF6347' },
    
    { x: 1560, y: 260, width: 60, height: 200, color: '#F5DEB3' },
    { x: 1540, y: 245, width: 100, height: 15, color: '#8B0000' }, // Dark red mushroom
    
    // === UNDERGROUND ROOT CAVE ===
    // Drop down section
    { x: 1700, y: 420, width: 180, height: 180, color: '#654321' }, // Dark earth
    { x: 1700, y: 420, width: 180, height: 15, color: '#228B22' },
    
    // Root platforms inside cave
    { x: 1720, y: 500, width: 80, height: 20, color: '#8B4513' }, // Root platform
    { x: 1780, y: 460, width: 90, height: 20, color: '#8B4513' },
    
    // Cave exit
    { x: 1920, y: 380, width: 100, height: 220, color: '#654321' },
    { x: 1920, y: 380, width: 100, height: 15, color: '#228B22' },
    
    // === GIANT TREE TRUNK SECTION ===
    // Massive tree trunk
    { x: 2070, y: 200, width: 120, height: 400, color: '#8B4513' },
    { x: 2070, y: 200, width: 120, height: 15, color: '#90EE90' }, // Light green moss
    
    // Spiral platforms around the tree (like bark ridges)
    { x: 2040, y: 350, width: 40, height: 15, color: '#654321' },
    { x: 2190, y: 300, width: 40, height: 15, color: '#654321' },
    { x: 2040, y: 250, width: 40, height: 15, color: '#654321' },
    
    // === CANOPY LEVEL ===
    // Large leaf platforms
    { x: 2250, y: 280, width: 100, height: 20, color: '#228B22' }, // Big leaf
    { x: 2400, y: 240, width: 90, height: 20, color: '#32CD32' },
    { x: 2540, y: 200, width: 85, height: 20, color: '#228B22' },
    
    // === FINAL MUSHROOM TOWER ===
    // Tallest mushroom leading to goal
    { x: 2680, y: 100, width: 80, height: 500, color: '#F5DEB3' },
    // Giant mushroom cap at top
    { x: 2630, y: 70, width: 180, height: 30, color: '#FF1493' }, // Bright pink final mushroom
    { x: 2630, y: 70, width: 180, height: 15, color: '#FFB6C1' },
    
    // Goal platform on mushroom
    { x: 2700, y: 40, width: 80, height: 30, color: '#DAA520' }, // Golden goal
  ],
  goal: { x: 2730, y: -20 }
}

export default level4