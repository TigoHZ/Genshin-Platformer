export const level5 = {
  id: 5,
  name: "Sky Sanctuary",
  description: "The ultimate challenge awaits",
  difficulty: "Expert",
  color: "#f56565",
  startX: 50,
  startY: 550,
  platforms: [
    // Starting platform
    { x: 0, y: 600, width: 100, height: 30, color: '#4a5568' },
    // Ultra-precision section
    { x: 130, y: 550, width: 30, height: 12, color: '#48bb78' },
    { x: 190, y: 500, width: 25, height: 12, color: '#ed8936' },
    { x: 245, y: 450, width: 25, height: 12, color: '#9f7aea' },
    { x: 300, y: 400, width: 30, height: 12, color: '#38b2ac' },
    // Moving platform simulation (static but positioned for maximum challenge)
    { x: 370, y: 350, width: 25, height: 10, color: '#f687b3' },
    { x: 420, y: 310, width: 25, height: 10, color: '#fbb6ce' },
    { x: 470, y: 270, width: 25, height: 10, color: '#a78bfa' },
    // Fake-out section (platforms that look like paths but are dead ends)
    { x: 520, y: 230, width: 30, height: 10, color: '#718096' },
    { x: 580, y: 190, width: 25, height: 10, color: '#718096' }, // dead end
    // Real path (requires backtracking and precise jumping)
    { x: 460, y: 200, width: 35, height: 12, color: '#34d399' },
    { x: 380, y: 160, width: 30, height: 12, color: '#60a5fa' },
    { x: 300, y: 120, width: 30, height: 12, color: '#fde68a' },
    // Final gauntlet
    { x: 360, y: 80, width: 25, height: 10, color: '#c084fc' },
    { x: 420, y: 40, width: 25, height: 10, color: '#ec4899' },
    // Victory platform
    { x: 480, y: 10, width: 80, height: 30, color: '#4a5568' }
  ],
  goal: { x: 510, y: -50 }
}

export default level5