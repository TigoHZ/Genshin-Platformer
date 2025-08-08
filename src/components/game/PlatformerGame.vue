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
          <p>{{ selectedCharacter.vision }} • {{ selectedCharacter.weapon }}</p>
        </div>
      </div>
      
      <div class="controls-info">
        <p><strong>Controls:</strong></p>
        <p>WASD or Arrow Keys to move • Space to jump</p>
        <p v-if="selectedCharacter.vision" class="vision-abilities">
          <strong>{{ selectedCharacter.vision }} Abilities:</strong> {{ getVisionAbilities() }}
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
        width: 40,
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
      
      // Levels - Redesigned to be more traditional platformer levels
      levels: [
        // Level 1 - Tutorial Plains (Easy introduction with basic jumps)
        {
          name: "Tutorial Plains",
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
        },
        
        // Level 2 - Leaping Ledges (Medium difficulty with longer jumps)
        {
          name: "Leaping Ledges", 
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
        },
        
        // Level 3 - Narrow Passages (Precision platforming)
        {
          name: "Narrow Passages",
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
        },
        
        // Level 4 - Floating Fortress (Complex multi-path platforming)
        {
          name: "Floating Fortress",
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
        },
        
        // Level 5 - Sky Sanctuary (Expert level with extreme precision)
        {
          name: "Sky Sanctuary",
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
      ]
    }
  },
  
  computed: {
    isLastLevel() {
      return this.currentLevel >= this.levels.length - 1
    },
    
    currentVision() {
      return this.selectedCharacter.vision?.toLowerCase() || null
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
      this.setupVisionAbilities()
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
    
    setupVisionAbilities() {
      const vision = this.currentVision
      
      // Reset player abilities
      this.player.speed = 5
      this.player.jumpPower = 15
      this.player.canDoubleJump = false
      
      // Apply vision-specific abilities
      switch(vision) {
        case 'anemo':
          this.player.jumpPower = 30 // Double jump height
          break
        case 'pyro':
          this.player.speed = 6.5 // 1.3x speed
          break
        case 'hydro':
          this.player.canDoubleJump = true
          break
        case 'cryo':
          this.player.speed = 6 // Faster speed
          this.player.canDoubleJump = true
          break
        // Dendro and Geo abilities are handled in input/update methods
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
      this.handleVisionAbilities()
      this.checkCollisions()
      this.updateCamera()
      this.checkGameOver()
      this.updateEffects(deltaTime)
    },
    
    updatePlayer() {
      // Cryo sliding effect
      const frictionMultiplier = this.currentVision === 'cryo' ? 0.95 : this.friction
      
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
        // Double jump for Hydro and Cryo
        else if (this.player.canDoubleJump && !this.player.hasDoubleJumped) {
          this.player.velocityY = -this.player.jumpPower * 0.8
          this.player.hasDoubleJumped = true
        }
      }
      
      // Reset double jump when on ground
      if (this.player.onGround) {
        this.player.hasDoubleJumped = false
      }
      
      // Pyro trail effect
      if (this.currentVision === 'pyro' && (this.keys.left || this.keys.right)) {
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
    
    handleVisionAbilities() {
      // Dendro teleport ability
      if (this.currentVision === 'dendro' && this.keys.e && this.player.teleportCooldown === 0) {
        this.teleportPlayer()
        this.player.teleportCooldown = 60 // 1 second cooldown at 60fps
      }
      
      // Geo box creation
      if (this.currentVision === 'geo' && this.keys.e && !this.player.geoBoxUsed) {
        this.createGeoBox()
        this.player.geoBoxUsed = true
      }
    },
    
    teleportPlayer() {
      const teleportDistance = 100
      let newX = this.player.x
      let newY = this.player.y
      
      // Determine direction based on movement keys
      if (this.keys.left && this.keys.up) {
        newX -= teleportDistance * 0.7
        newY -= teleportDistance * 0.7
      } else if (this.keys.right && this.keys.up) {
        newX += teleportDistance * 0.7
        newY -= teleportDistance * 0.7
      } else if (this.keys.left && this.keys.down) {
        newX -= teleportDistance * 0.7
        newY += teleportDistance * 0.7
      } else if (this.keys.right && this.keys.down) {
        newX += teleportDistance * 0.7
        newY += teleportDistance * 0.7
      } else if (this.keys.left) {
        newX -= teleportDistance
      } else if (this.keys.right) {
        newX += teleportDistance
      } else if (this.keys.up) {
        newY -= teleportDistance
      } else if (this.keys.down) {
        newY += teleportDistance
      } else {
        // Default to facing direction
        newX += teleportDistance * this.player.direction
      }
      
      // Check if teleport destination is valid (not inside a platform)
      const teleportRect = {
        x: newX,
        y: newY,
        width: this.player.width,
        height: this.player.height
      }
      
      let canTeleport = true
      for (const platform of [...this.platforms, ...this.geoBoxes]) {
        if (this.isColliding(teleportRect, platform)) {
          canTeleport = false
          break
        }
      }
      
      if (canTeleport) {
        this.player.x = newX
        this.player.y = newY
        this.player.velocityX *= 0.5
        this.player.velocityY *= 0.5
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
      // Draw Pyro trail
      if (this.currentVision === 'pyro') {
        for (const particle of this.player.trail) {
          const alpha = particle.life / particle.maxLife
          this.ctx.fillStyle = `rgba(255, 69, 0, ${alpha * 0.8})`
          const size = 6 * alpha
          this.ctx.fillRect(particle.x - size/2, particle.y - size/2, size, size)
        }
      }
      
      // Draw teleport cooldown indicator for Dendro
      if (this.currentVision === 'dendro' && this.player.teleportCooldown > 0) {
        const cooldownPercent = this.player.teleportCooldown / 60
        this.ctx.fillStyle = `rgba(34, 139, 34, ${cooldownPercent})`
        this.ctx.fillRect(this.player.x, this.player.y - 10, this.player.width * (1 - cooldownPercent), 4)
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
        // Draw character image
        this.ctx.drawImage(
          this.player.image,
          this.player.x,
          this.player.y,
          this.player.width,
          this.player.height
        )
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
      this.setupVisionAbilities()
      this.startGameLoop()
    },
    
    nextLevel() {
      if (!this.isLastLevel) {
        this.loadLevel(this.currentLevel + 1)
        this.setupVisionAbilities()
        this.startGameLoop()
      }
    },
    
    getVisionAbilities() {
      switch(this.currentVision) {
        case 'anemo': return 'Double jump height'
        case 'pyro': return '1.3x speed + fire trail'
        case 'dendro': return 'Press E to teleport'
        case 'hydro': return 'Double jump'
        case 'geo': return 'Press E to create box (once per level)'
        case 'cryo': return 'Sliding movement + double jump + faster speed'
        default: return 'No special abilities'
      }
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

.vision-abilities {
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