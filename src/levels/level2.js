export const level2 = {
  id: 2,
  name: "Leaping Ledges",
  description: "Test your precision jumping skills",
  difficulty: "Medium",
  color: "#ed8936",
  startX: 50,
  startY: 480,
  platforms: [
    // Starting area
    { x: 0, y: 530, width: 120, height: 30, color: '#4a5568' },
    // Rising platforms with increasing gaps
    { x: 200, y: 470, width: 70, height: 25, color: '#48bb78' },
    { x: 350, y: 410, width: 70, height: 25, color: '#ed8936' },
    { x: 520, y: 350, width: 60, height: 25, color: '#9f7aea' },
    // Tricky section with smaller platforms
    { x: 650, y: 290, width: 50, height: 20, color: '#f687b3' },
    { x: 780, y: 230, width: 50, height: 20, color: '#fbb6ce' },
    // Final stretch
    { x: 900, y: 170, width: 80, height: 25, color: '#38b2ac' },
    { x: 1050, y: 120, width: 150, height: 40, color: '#4a5568' }
  ],
  goal: { x: 1100, y: 60 }
}

export default level2