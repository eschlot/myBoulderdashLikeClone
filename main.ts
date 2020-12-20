namespace SpriteKind {
    export const Nugget = SpriteKind.create()
}

function testBlock(col : number, row : number): boolean {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath2) || 
        tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath4) || 
        tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath6) || 
        tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath8) ||
        tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath8) || 
        tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.builtin.brick)) {
    	return true
    } else {
        return false
    }
}


function moveRight () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterCol = mienenArbeiterCol + 1
    if (testBlock(mienenArbeiterCol,mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.x += 16
    }
}

function moveUp () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterRow = mienenArbeiterRow - 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.y += -16
    }
}

function moveDown () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterRow = mienenArbeiterRow + 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.y += 16
    }
}

function moveLeft () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterCol = mienenArbeiterCol - 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.x += -16
    }
}


controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    moveDown()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveDown()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    moveUp()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveLeft()
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    moveUp()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveRight()
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    moveLeft()
})
function erstelleStein () {
    let stonePositions: tiles.Location[] = []
    zufallszahl = randint(0, alleTilePositionen.length)
    nuggetPosition = alleTilePositionen.removeAt(zufallszahl)
    stonePositions.push(nuggetPosition)
    tiles.setTileAt(tiles.getTileLocation(nuggetPosition.col, nuggetPosition.row), myTiles.tile1)
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    moveRight()
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(location.col, location.row), sprites.castle.tilePath5)
})
function erstelleNugget () {
    let nuggetPositions: tiles.Location[] = []
    zufallszahl = randint(0, alleTilePositionen.length)
    nuggetPosition = alleTilePositionen.removeAt(zufallszahl)
    nuggetPositions.push(nuggetPosition)
    tiles.setTileAt(tiles.getTileLocation(nuggetPosition.col, nuggetPosition.row), sprites.dungeon.collectibleRedCrystal)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(location.col, location.row), sprites.castle.tilePath5)
    info.changeScoreBy(20)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    game.over(false, effects.bubbles)
})
let zufallszahl = 0
let mienenArbeiterCol = 0
let mienenArbeiterRow = 0
let alleTilePositionen: tiles.Location[] = []
let Mienenarbeiter: Sprite = null
let nuggetPosition = null
let nextPos = null
let temp: number[] = []
controller.left.repeatInterval=150
controller.up.repeatInterval=150
controller.down.repeatInterval=150
controller.right.repeatInterval=150
tiles.setTilemap(tilemap`Level`)
Mienenarbeiter = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
Mienenarbeiter.setPosition(24, 24)
scene.cameraFollowSprite(Mienenarbeiter)
Mienenarbeiter.setFlag(SpriteFlag.StayInScreen, false)
alleTilePositionen = tiles.getTilesByType(sprites.castle.tileGrass1)
info.setScore(1000)
for (let index = 0; index < 30; index++) {
    erstelleNugget()
}
for (let index = 0; index < 50; index++) {
    erstelleStein()
}
game.onUpdateInterval(200, function () {
    info.changeScoreBy(-1)
})
