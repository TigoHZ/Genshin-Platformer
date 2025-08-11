export const level4 = {
  id: 4,
  name: "Floating Fortress",
  description: "Complex platforming in the sky",
  difficulty: "Hard",
  color: "#38b2ac",
  startX: 50,
  startY: 520,
  platforms: [
    // Starting area
    { x: 0, y: 570, width: 120, height: 30, color: '#4a5568' },
    // Lower path
    { x: 180, y: 530, width: 60, height: 20, color: '#48bb78' },
    { x: 290, y: 490, width: 60, height: 20, color: '#48bb78' },
    { x: 400, y: 450, width: 80, height: 20, color: '#48bb78' },
    // Upper path (harder but shorter)
    { x: 150, y: 420, width: 50, height: 15, color: '#ed8936' },
    { x: 250, y: 380, width: 45, height: 15, color: '#ed8936' },
    { x: 350, y: 340, width: 45, height: 15, color: '#ed8936' },
    { x: 450, y: 300, width: 50, height: 15, color: '#ed8936' },
    // Convergence point
    { x: 550, y: 400, width: 80, height: 25, color: '#9f7aea' },
    // Final challenge section
    { x: 680, y: 350, width: 40, height: 15, color: '#38b2ac' },
    { x: 770, y: 300, width: 40, height: 15, color: '#f687b3' },
    { x: 860, y: 250, width: 45, height: 15, color: '#fbb6ce' },
    { x: 960, y: 200, width: 50, height: 15, color: '#a78bfa' },
    // Goal platform
    { x: 1080, y: 150, width: 120, height: 40, color: '#4a5568' }
  ],
  goal: { x: 1120, y: 90 }
}

export default level4