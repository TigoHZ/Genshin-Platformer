export const venti = {
  id: 'venti',
  name: 'Venti',
  title: 'Windborne Bard',
  power: 'Wind Mastery',
  origin: 'Mondstadt',
  description: 'A bard that seems to have arrived on some unknown wind — sometimes sings songs as old as the hills.',
  portraitImage: '/images/characters/venti/portrait.png',
  iconImage: '/images/characters/venti/icon.png',
  sideIconImage: '/images/characters/venti/side-icon.png',
  wishImage: '/images/characters/venti/wish.png',
  
  // Power-specific abilities
  abilities: {
    jumpPower: 30, // Enhanced jump height from wind mastery
    speed: 5, // Base speed
    canDoubleJump: false,
    specialAbility: 'Enhanced jump height with wind currents',
    specialKey: null // No special key ability
  },
  
  // Power implementation methods
  setupAbilities(player) {
    player.speed = this.abilities.speed
    player.jumpPower = this.abilities.jumpPower
    player.canDoubleJump = this.abilities.canDoubleJump
  },
  
  handleSpecialAbility(keys, player, platformsAndBoxes) {
    // Venti doesn't have a special key ability
    return false
  },
  
  shouldShowTrail(keys) {
    // Venti doesn't have a trail effect
    return false
  },
  
  getTrailColor(alpha) {
    // No trail for Venti
    return null
  },
  
  getCooldownColor(cooldownPercent) {
    // No cooldown indicator for Venti
    return null
  }
}

export default venti