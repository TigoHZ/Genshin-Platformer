<template>
  <div class="platformer-game" ref="gameContainer">
    <div class="game-info">
      <div class="character-info">
        <img 
          :src="selectedCharacter.iconImage" 
          :alt="selectedCharacter.name"
          class="character-avatar"
          @error="handleImageError"
        >
        <div>
          <h3>{{ selectedCharacter.name }}</h3>
          <p>{{ selectedCharacter.power }} • {{ selectedCharacter.origin }}</p>
        </div>
      </div>
      
      <div class="controls-info">
        <p><strong>Controls:</strong></p>
        <p>WASD or Arrow Keys to move • Space to jump</p>
        <p v-if="selectedCharacter.power" class="power-abilities">
          <strong>{{ selectedCharacter.power }} Abilities:</strong> {{ getPowerAbilities() }}
        </p>
      </div>
      
      <div class="game-stats">
        <p>Level: {{ currentLevel + 1 }}/{{ levels.length }}</p>
        <p>Position: {{ Math.round(player.x) }}, {{ Math.round(player.y) }}</p>
        <p>Velocity: {{ Math.round(player.velocityX * 10) / 10 }}</p>
      </div>
    </div>
    
    <canvas 
      ref="gameCanvas"
      class="game-canvas"
      :width="gameWidth"
      :height="gameHeight"
    ></canvas>
    
    <div v-if="gameOver" class="game-over-overlay">
      <div class="game-over-content" :class="{ 'victory': goal.reached }">
        <h2 v-if="goal.reached">🎉 Victory!</h2>
        <h2 v-else>💀 Game Over!</h2>
        
        <p v-if="goal.reached">
          {{ selectedCharacter.name }} reached the goal!<br>
          <span class="victory-text">{{ isLastLevel ? 'All Levels Complete! 🎉' : 'Level Complete! 🏆' }}</span>
        </p>
        <p v-else>
          {{ selectedCharacter.name }} fell into the void!<br>
          <span class="defeat-text">Try again! 💪</span>
        </p>
        
        <div class="game-over-buttons">
          <button class="btn btn-primary" @click="restartGame">
            {{ goal.reached ? 'Play Again' : 'Try Again' }}
          </button>
          <button v-if="goal.reached && !isLastLevel" class="btn btn-secondary" @click="nextLevel">
            Next Level ➡️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '../../levels/index.js'

