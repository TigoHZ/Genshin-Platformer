export const venti = {
  id: 'venti',
  name: 'Venti',
  title: 'Windborne Bard',
  power: 'Wind Mastery',
  powerDescription: 'Creates powerful updrafts and wind currents to navigate the battlefield. Press E while on solid ground to generate an updraft that lifts you into the air, then glide in any direction you choose with graceful wind control.',
  origin: 'Mondstadt',
  description: 'A bard that seems to have arrived on some unknown wind — sometimes sings songs as old as the hills.',
  portraitImage: '/images/characters/venti/portrait.png',
  iconImage: '/images/characters/venti/icon.webp',
  sideIconImage: '/images/characters/venti/side-icon.png',
  wishImage: '/images/characters/venti/wish.jpg',
  
  // Power-specific abilities
  abilities: {
    jumpPower: 15, // Normal jump power
    speed: 5, // Base speed
    canDoubleJump: false,
    specialAbility: 'Press E to create updraft and glide',
    specialKey: 'E', // Updraft/glide ability
    updraftHeight: 180, // How high the updraft lifts
    glideSpeed: 3, // Horizontal gliding speed
    trailColor: 'rgba(0, 255, 127, 0.6)', // Wind trail color
    cooldownColor: 'rgba(0, 255, 127, 1)' // Cooldown indicator color
  },
  
  // Power implementation methods
  setupAbilities(player) {
    player.speed = this.abilities.speed
    player.jumpPower = this.abilities.jumpPower
    player.canDoubleJump = this.abilities.canDoubleJump
  },
  
  handleSpecialAbility(keys, player, platformsAndBoxes) {
    // Initialize cooldown if not set
    if (player.teleportCooldown === undefined) {
      player.teleportCooldown = 0
    }
    
    // Updraft ability - can only be activated on solid ground
    if (keys.e && player.teleportCooldown === 0 && player.onGround) {
      console.log('🌬️ Venti activating Wind Updraft ability!')
      // Initialize updraft state
      player.isUpdrafting = true
      player.updraftProgress = 0
      player.maxUpdraftHeight = player.y - this.abilities.updraftHeight
      player.updraftStartY = player.y
      player.updraftStartX = player.x // Store starting X position
      player.velocityY = 0 // Stop current vertical movement
      player.velocityX = 0 // Stop current horizontal movement
      player.teleportCooldown = 600 // 10 second cooldown at 60fps
      
      // Initialize tornado particles
      player.tornadoParticles = []
      this.generateTornadoParticles(player)
      
      return true
    }
    
    // Handle updraft movement
    if (player.isUpdrafting) {      
      // Rising phase
      if (player.updraftProgress < 1) {
        player.updraftProgress += 0.012 // Smooth rise over ~2.8 seconds (slightly slower for higher height)
        const easedProgress = this.easeOutCubic(player.updraftProgress)
        
        // Allow horizontal movement control when 70% through the updraft
        if (player.updraftProgress >= 0.7) {
          // Horizontal movement during late updraft phase
          if (keys.left) {
            player.velocityX = -this.abilities.glideSpeed * 0.8 // Slightly slower than full glide speed
          } else if (keys.right) {
            player.velocityX = this.abilities.glideSpeed * 0.8
          } else {
            player.velocityX *= 0.9 // Gradual slowdown if no input
          }
          
          // Update X position based on velocity
          player.x += player.velocityX
        } else {
          // Keep player at exact same X position during early updraft
          player.x = player.updraftStartX
          player.velocityX = 0 // No horizontal movement during early updraft
        }
        
        const targetY = player.updraftStartY - (this.abilities.updraftHeight * easedProgress)
        
        // Check for platform collisions during updraft
        const testRect = {
          x: player.x,
          y: targetY,
          width: player.width,
          height: player.height
        }
        
        let canMoveToY = true
        if (platformsAndBoxes) {
          for (const platform of platformsAndBoxes) {
            if (this.isColliding(testRect, platform)) {
              // Hit a platform above, stop the updraft here
              canMoveToY = false
              player.updraftProgress = 1 // End updraft phase
              player.isGliding = true
              player.glideTime = 0
              console.log('🌬️ Venti hit platform during updraft, transitioning to glide')
              break
            }
          }
        }
        
        if (canMoveToY) {
          player.y = targetY
        }
        player.velocityY = -2 // Gentle upward velocity during updraft
        
        // Update tornado particles during updraft
        this.updateTornadoParticles(player)
        
        // Transition to gliding phase
        if (player.updraftProgress >= 1) {
          player.isGliding = true
          player.glideTime = 0
          console.log('🌬️ Venti transitioned to gliding phase')
        }
      }
      
      // Gliding phase
      if (player.isGliding) {
        player.glideTime++
        
        // Horizontal movement during glide
        if (keys.left) {
          player.velocityX = -this.abilities.glideSpeed
        } else if (keys.right) {
          player.velocityX = this.abilities.glideSpeed
        } else {
          player.velocityX *= 0.9 // Gradual slowdown if no input
        }
        
        // Very gentle downward movement
        player.velocityY = 0.5 // Very slow fall while gliding
        
        // End gliding after 4 seconds or if player presses down
        if (player.glideTime > 240 || keys.down || player.onGround) {
          this.endWindAbility(player)
        }
      }
      
      return true
    }
    
    return false
  },
  
  // Helper function for smooth easing animation
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  },
  
  // End the wind ability and restore normal physics
  endWindAbility(player) {
    player.isUpdrafting = false
    player.isGliding = false
    player.updraftProgress = 0
    player.glideTime = 0
    player.tornadoParticles = [] // Clean up tornado particles
  },
  
  shouldShowTrail(keys, player) {
    // Show wind trail during updraft and gliding
    return player && (player.isUpdrafting || player.isGliding)
  },
  
  getTrailColor(alpha) {
    return `rgba(0, 255, 127, ${alpha * 0.6})`
  },
  
  getCooldownColor(cooldownPercent) {
    return `rgba(0, 255, 127, ${cooldownPercent})`
  },
  
  // Collision detection helper
  isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y
  },
  
  // Generate tornado particle effects
  generateTornadoParticles(player) {
    player.tornadoParticles = []
    const particleCount = 25
    const baseRadius = 35
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = baseRadius + Math.random() * 15
      const height = Math.random() * this.abilities.updraftHeight
      
      player.tornadoParticles.push({
        angle: angle,
        radius: radius,
        baseRadius: radius,
        height: height,
        speed: 0.15 + Math.random() * 0.1,
        size: 2 + Math.random() * 3,
        life: 1,
        maxLife: 1
      })
    }
  },
  
  // Update tornado particles
  updateTornadoParticles(player) {
    if (!player.tornadoParticles) return
    
    const centerX = player.updraftStartX + player.width / 2
    const centerY = player.updraftStartY + player.height
    
    for (const particle of player.tornadoParticles) {
      // Rotate around center
      particle.angle += particle.speed
      
      // Vary radius for tornado effect
      const radiusVariation = Math.sin(particle.angle * 3) * 5
      particle.radius = particle.baseRadius + radiusVariation
      
      // Move particles upward during updraft
      particle.height += 2.5
      
      // Reset particles that go too high
      if (particle.height > this.abilities.updraftHeight + 50) {
        particle.height = -20
        particle.angle = Math.random() * Math.PI * 2
      }
      
      // Calculate position
      particle.x = centerX + Math.cos(particle.angle) * particle.radius
      particle.y = centerY - particle.height
    }
  },
  
  // Get tornado particles for rendering
  getTornadoParticles(player) {
    return player.tornadoParticles || []
  }
}

export default venti