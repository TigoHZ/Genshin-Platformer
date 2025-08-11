export const level1 = {
  id: 1,
  name: "Tutorial Plains",
  description: "Learn the basics in this gentle introduction",
  difficulty: "Easy",
  color: "#48bb78",
  startX: 50,
  startY: 500,
  platforms: [
    // Starting ground
    { x: 0, y: 550, width: 200, height: 50, color: '#4a5568' },
    // Basic stepping stones
    { x: 250, y: 520, width: 80, height: 30, color: '#48bb78' },
    { x: 380, y: 490, width: 80, height: 30, color: '#48bb78' },
    // Small gap to teach jumping
    { x: 520, y: 460, width: 120, height: 30, color: '#ed8936' },
    // Final platform before goal
    { x: 700, y: 400, width: 150, height: 40, color: '#38b2ac' },
    // Goal platform
    { x: 900, y: 350, width: 100, height: 50, color: '#4a5568' }
  ],
  goal: { x: 925, y: 290 }
}

export default level1