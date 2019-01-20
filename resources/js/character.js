STATE = require('./state')
class Character {
    constructor () {
        this.image = new Image()
        this.gridSize = {w: 0,h: 0}
        this.direction = 'S'
        
        this.position = {x: 0,y: 0}
        this.prevPosition = {x: 0,y: 0}
        
        this.map = null
        this.mapTileSize = {w: 1, h: 1}

        this.equipments = {
            'hair': new Image(),
            'feet': new Image(),
            'legs': new Image(),
            'torso': new Image(),
            'lefthand': new Image(),
            'righthand': new Image(),
        }

        this.hp = 10
        this.sp = 10

        /** Animtations */
        this.animating = false
        this.motion = 0
        this.frames = 8
        this.state = STATE.IDLE

        this.gotAttacked = false
        this.damageAnim = 0
    }
    
    move (dir) {
        if (this.animating || this.state == STATE.DEAD) 
            return

        this.setDirection(dir)

        if (dir == 'N' && this.map.checkWalkable(this.position.x, this.position.y - 1)) 
            this.position.y -= 1;
        if (dir == 'S' && this.map.checkWalkable(this.position.x, this.position.y + 1))
            this.position.y += 1;
        if (dir == 'E' && this.map.checkWalkable(this.position.x + 1, this.position.y))
            this.position.x += 1;
        if (dir == 'W' && this.map.checkWalkable(this.position.x - 1, this.position.y))
            this.position.x -= 1;
        
        this.setState(STATE.MOVING)
    }

    attack () {
        if (this.animating || this.state == STATE.DEAD)
            return

        this.setState(STATE.ATTACKING)

        let x = this.position.x
        if (this.direction == "W") x = x - 1
        if (this.direction == "E") x = x + 1
        let y = this.position.y
        if (this.direction == "N") y = y - 1
        if (this.direction == "S") y = y + 1
        
        this.map.attack(x,y,this)
    }

    setState(state) {
        this.state = state
        this.motion = 0
        if(state == STATE.IDLE) {
            this.animating = false
        }
        if(state == STATE.MOVING) {
            this.animating = true
            this.frames = 8
        }
        if(state == STATE.ATTACKING) {
            this.animating = true
            this.frames = 7
        }
        if(state == STATE.DYING) {
            this.animating = true
            this.frames = 5
        }
    }

    takeDamage(attacker) {
        if(this.state == STATE.DEAD) return;

        this.lookAtDirection(attacker.position.x, attacker.position.y)
        this.hp--

        this.gotAttacked = true
        this.damageAnim  = 0
        this.state = STATE.IN_COMBAT
        if(this.hp <= 0) this.die()
    }

    setImage(src) {
        this.image.src = src
    }

    setGridSize(w, h) {
        this.gridSize.w = w
        this.gridSize.h = h
    }

    setMap (map) {
        this.map = map
    }
    
    lookAtDirection(x,y) {
        if (x < this.position.x) this.setDirection("W")
        if (x > this.position.x) this.setDirection("E")
        if (y < this.position.y) this.setDirection("N")
        if (y > this.position.y) this.setDirection("S")
    }

    setDirection(dir) {
        this.direction = dir
    } 

    isNextToPosition(x,y) {
        if (Math.abs(this.position.x - x) == 1 && Math.abs(this.position.y - y) == 0 || 
            Math.abs(this.position.x - x) == 0 && Math.abs(this.position.y - y) == 1)
            return true
        
        return false
    }

    setPosition(x , y) {
        this.position.x = x
        this.position.y = y
        this.prevPosition.x = x
        this.prevPosition.y = y
    }

    die() {
        this.setState(STATE.DYING)
        // dispatch character dead event
    }

    update() {
        if (this.animating) this.updateAnimation()
        if (this.gotAttacked) {
            this.damageAnim ++
            if(this.damageAnim > 7) {
                this.damageAnim = 0
                this.gotAttacked = false
            }
        }
    }

    updateAnimation ( ) {
        this.motion += 1
        if (this.motion > this.frames * 2) {
            this.motion = 0
            this.prevPosition.x = this.position.x
            this.prevPosition.y = this.position.y
            this.animating = false

            this.updateStateAfterAnimation()
        }
    }

    updateStateAfterAnimation () {
        if (this.state == STATE.DYING || this.state == STATE.DEAD)
            this.setState(STATE.DEAD)
        else
            this.setState(STATE.IDLE)
    }
}

module.exports = Character;