export const level3 = {
  id: 3,
  name: "Narrow Passages",
  description: "Navigate through tight spaces",
  difficulty: "Medium",
  color: "#9f7aea",
  startX: 50,
  startY: 520,
  platforms: [
    // Starting platform
    { x: 0, y: 570, width: 100, height: 30, color: '#4a5568' },
    // Narrow precision jumps
    { x: 150, y: 520, width: 40, height: 15, color: '#48bb78' },
    { x: 240, y: 470, width: 35, height: 15, color: '#ed8936' },
    { x: 320, y: 420, width: 35, height: 15, color: '#9f7aea' },
    // Ceiling obstacles (requires ducking)
    { x: 400, y: 370, width: 60, height: 15, color: '#38b2ac' },
    { x: 350, y: 320, width: 80, height: 15, color: '#718096' }, // ceiling platform
    { x: 520, y: 370, width: 40, height: 15, color: '#f687b3' },
    // More precision jumps
    { x: 620, y: 320, width: 35, height: 15, color: '#fbb6ce' },
    { x: 720, y: 270, width: 35, height: 15, color: '#a78bfa' },
    { x: 820, y: 220, width: 40, height: 15, color: '#34d399' },
    // Final area
    { x: 920, y: 170, width: 120, height: 30, color: '#4a5568' }
  ],
  goal: { x: 960, y: 110 }
}

export default level3