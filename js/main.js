var game = new Phaser.Game(1410, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursor1;
var background;
var map;
var layer;


//visų reikalingų assetų užloadinimas
function preload() {
    game.load.audio('mainTheme', ['assets/sounds/mainTheme.ogg', 'assets/sounds/mainTheme.wav', 'assets/sounds/mainTheme.mp3']);
    game.load.audio('step', 'assets/sounds/step.wav');
    game.load.image('background', 'assets/images/background.png');
    game.load.image('player', 'assets/images/veikejas.png');
    game.load.image('player2', 'assets/images/veikejas2.png');
    game.load.image('brick', 'assets/images/brick.jpg');
    game.load.image('box', 'assets/images/box.png');
    game.load.spritesheet('spSheet', 'assets/images/players.png', 1024, 2048, 55);
    game.load.tilemap('map', 'assets/maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/images/spritesheet_ground32.png');
    game.load.spritesheet('playersheet', 'assets/images/playersheet.png', 56, 70);
    game.load.image('backFar', 'assets/images/backFar.png');
    game.load.image('backMid', 'assets/images/backMid.png');
    game.load.image('backClose', 'assets/images/backClose.png');
}

//atvaizdavimas vykdomas po užloadinimo

function create() {

    //sounds
    music = game.add.audio('mainTheme');
    music.play('', 0, 0.5, true);

    //background
    game.stage.backgroundColor = '#FF00FF';

    this.backFar = this.game.add.tileSprite(0,
        0,
        100 * 32,
        800,
        'backFar'
    );

    this.backMid = this.game.add.tileSprite(0,
        0,
        100 * 32,
        800,
        'backMid'
    );

    this.backClose = this.game.add.tileSprite(0,
        0,
        100 * 32,
        800,
        'backClose'
    );

    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //tilemap
    map = game.add.tilemap('map');
    map.addTilesetImage('tileset');
    map.setCollisionBetween(1, 2048);
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    // 1 PLAYER
    player = game.add.sprite(2 * 32, 15 * 32, 'playersheet');
    player.anchor.setTo(0.5, 0);
    player.animations.add('idLe', [4], 1, true);
    player.animations.add('jump', [5], 1, true);
    player.animations.add('run', [6, 7], 7, true);
    game.physics.enable(player);
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);


    //2 PLAYER
    player2 = game.add.sprite(5 * 32, 15 * 32, 'playersheet');
    player2.anchor.setTo(0.5, 0);
    player2.animations.add('idLe', [0], 1, true);
    player2.animations.add('jump', [1], 1, true);
    player2.animations.add('run', [2, 3], 7, true);
    game.physics.enable(player2);
    player2.body.gravity.y = 1000;
    player2.body.collideWorldBounds = true;

    //keyboard input
    cursor1 = game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

    //CREATE BOXES

    boxes = game.add.group();
    boxes.enableBody = true;
    game.physics.enable(boxes);
    createBox();
}

function update() {

    this.backFar.tilePosition.x = game.camera.x * 0.8;
    this.backMid.tilePosition.x = game.camera.x * 0.5;
    this.backClose.tilePosition.x = game.camera.x * 0.2;

    //collisions
    game.physics.arcade.collide(player, player2);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(player2, layer);
    game.physics.arcade.collide(player2, boxes);
    game.physics.arcade.collide(player, boxes);
    game.physics.arcade.collide(boxes, layer);
    game.physics.arcade.collide(boxes, boxes);

    //update functions
    updateBox();


    //player1 controls
    if (cursor1.left.isDown) {
        player.animations.play('run');
        player.scale.setTo(-1, 1);
        player.body.velocity.x = -200;
    } else if (cursor1.right.isDown) {
        player.animations.play('run');
        player.scale.setTo(1, 1);
        player.body.velocity.x = 200;
    } else {

        player.body.velocity.x = 0;
    }
    //jump player1
    if (cursor1.up.isDown && (player.body.onFloor() || player.body.touching.down)) {
        player.animations.play('jump');
        var stepSound = game.add.audio('step');
        stepSound.play();
        player.body.velocity.y = -400;

    }
    //player1 idle
    if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
        player.animations.play('idLe');
    }
    //player2 controls 
    if (leftButton.isDown) {
        player2.animations.play('run');
        player2.scale.setTo(-1, 1);
        player2.body.velocity.x = -200;
    } else if (rightButton.isDown) {
        player2.animations.play('run');
        player2.scale.setTo(1, 1);
        player2.body.velocity.x = 200;
    } else {
        player2.body.velocity.x = 0;
    }

    //jump player2
    if (upButton.isDown && (player2.body.onFloor() || player2.body.touching.down)) {
        player2.animations.play('jump');
        var stepSound = game.add.audio('step');
        stepSound.play();
        player2.body.velocity.y = -400;
    }

    //player2 idle
    if (player2.body.velocity.x == 0 && player2.body.velocity.y == 0) {
        player2.animations.play('idLe');
    }

}
//CREATE BOX, PHYSICS, POSITION
function createBox() {
    var box1 = boxes.create(73 * 32, 4 * 32, 'box');
    game.physics.enable(box1);
    box1.body.gravity.y = 1000;
    box1.body.collideWorldBounds = true;
    
    var box2 = boxes.create(77 * 32, 10 * 32, 'box');
    game.physics.enable(box2);
    box2.body.gravity.y = 1000;
    box2.body.collideWorldBounds = true;
}

function updateBox() {
    boxes.forEach(function (b) {
        b.body.velocity.x = 0;
    })
}

/*function createObstacle() {
    var brick1 = obstacles.create(300, game.world.height - 77, 'brick');
    brick1.body.immovable = true;
    var brick2 = obstacles.create(364, game.world.height - 141, 'brick');
    brick2.body.immovable = true;
    var brick3 = obstacles.create(428, game.world.height - 77, 'brick');
    brick3.body.immovable = true;
    var brick4 = obstacles.create(364, game.world.height - 77, 'brick');
    brick4.body.immovable = true;
    var floor = obstacles.create(0, game.world.height - 13);
    floor.scale.x = game.world.width;
    floor.body.immovable = true;
}*/
