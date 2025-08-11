export const arlecchino = {
  id: 'arlecchino',
  name: 'Arlecchino',
  title: 'The Knave',
  power: 'Crimson Moon',
  origin: "Khaenri'ah",
  description: 'Mama',
  portraitImage: '/images/characters/arlecchino/portrait.png',
  iconImage: '/images/characters/arlecchino/icon.png',
  sideIconImage: '/images/characters/arlecchino/side-icon.png',
  wishImage: '/images/characters/arlecchino/wish.png',
  
  // Power-specific abilities
  abilities: {
    jumpPower: 15, // Base jump power
    speed: 6.5, // Enhanced speed
    canDoubleJump: true, // Shadow dash ability
    specialAbility: '1.3x speed + shadow trail + Press E to shadow dash',
    specialKey: 'E', // Shadow dash key
    trailColor: 'rgba(139, 0, 0, 0.8)', // Crimson trail color
    cooldownColor: 'rgba(139, 0, 0, 1)' // Cooldown indicator color
  },
  
  // Power implementation methods
  setupAbilities(player) {
    player.speed = this.abilities.speed
    player.jumpPower = this.abilities.jumpPower
    player.canDoubleJump = this.abilities.canDoubleJump
  },
  
  handleSpecialAbility(keys, player, platformsAndBoxes) {
    // Shadow dash ability
    if (keys.e && player.teleportCooldown === 0) {
      const newPos = this.shadowDash(keys, player)
      
      // Check collision at new position
      const teleportRect = {
        x: newPos.x,
        y: newPos.y,
        width: player.width,
        height: player.height
      }
      
      let canTeleport = true
      if (platformsAndBoxes) {
        for (const platform of platformsAndBoxes) {
          if (this.isColliding(teleportRect, platform)) {
            canTeleport = false
            break
          }
        }
      }
      
      if (canTeleport) {
        player.x = newPos.x
        player.y = newPos.y
        player.velocityX *= 0.5
        player.velocityY *= 0.5
      }
      
      player.teleportCooldown = 60 // 1 second cooldown at 60fps
      return true
    }
    return false
  },
  
  shouldShowTrail(keys) {
    // Show trail when moving
    return keys.left || keys.right
  },
  
  getTrailColor(alpha) {
    return `rgba(139, 0, 0, ${alpha * 0.8})`
  },
  
  getCooldownColor(cooldownPercent) {
    return `rgba(139, 0, 0, ${cooldownPercent})`
  },
  
  // Shadow dash implementation
  shadowDash(keys, player) {
    const teleportDistance = 100
    let newX = player.x
    let newY = player.y
    
    // Determine direction based on movement keys
    if (keys.left && keys.up) {
      newX -= teleportDistance * 0.7
      newY -= teleportDistance * 0.7
    } else if (keys.right && keys.up) {
      newX += teleportDistance * 0.7
      newY -= teleportDistance * 0.7
    } else if (keys.left && keys.down) {
      newX -= teleportDistance * 0.7
      newY += teleportDistance * 0.7
    } else if (keys.right && keys.down) {
      newX += teleportDistance * 0.7
      newY += teleportDistance * 0.7
    } else if (keys.left) {
      newX -= teleportDistance
    } else if (keys.right) {
      newX += teleportDistance
    } else if (keys.up) {
      newY -= teleportDistance
    } else if (keys.down) {
      newY += teleportDistance
    } else {
      // Default to facing direction
      newX += teleportDistance * player.direction
    }
    
    return { x: newX, y: newY }
  },
  
  // Collision detection helper
  isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y
  }
}

export default arlecchino