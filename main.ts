namespace SpriteKind {
    export const Nugget = SpriteKind.create()
}
// -----Right-------------------------------------------------------------------
function moveRight () {
    calcMienenarbeiterPosition()
    mienenArbeiterCol = mienenArbeiterCol + 1
    if (!(testBlockForEnterability(mienenArbeiterCol, mienenArbeiterRow))) {
        Mienenarbeiter.x += 16
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveRight()
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    moveRight()
})

// -----Down-------------------------------------------------------------------
function moveDown () {
    calcMienenarbeiterPosition()
    mienenArbeiterRow = mienenArbeiterRow + 1
    if (!(testBlockForEnterability(mienenArbeiterCol, mienenArbeiterRow))) {
        Mienenarbeiter.y += 16
    }
}

controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    moveDown()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    moveDown()
})
// -------Up-----------------------------------------------------------------

function moveUp () {
    calcMienenarbeiterPosition()
    mienenArbeiterRow = mienenArbeiterRow - 1
    if (!(testBlockForEnterability(mienenArbeiterCol, mienenArbeiterRow))) {
        Mienenarbeiter.y += -16
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    moveUp()
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    moveUp()
})

// -----Left-------------------------------------------------------------------
function moveLeft () {
    calcMienenarbeiterPosition()
    mienenArbeiterCol = mienenArbeiterCol - 1
    if (!(testBlockForEnterability(mienenArbeiterCol, mienenArbeiterRow))) {
        Mienenarbeiter.x += -16
    }
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveLeft()
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    moveLeft()
})
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

//(tiles.tileAtLocationEquals(tiles.getTileLocation(col, row + 1), myTiles.tile1) ||          tiles.tileAtLocationEquals(tiles.getTileLocation(col, row + 1), myTiles.tile2) ||

function testStoneWillStartToFall (col: number, row: number) {
    calcMienenarbeiterPosition()
    if (
         tiles.tileAtLocationEquals(tiles.getTileLocation(col, row + 1), sprites.castle.tilePath5)
         && 
        (!(col == mienenArbeiterCol && row + 1 == mienenArbeiterRow))) 
        {
          return true
        } else 
        {
            return false
        }
}
function calcMienenarbeiterPosition () {
    mienenArbeiterRow = (Mienenarbeiter.y - 8) / 16
    mienenArbeiterCol = (Mienenarbeiter.x - 8) / 16
}
// Test if the tile in col,row can be entred.
function testBlockForEnterability (col: number, row: number) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath2) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath4) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath6) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.castle.tilePath8) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), myTiles.tile1) || tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), sprites.builtin.brick)) {
        return true
    } else {
        return false
    }
}
// ------------------------------------------------------------------------
// In case the miner is overlapping a projectile / falling stone the game is over
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false)
})

// Create a stone in random position
function erstelleStein () {
    zufallszahl = randint(0, alleTilePositionen.length)
    nuggetPosition = alleTilePositionen.removeAt(zufallszahl)
    stonePositions.push(nuggetPosition)
    tiles.setTileAt(tiles.getTileLocation(nuggetPosition.col, nuggetPosition.row), myTiles.tile1)
}

// Create a nugget in random position
function erstelleNugget () {
    let nuggetPositions: tiles.Location[] = []
    zufallszahl = randint(0, alleTilePositionen.length)
    nuggetPosition = alleTilePositionen.removeAt(zufallszahl)
    nuggetPositions.push(nuggetPosition)
    tiles.setTileAt(tiles.getTileLocation(nuggetPosition.col, nuggetPosition.row), sprites.dungeon.collectibleRedCrystal)
}

// Eat up the grass
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(location.col, location.row), sprites.castle.tilePath5)
})

// Eat up a nugget and increase the score
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(location.col, location.row), sprites.castle.tilePath5)
    info.changeScoreBy(20)
})

// Exit of the maze entered. Finish the game and report the final score.
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    game.over(true, effects.bubbles)
})



// Main program
let loc: tiles.Location = null
let fallingStone: Sprite = null
let fallingStones: Sprite[] = []
let stonePositions: tiles.Location[] = []
let zufallszahl = 0
let mienenArbeiterRow = 0
let mienenArbeiterCol = 0
let alleTilePositionen: tiles.Location[] = []
let Mienenarbeiter: Sprite = null
let nuggetPosition:tiles.Location  = null
let stonePosition: tiles.Location = null
let nextPos = null
let repeatDelay = 120
let repeatInterval = 100
controller.left.repeatInterval=repeatInterval
controller.up.repeatInterval=repeatInterval
controller.down.repeatInterval=repeatInterval
controller.right.repeatInterval=repeatInterval
controller.left.repeatDelay=repeatDelay
controller.up.repeatDelay=repeatDelay
controller.down.repeatDelay=repeatDelay
controller.right.repeatDelay=repeatDelay
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

        let locBelow:tiles.Location = tiles.getTileLocation((fallingStone.x - 8) / 16, (fallingStone.y - 8+16) / 16)

        if (tiles.tileAtLocationEquals(locBelow, sprites.castle.tileGrass1)||
            tiles.tileAtLocationEquals(locBelow, myTiles.tile1)||
            tiles.tileAtLocationEquals(locBelow, myTiles.tile2)) {
            loc = tiles.getTileLocation((fallingStone.x - 8) / 16, (fallingStone.y - 8) / 16)
            tiles.setTileAt(loc, myTiles.tile1)
            stonePositions.push(loc)
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
        if (testStoneWillStartToFall(stonePosition.col, stonePosition.row)) {
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