export default {
  name: 'PlatformerGame',
  
  props: {
    selectedCharacter: {
      type: Object,
      required: true
    },
    selectedLevel: {
      type: Object,
      required: true
    }
  },
  
  emits: ['game-over'],
  
  data() {
    return {
      // Game dimensions
      gameWidth: 1000,
      gameHeight: 600,
      
      // Game state
      gameRunning: false,
      gameOver: false,
      currentLevel: 0,
      
      // Player object
      player: {
        x: 100,
        y: 400,
        width: 60,
        height: 60,
        velocityX: 0,
        velocityY: 0,
        speed: 5,
        jumpPower: 15,
        onGround: false,
        image: null,
        direction: 1, // 1 for right, -1 for left
        canDoubleJump: false,
        hasDoubleJumped: false,
        teleportCooldown: 0,
        geoBoxUsed: false,
        trail: []
      },
      
      // Game physics
      gravity: 0.8,
      friction: 0.85,
      
      // Game objects (will be set based on current level)
      platforms: [],
      geoBoxes: [],
      
      // Goal/Finish line
      goal: {
        x: 0,
        y: 0,
        width: 60,
        height: 70,
        reached: false
      },
      
      // Input handling
      keys: {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false,
        e: false
      },
      
      // Animation
      animationId: null,
      lastTime: 0,
      
      // Camera
      camera: {
        x: 0,
        y: 0
      },
      
      // Levels - Imported from levels folder
      levels
    }
  },
  
  computed: {
    isLastLevel() {
      return this.currentLevel >= this.levels.length - 1
    },
    
    currentPower() {
      return this.selectedCharacter.power?.toLowerCase().replace(' ', '_') || null
    }
  },
  
  mounted() {
    this.initGame()
  },
  
  beforeUnmount() {
    this.cleanup()
  },
  
  methods: {
    initGame() {
      const levelIndex = (this.selectedLevel?.id || 1) - 1
      this.loadLevel(levelIndex)
      this.setupCanvas()
      this.setupEventListeners()
      this.loadPlayerImage()
      this.setupPowerAbilities()
      this.startGameLoop()
    },
    
    loadLevel(levelIndex) {
      if (levelIndex >= 0 && levelIndex < this.levels.length) {
        this.currentLevel = levelIndex
        const level = this.levels[levelIndex]
        
        // Set platforms
        this.platforms = [...level.platforms]
        
        // Reset geo boxes
        this.geoBoxes = []
        
        // Set player start position
        this.player.x = level.startX
        this.player.y = level.startY
        this.player.velocityX = 0
        this.player.velocityY = 0
        this.player.onGround = false
        this.player.hasDoubleJumped = false
        this.player.geoBoxUsed = false
        
        // Set goal position
        this.goal.x = level.goal.x
        this.goal.y = level.goal.y
        this.goal.reached = false
        
        // Reset camera
        this.camera.x = 0
        this.camera.y = 0
        
        console.log(`Loaded level ${levelIndex + 1}: ${level.name}`)
      }
    },
    
    setupPowerAbilities() {
      if (this.selectedCharacter.setupAbilities) {
        // Use character's own setup method
        this.selectedCharacter.setupAbilities(this.player)
      } else {
        // Fallback to defaults if no setup method
        this.player.speed = 5
        this.player.jumpPower = 15
        this.player.canDoubleJump = false
      }
    },
    
    setupCanvas() {
      const canvas = this.$refs.gameCanvas
      this.ctx = canvas.getContext('2d')
      this.ctx.imageSmoothingEnabled = false // Pixel-perfect rendering
    },
    
    setupEventListeners() {
      document.addEventListener('keydown', this.handleKeyDown)
      document.addEventListener('keyup', this.handleKeyUp)
      window.addEventListener('resize', this.handleResize)
    },
    
    loadPlayerImage() {
      const img = new Image()
      img.onload = () => {
        this.player.image = img
      }
      img.onerror = () => {
        console.log('Failed to load character image, using fallback')
        this.player.image = null
      }
      img.src = this.selectedCharacter.iconImage
    },
    
    handleKeyDown(event) {
      switch(event.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true
          break
        case 'KeyW':
        case 'ArrowUp':
          this.keys.up = true
          break
        case 'KeyS':
        case 'ArrowDown':
          this.keys.down = true
          break
        case 'Space':
          event.preventDefault()
          this.keys.space = true
          break
        case 'KeyE':
          this.keys.e = true
          event.preventDefault()
          break
      }
    },
    
    handleKeyUp(event) {
      switch(event.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false
          break
        case 'KeyW':
        case 'ArrowUp':
          this.keys.up = false
          break
        case 'KeyS':
        case 'ArrowDown':
          this.keys.down = false
          break
        case 'Space':
          this.keys.space = false
          break
        case 'KeyE':
          this.keys.e = false
          break
      }
    },
    
    handleResize() {
      // Update canvas size if needed
      this.gameWidth = Math.min(1000, window.innerWidth - 40)
    },
    
    startGameLoop() {
      this.gameRunning = true
      this.gameOver = false
      this.animate()
    },
    
    animate(currentTime = 0) {
      if (!this.gameRunning) return
      
      const deltaTime = currentTime - this.lastTime
      this.lastTime = currentTime
      
      this.update(deltaTime)
      this.render()
      
      this.animationId = requestAnimationFrame(this.animate)
    },
    
    update(deltaTime) {
      this.updatePlayer()
      this.handlePowerAbilities()
      this.checkCollisions()
      this.updateCamera()
      this.checkGameOver()
      this.updateEffects(deltaTime)
    },
    
    updatePlayer() {
      const frictionMultiplier = this.friction
      
      // Horizontal movement
      if (this.keys.left) {
        this.player.velocityX -= this.player.speed * 0.3
        this.player.direction = -1
      }
      if (this.keys.right) {
        this.player.velocityX += this.player.speed * 0.3
        this.player.direction = 1
      }
      
      // Jumping logic
      if ((this.keys.up || this.keys.space)) {
        // Regular jump
        if (this.player.onGround) {
          this.player.velocityY = -this.player.jumpPower
          this.player.onGround = false
          this.player.hasDoubleJumped = false
        }
        // Double jump for Crimson Moon
        else if (this.player.canDoubleJump && !this.player.hasDoubleJumped) {
          this.player.velocityY = -this.player.jumpPower * 0.8
          this.player.hasDoubleJumped = true
        }
      }
      
      // Reset double jump when on ground
      if (this.player.onGround) {
        this.player.hasDoubleJumped = false
      }
      
      // Trail effect using character's method
      if (this.selectedCharacter.shouldShowTrail && this.selectedCharacter.shouldShowTrail(this.keys)) {
        this.addTrailParticle()
      }
      
      // Apply friction
      this.player.velocityX *= frictionMultiplier
      
      // Apply gravity
      this.player.velocityY += this.gravity
      
      // Limit velocities
      this.player.velocityX = Math.max(-this.player.speed * 2, Math.min(this.player.speed * 2, this.player.velocityX))
      this.player.velocityY = Math.max(-20, Math.min(20, this.player.velocityY))
      
      // Update position
      this.player.x += this.player.velocityX
      this.player.y += this.player.velocityY
      
      // Update cooldowns
      if (this.player.teleportCooldown > 0) {
        this.player.teleportCooldown--
      }
    },
    
    handlePowerAbilities() {
      // Use character's own special ability handler
      if (this.selectedCharacter.handleSpecialAbility) {
        const platformsAndBoxes = [...this.platforms, ...this.geoBoxes]
        this.selectedCharacter.handleSpecialAbility(this.keys, this.player, platformsAndBoxes)
      }
    },
    
    
    createGeoBox() {
      const boxSize = 40
      const boxX = this.player.x + (this.player.direction > 0 ? this.player.width + 10 : -boxSize - 10)
      const boxY = this.player.y + this.player.height - boxSize
      
      const geoBox = {
        x: boxX,
        y: boxY,
        width: boxSize,
        height: boxSize,
        color: '#ffd700'
      }
      
      this.geoBoxes.push(geoBox)
    },
    
    addTrailParticle() {
      if (this.player.trail.length > 10) {
        this.player.trail.shift()
      }
      
      this.player.trail.push({
        x: this.player.x + this.player.width / 2,
        y: this.player.y + this.player.height / 2,
        life: 20,
        maxLife: 20
      })
    },
    
    updateEffects(deltaTime) {
      // Update trail particles
      for (let i = this.player.trail.length - 1; i >= 0; i--) {
        const particle = this.player.trail[i]
        particle.life--
        if (particle.life <= 0) {
          this.player.trail.splice(i, 1)
        }
      }
    },
    
    checkCollisions() {
      this.player.onGround = false
      
      // Platform and geo box collisions
      for (const platform of [...this.platforms, ...this.geoBoxes]) {
        if (this.isColliding(this.player, platform)) {
          // Top collision (landing on platform)
          if (this.player.velocityY > 0 && this.player.y < platform.y) {
            this.player.y = platform.y - this.player.height
            this.player.velocityY = 0
            this.player.onGround = true
          }
          // Bottom collision (hitting platform from below)
          else if (this.player.velocityY < 0 && this.player.y > platform.y) {
            this.player.y = platform.y + platform.height
            this.player.velocityY = 0
          }
          // Side collisions
          else if (this.player.velocityX > 0) {
            this.player.x = platform.x - this.player.width
            this.player.velocityX = 0
          }
          else if (this.player.velocityX < 0) {
            this.player.x = platform.x + platform.width
            this.player.velocityX = 0
          }
        }
      }
      
      // Goal collision (win condition)
      if (!this.goal.reached && this.isColliding(this.player, this.goal)) {
        this.goal.reached = true
        this.winGame()
      }
    },
    
    isColliding(rect1, rect2) {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y
    },
    
    updateCamera() {
      // Simple camera follow
      this.camera.x = this.player.x - this.gameWidth / 2
      this.camera.y = this.player.y - this.gameHeight / 2
      
      // Clamp camera to reasonable bounds
      this.camera.x = Math.max(-200, Math.min(1200, this.camera.x))
      this.camera.y = Math.max(-100, Math.min(300, this.camera.y))
    },
    
    checkGameOver() {
      // Player fell below the screen
      if (this.player.y > this.gameHeight + 100) {
        this.endGame()
      }
    },
    
    render() {
      // Clear canvas
      this.ctx.fillStyle = '#2c3e50'
      this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)
      
      // Save context for camera transformation
      this.ctx.save()
      this.ctx.translate(-this.camera.x, -this.camera.y)
      
      // Draw background elements
      this.drawBackground()
      
      // Draw platforms
      this.drawPlatforms()
      
      // Draw geo boxes
      this.drawGeoBoxes()
      
      // Draw effects
      this.drawEffects()
      
      // Draw goal
      this.drawGoal()
      
      // Draw player
      this.drawPlayer()
      
      // Restore context
      this.ctx.restore()
    },
    
    drawBackground() {
      // Simple gradient background
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.gameHeight)
      gradient.addColorStop(0, '#87CEEB')
      gradient.addColorStop(1, '#98FB98')
      
      this.ctx.fillStyle = gradient
      this.ctx.fillRect(
        this.camera.x - 100, 
        this.camera.y - 100, 
        this.gameWidth + 200, 
        this.gameHeight + 200
      )
    },
    
    drawPlatforms() {
      for (const platform of this.platforms) {
        this.ctx.fillStyle = platform.color
        this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
        
        // Add some detail to platforms
        this.ctx.strokeStyle = '#2d3748'
        this.ctx.lineWidth = 2
        this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height)
      }
    },
    
    drawGeoBoxes() {
      for (const box of this.geoBoxes) {
        this.ctx.fillStyle = box.color
        this.ctx.fillRect(box.x, box.y, box.width, box.height)
        
        // Add geo symbol
        this.ctx.fillStyle = '#8b5a2b'
        this.ctx.font = '20px Arial'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('♦', box.x + box.width/2, box.y + box.height/2 + 7)
        
        // Border
        this.ctx.strokeStyle = '#8b5a2b'
        this.ctx.lineWidth = 2
        this.ctx.strokeRect(box.x, box.y, box.width, box.height)
      }
    },
    
    drawEffects() {
      // Draw character trail
      if (this.selectedCharacter.getTrailColor) {
        for (const particle of this.player.trail) {
          const alpha = particle.life / particle.maxLife
          const trailColor = this.selectedCharacter.getTrailColor(alpha)
          if (trailColor) {
            this.ctx.fillStyle = trailColor
            const size = 6 * alpha
            this.ctx.fillRect(particle.x - size/2, particle.y - size/2, size, size)
          }
        }
      }
      
      // Draw special ability cooldown indicator
      if (this.selectedCharacter.getCooldownColor && this.player.teleportCooldown > 0) {
        const cooldownPercent = this.player.teleportCooldown / 60
        const cooldownColor = this.selectedCharacter.getCooldownColor(cooldownPercent)
        if (cooldownColor) {
          this.ctx.fillStyle = cooldownColor
          this.ctx.fillRect(this.player.x, this.player.y - 10, this.player.width * (1 - cooldownPercent), 4)
        }
      }
    },
    
    drawGoal() {
      // Animated goal flag
      const time = Date.now() / 1000
      const wave = Math.sin(time * 3) * 5
      
      // Flag pole
      this.ctx.fillStyle = '#8b5cf6'
      this.ctx.fillRect(this.goal.x + this.goal.width - 10, this.goal.y, 8, this.goal.height)
      
      // Flag
      const flagColor = this.goal.reached ? '#10b981' : '#f59e0b'
      this.ctx.fillStyle = flagColor
      this.ctx.fillRect(
        this.goal.x + this.goal.width - 50 + wave, 
        this.goal.y + 5, 
        40, 
        25
      )
      
      // Goal area
      this.ctx.fillStyle = this.goal.reached ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.2)'
      this.ctx.fillRect(this.goal.x, this.goal.y, this.goal.width, this.goal.height)
      
      // Goal text
      this.ctx.fillStyle = '#fff'
      this.ctx.font = '14px Arial'
      this.ctx.textAlign = 'center'
      this.ctx.fillText('GOAL', this.goal.x + this.goal.width / 2, this.goal.y - 10)
      
      // Victory sparkles if reached
      if (this.goal.reached) {
        for (let i = 0; i < 10; i++) {
          const sparkleX = this.goal.x + Math.random() * this.goal.width
          const sparkleY = this.goal.y + Math.random() * this.goal.height
          const sparkleSize = Math.random() * 3 + 1
          
          this.ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 70%)`
          this.ctx.fillRect(sparkleX, sparkleY, sparkleSize, sparkleSize)
        }
      }
    },
    
    drawPlayer() {
      this.ctx.save()
      
      // Flip sprite based on direction
      if (this.player.direction === -1) {
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.player.x * 2 - this.player.width, 0)
      }
      
      if (this.player.image) {
        // Enable smoothing for character images to prevent pixelation
        this.ctx.imageSmoothingEnabled = true
        this.ctx.imageSmoothingQuality = 'high'
        
        // Calculate aspect ratio and center the image
        const imgAspect = this.player.image.width / this.player.image.height
        const playerAspect = this.player.width / this.player.height
        
        let drawWidth = this.player.width
        let drawHeight = this.player.height
        let drawX = this.player.x
        let drawY = this.player.y
        
        // Maintain aspect ratio (similar to object-fit: cover)
        if (imgAspect > playerAspect) {
          // Image is wider than player box
          drawWidth = this.player.height * imgAspect
          drawX = this.player.x - (drawWidth - this.player.width) / 2
        } else {
          // Image is taller than player box
          drawHeight = this.player.width / imgAspect
          drawY = this.player.y - (drawHeight - this.player.height) / 2
        }
        
        // Draw character image with maintained aspect ratio
        this.ctx.drawImage(
          this.player.image,
          drawX,
          drawY,
          drawWidth,
          drawHeight
        )
        
        // Restore pixel-perfect rendering for other elements
        this.ctx.imageSmoothingEnabled = false
      } else {
        // Fallback rectangle if image fails to load
        this.ctx.fillStyle = '#ff6b6b'
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
        
        // Simple face
        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(this.player.x + 8, this.player.y + 8, 6, 6)
        this.ctx.fillRect(this.player.x + 26, this.player.y + 8, 6, 6)
        this.ctx.fillRect(this.player.x + 15, this.player.y + 25, 10, 4)
      }
      
      this.ctx.restore()
    },
    
    winGame() {
      this.gameRunning = false
      this.gameOver = true
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }
      this.$emit('game-over', { completed: true })
    },
    
    endGame() {
      this.gameRunning = false
      this.gameOver = true
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }
      this.$emit('game-over', { completed: false })
    },
    
    restartGame() {
      // Restart current level
      this.loadLevel(this.currentLevel)
      this.setupPowerAbilities()
      this.startGameLoop()
    },
    
    nextLevel() {
      if (!this.isLastLevel) {
        this.loadLevel(this.currentLevel + 1)
        this.setupPowerAbilities()
        this.startGameLoop()
      }
    },
    
    getPowerAbilities() {
      return this.selectedCharacter.abilities?.specialAbility || 'No special abilities'
    },
    
    handleImageError() {
      console.log('Failed to load character icon')
    },
    
    cleanup() {
      this.gameRunning = false
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
      }
      document.removeEventListener('keydown', this.handleKeyDown)
      document.removeEventListener('keyup', this.handleKeyUp)
      window.removeEventListener('resize', this.handleResize)
    }
  }
}
</script>

<style scoped>
.platformer-game {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #2c3e50;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.game-info {
  background: rgba(0, 0, 0, 0.8);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  flex-wrap: wrap;
  gap: 20px;
}

.character-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.character-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}

.character-info h3 {
  margin: 0;
  font-size: 1.1rem;
}

.character-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.controls-info p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.game-stats p {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
}

.game-canvas {
  background: #34495e;
  display: block;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-over-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.game-over-content h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #ff6b6b;
}

.game-over-content.victory h2 {
  color: #10b981;
}

.victory-text {
  color: #fbbf24;
  font-weight: bold;
  font-size: 1.1rem;
}

.defeat-text {
  color: #f87171;
  font-weight: bold;
}

.game-over-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.btn-secondary {
  background: linear-gradient(45deg, #48bb78, #38a169);
  color: white;
  margin-left: 10px;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
}

.game-over-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.power-abilities {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .game-info {
    flex-direction: column;
    text-align: center;
    padding: 10px 15px;
  }
  
  .character-info {
    flex-direction: column;
    gap: 5px;
  }
}
</style>