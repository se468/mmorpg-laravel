STATE = require('./state')
Character = require('./character')

class Monster extends Character {
    constructor() {
        super()
        this.target = null
        this.resting = 0
        this.attackspeed = 30
        this.delay = 0
        this.hp = 5
    }

    setState(state) {
        super.setState(state)
    }

    update() {
        super.update()
        this.roam()
        
        if(this.state == STATE.DEAD)
            return
        if (this.state == STATE.IDLE)
            this.resting++
        if (this.state == STATE.IN_COMBAT)
            this.combat()
    }

    combat () {
        if (this.attackspeed > this.delay) {
            this.delay++
            return
        }
        if (this.isNextToPosition(this.target.position.x, this.target.position.y)) {
            this.delay = 0
            this.lookAtDirection(this.target.position.x, this.target.position.y)
            this.attack()
        }
        else {
            if (this.target.position.x < this.position.x) this.move('W')
            if (this.target.position.x > this.position.x) this.move('E')
            if (this.target.position.y < this.position.y) this.move('N')
            if (this.target.position.y > this.position.y) this.move('S')
            this.setState(STATE.IN_COMBAT)
        }
    }

    updateStateAfterAnimation(){
        if (this.state == STATE.ATTACKING || this.state == STATE.IN_COMBAT)
            this.setState(STATE.IN_COMBAT)
        else if (this.state == STATE.DYING || this.state == STATE.DEAD)
            this.setState(STATE.DEAD)
        else
            this.setState(STATE.IDLE)
    }

    takeDamage(attacker) {
        super.takeDamage(attacker)
        this.target = attacker
        this.rest = 0
    }

    roam () {
        if (this.animating) 
            return
        if (this.resting >= 100 && this.state == STATE.IDLE)
        {
            let dir = Math.floor(Math.random() * 4)
            if (dir == 0) this.move('N')
            if (dir == 1) this.move('S')
            if (dir == 2) this.move('E')
            if (dir == 3) this.move('W')
            this.resting = 0
        }
    }
}
module.exports = Monster