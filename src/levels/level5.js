export const level5 = {
  id: 5,
  name: "Highland Peaks",
  description: "The ultimate grassland adventure - master all your skills!",
  difficulty: "Hard",
  color: "#48bb78",
  startX: 80,
  startY: 520,
  platforms: [
    // === VALLEY STARTING POINT ===
    { x: 0, y: 560, width: 150, height: 40, color: '#8B4513' },
    { x: 0, y: 560, width: 150, height: 15, color: '#228B22' },
    
    // === RAPID ASCENT CHALLENGE ===
    // Quick stepping stones requiring rhythm
    { x: 200, y: 530, width: 60, height: 70, color: '#8B4513' },
    { x: 200, y: 530, width: 60, height: 15, color: '#228B22' },
    
    { x: 300, y: 500, width: 55, height: 100, color: '#8B4513' },
    { x: 300, y: 500, width: 55, height: 15, color: '#228B22' },
    
    { x: 390, y: 470, width: 50, height: 130, color: '#8B4513' },
    { x: 390, y: 470, width: 50, height: 15, color: '#228B22' },
    
    { x: 470, y: 440, width: 55, height: 160, color: '#8B4513' },
    { x: 470, y: 440, width: 55, height: 15, color: '#228B22' },
    
    { x: 560, y: 410, width: 60, height: 190, color: '#8B4513' },
    { x: 560, y: 410, width: 60, height: 15, color: '#228B22' },
    
    // === PRECISION GAP SECTION ===
    // Long gaps requiring perfect timing or Venti's powers (CHALLENGING!)
    { x: 720, y: 450, width: 60, height: 30, color: '#8B4513' },
    { x: 720, y: 450, width: 60, height: 15, color: '#228B22' },
    
    { x: 920, y: 400, width: 55, height: 30, color: '#8B4513' },
    { x: 920, y: 400, width: 55, height: 15, color: '#228B22' },
    
    { x: 1140, y: 350, width: 60, height: 30, color: '#8B4513' },
    { x: 1140, y: 350, width: 60, height: 15, color: '#228B22' },
    
    { x: 1360, y: 300, width: 55, height: 30, color: '#8B4513' },
    { x: 1360, y: 300, width: 55, height: 15, color: '#228B22' },
    
    // === MULTI-LEVEL MAZE ===
    // Complex overlapping platforms creating multiple paths
    // Upper path
    { x: 1320, y: 250, width: 120, height: 30, color: '#8B4513' },
    { x: 1320, y: 250, width: 120, height: 15, color: '#228B22' },
    
    { x: 1480, y: 220, width: 100, height: 30, color: '#8B4513' },
    { x: 1480, y: 220, width: 100, height: 15, color: '#228B22' },
    
    // Middle path
    { x: 1340, y: 320, width: 90, height: 30, color: '#8B4513' },
    { x: 1340, y: 320, width: 90, height: 15, color: '#228B22' },
    
    { x: 1500, y: 290, width: 85, height: 30, color: '#8B4513' },
    { x: 1500, y: 290, width: 85, height: 15, color: '#228B22' },
    
    // Lower path (longer but easier)
    { x: 1350, y: 390, width: 160, height: 60, color: '#8B4513' },
    { x: 1350, y: 390, width: 160, height: 15, color: '#228B22' },
    
    { x: 1550, y: 360, width: 140, height: 90, color: '#8B4513' },
    { x: 1550, y: 360, width: 140, height: 15, color: '#228B22' },
    
    // === CONVERGENCE AND CHALLENGE ===
    // All paths meet here
    { x: 1720, y: 280, width: 100, height: 170, color: '#8B4513' },
    { x: 1720, y: 280, width: 100, height: 15, color: '#228B22' },
    
    // === CRUMBLING CLIFF SECTION ===
    // Narrow platforms suggesting instability
    { x: 1870, y: 320, width: 40, height: 25, color: '#A0522D' }, // Darker brown (unstable)
    { x: 1870, y: 320, width: 40, height: 15, color: '#228B22' },
    
    { x: 1950, y: 280, width: 35, height: 25, color: '#A0522D' },
    { x: 1950, y: 280, width: 35, height: 15, color: '#228B22' },
    
    { x: 2020, y: 240, width: 40, height: 25, color: '#A0522D' },
    { x: 2020, y: 240, width: 40, height: 15, color: '#228B22' },
    
    { x: 2100, y: 200, width: 35, height: 25, color: '#A0522D' },
    { x: 2100, y: 200, width: 35, height: 15, color: '#228B22' },
    
    { x: 2170, y: 160, width: 40, height: 25, color: '#A0522D' },
    { x: 2170, y: 160, width: 40, height: 15, color: '#228B22' },
    
    // === WIND CHALLENGE AREA ===
    // Platforms requiring updraft usage
    { x: 2270, y: 300, width: 80, height: 150, color: '#8B4513' },
    { x: 2270, y: 300, width: 80, height: 15, color: '#228B22' },
    
    // Very high platform requiring updraft
    { x: 2420, y: 140, width: 70, height: 30, color: '#8B4513' },
    { x: 2420, y: 140, width: 70, height: 15, color: '#228B22' },
    
    { x: 2550, y: 100, width: 65, height: 30, color: '#8B4513' },
    { x: 2550, y: 100, width: 65, height: 15, color: '#228B22' },
    
    { x: 2680, y: 60, width: 70, height: 30, color: '#8B4513' },
    { x: 2680, y: 60, width: 70, height: 15, color: '#228B22' },
    
    // === FINAL MOUNTAIN PEAK ===
    // Massive mountain with winding path
    { x: 2800, y: 200, width: 200, height: 400, color: '#8B4513' },
    { x: 2800, y: 200, width: 200, height: 15, color: '#228B22' },
    
    // Spiral path up the mountain
    { x: 2770, y: 160, width: 50, height: 20, color: '#8B4513' },
    { x: 2770, y: 160, width: 50, height: 15, color: '#228B22' },
    
    { x: 2950, y: 120, width: 50, height: 20, color: '#8B4513' },
    { x: 2950, y: 120, width: 50, height: 15, color: '#228B22' },
    
    { x: 2780, y: 80, width: 50, height: 20, color: '#8B4513' },
    { x: 2780, y: 80, width: 50, height: 15, color: '#228B22' },
    
    // === SUMMIT VICTORY ===
    // Final peak platform
    { x: 2850, y: 40, width: 100, height: 60, color: '#8B4513' },
    { x: 2850, y: 40, width: 100, height: 15, color: '#32CD32' }, // Bright summit grass
    
    // Champion's podium
    { x: 2875, y: 10, width: 50, height: 30, color: '#DAA520' }, // Golden victory platform
  ],
  goal: { x: 2895, y: -50 }
}

export default level5