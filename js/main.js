var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
    game.load.spritesheet('spSheet', 'assets/images/players.png', 1024, 2048, 55);
    game.load.tilemap('map', 'assets/maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/images/spritesheet_ground32.png')
    game.load.spritesheet('playersheet', 'assets/images/playersheet.png', 140, 175)
}

//atvaizdavimas vykdomas po užloadinimo

function create() {

    //sounds
    music = game.add.audio('mainTheme');
    music.play('', 0, 0.5, true);

    //background
    //game.background = game.add.sprite(0, 0, 'background');
    game.stage.backgroundColor = '#FF00FF';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');
    map.addTilesetImage('tileset');
    map.setCollisionBetween(1, 2048);
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    // 1 PLAYER
    player = game.add.sprite(2 * 64, 2 * 64, 'player');
    //player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player);
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);

    //2 PLAYER
    player2 = game.add.sprite(2 * 128, 2 * 128, 'player2');
    //player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player2);
    player2.body.gravity.y = 1000;
    player2.body.collideWorldBounds = true;

    //keyboard input
    cursor1 = game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function update() {

    //collisions
    game.physics.arcade.collide(player, player2);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(player2, layer);


    //player1 controls
    if (cursor1.left.isDown) {
        player.body.velocity.x = -200;
    } else if (cursor1.right.isDown) {

        player.body.velocity.x = 200;
    } else {

        player.body.velocity.x = 0;
    }

    //SECOND PLAYER  
    if (leftButton.isDown) {
        player2.body.velocity.x = -200;
    } else if (rightButton.isDown) {
        player2.body.velocity.x = 200;
    } else {
        player2.body.velocity.x = 0;
    }

    //jump player1
    if (cursor1.up.isDown && (player.body.onFloor() || player.body.touching.down)) {
        var stepSound = game.add.audio('step');
        stepSound.play();
        player.body.velocity.y = -400;

    }
 
    //jump player2
    if (upButton.isDown && (player2.body.onFloor() || player2.body.touching.down)) {
        var stepSound = game.add.audio('step');
        stepSound.play();
        player2.body.velocity.y = -400;
    }
    /////////////////


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