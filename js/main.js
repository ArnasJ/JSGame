var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;
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

    //players
    player1 = game.add.group();
    player2 = game.add.group();
    player1.enableBody = true;
    player2.enableBody = true;
    createPlayer(2 * 64, 2 * 128);
    createPlayer2(2 * 64, 2 * 64);


    //animations
    spSheet = game.add.sprite(128, 128, "playersheet");
    spSheet.animations.add('idle', [2, 3], 2, true);
    spSheet.animations.play('idle');

    /* //obstacles
     obstacles = game.add.group();
     obstacles.enableBody = true;
     createObstacle();*/

    //keyboard input
    cursors = game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

function update() {
    playerUpdate();
    //  player2Update();
}

function createPlayer(x, y) {
    var player = player1.create(x, y, 'player');
    game.physics.enable(player);
    player.body.bounce.y = 0.3;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
}
function createPlayer2(x, y) {
    var playerdu = player2.create(x, y, 'player2');
    game.physics.enable(playerdu);
    playerdu.body.bounce.y = 0.3;
    playerdu.body.gravity.y = 1000;
    playerdu.body.collideWorldBounds = true;
}
function playerUpdate() {
    game.physics.arcade.collide(player1, layer)
    player1.forEach(function (p) {
        p.body.velocity.x = 0;
        if (cursors.left.isDown) {
            p.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            p.body.velocity.x = 200;
        }
        //jump
        if (cursors.up.isDown && p.body.onFloor()) {
            var stepSound = game.add.audio('step');
            stepSound.play();
            p.body.velocity.y = -400;
        }
    });
}

function player2Update() {
    game.physics.arcade.collide(player2, layer)
    player2.forEach(function (p) {
        p.body.velocity.x = 0;
        if (leftButton.isDown) {
            p.body.velocity.x = -200;
        } else if (rightButton.isDown) {
            p.body.velocity.x = 200;
        }
        if (upButton.isDown && p.body.onFloor()) {
            var stepSound = game.add.audio('step');
            stepSound.play();
            p.body.velocity.y = -400;
        }
    });
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