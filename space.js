class Space {
    constructor({position, color}) {
        this.position = position
        this.color = color
    }

    updateColor(color, draw) {
        this.color = color
        if(draw) {
            this.draw()
        }
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x * spacing.x + 25, this.position.y * spacing.y + 25, 75, 75)
    }
}

const spacing = {
    x: 100,
    y: 100
}