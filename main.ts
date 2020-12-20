namespace SpriteKind {
    export const Nugget = SpriteKind.create()
}
function moveRight () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterCol = mienenArbeiterCol + 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.x += 16
    }
}
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    moveDown()
})
function moveUp () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterRow = mienenArbeiterRow - 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.y += -16
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    moveUp()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveLeft()
})
function testFallingStone (col: number, row: number) {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    if ((tiles.tileAtLocationEquals(tiles.getTileLocation(col, row + 1), sprites.castle.tilePath5)) && 
        (!((col == mienenArbeiterCol) && (row+1==mienenArbeiterRow)))) {
        return true
    } else {
        return false
    }
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    moveUp()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveDown()
})
function moveDown () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterRow = mienenArbeiterRow + 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.y += 16
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveRight()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    moveLeft()
})
function erstelleStein () {
    zufallszahl = randint(0, alleTilePositionen.length)
    nuggetPosition = alleTilePositionen.removeAt(zufallszahl)
    stonePositions.push(nuggetPosition)
    tiles.setTileAt(tiles.getTileLocation(nuggetPosition.col, nuggetPosition.row), myTiles.tile1)
}
function testBlock (col: number, row: number) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath2) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath4) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath6) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath8) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), myTiles.tile1) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.builtin.brick)) {
        return true
    } else {
        return false
    }
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
function moveLeft () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
    mienenArbeiterCol = mienenArbeiterCol - 1
    if (testBlock(mienenArbeiterCol, mienenArbeiterRow)) {
    	
    } else {
        Mienenarbeiter.x += -16
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    game.over(false, effects.bubbles)
})
let fallingStone: Sprite = null
let fallingStones: Sprite[] = []
let stonePositions: tiles.Location[] = []
let zufallszahl = 0
let mienenArbeiterCol = 0
let mienenArbeiterRow = 0
let alleTilePositionen: tiles.Location[] = []
let Mienenarbeiter: Sprite = null
let nextPos = null
let nuggetPosition:tiles.Location  = null
let stonePosition: tiles.Location = null
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
info.setScore(100)
for (let index = 0; index < 30; index++) {
    erstelleNugget()
}
for (let index = 0; index < 50; index++) {
    erstelleStein()
}
game.onUpdate(function () {
    for (let stoneIndex2 = 0; stoneIndex2 <= fallingStones.length - 1; stoneIndex2++) {
        fallingStone = fallingStones[stoneIndex2]
        console.debug("fallingStone.x:"+fallingStone.x+" y:"+fallingStone.y)
        if (tiles.tileAtLocationEquals(tiles.getTileLocation((fallingStone.x -8)/16, (fallingStone.y - 8)/16), sprites.castle.tileGrass1)) {
            tiles.setTileAt(tiles.getTileLocation(fallingStone.x * 16 + 8, fallingStone.y * 16 + 8), myTiles.tile1)
            fallingStones.removeAt(stoneIndex2)
            stoneIndex2 = stoneIndex2 - 1
            fallingStone.destroy()
        }
    }
})
game.onUpdateInterval(100, function () {
    info.changeScoreBy(-1)
    if (info.score() == 0) {
        game.over(false, effects.melt)
    }
})
game.onUpdateInterval(200, function () {
    for (let stoneIndex = 0; stoneIndex <= stonePositions.length - 1; stoneIndex++) {
        stonePosition = stonePositions[stoneIndex]
        if (testFallingStone(stonePosition.col, stonePosition.row)) {
            tiles.setTileAt(stonePosition, sprites.castle.tilePath5)
            fallingStone = sprites.create(img`
                . . . . e b e e e e e . . . . . 
                . . e e e b e e b e e e e . . . 
                . e e e b e e b e e b e e e . . 
                . e e e e e e e e e e e e e . . 
                e e b e e e e b e e e e b e e . 
                e e e e b e e e e e b e e e e . 
                b e e e e e e e e e b e b e e . 
                e e b e e b e b e e e e e b e . 
                e e e e e e e b e e e e e e e . 
                e e b e e b e e e e b e e b e . 
                e e e e e e e e e e e e e e e . 
                . e e b e e e e e b e e b e . . 
                . e e e e e e b e e e e e e . . 
                . . e e e b e e e b e e e . . . 
                . . . . e e e e e e e . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Projectile)
            fallingStone.setPosition(8 + stonePosition.col * 16, 8 + stonePosition.row * 16)
            fallingStone.setVelocity(0, 30)
            stonePositions.removeAt(stoneIndex)
            stoneIndex = stoneIndex - 1
            fallingStones.push(fallingStone)
        }
    }
})
