var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursor1;
var background;
var map;
var layer;
var player;
var player2;
var object1;
var object2;

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

function create () {

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
    game.camera.follow(player2);
    
     //keyboard input
    cursor1 = game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function update() {
  game.physics.arcade.collide(player, layer);

//2 PLAYER
 game.physics.arcade.collide(player2, layer);

    if (cursor1 .left.isDown) {
        player.body.velocity.x = -200;
    } else if (cursor1.right.isDown) {

        player.body.velocity.x = 200;
    } else {

       player.body.velocity.x = 0;
    }
///////////////
  //SECOND PLAYER  
    if (leftButton.isDown) {
        player2.body.velocity.x = -200;
    } else if (rightButton.isDown) {
        player2.body.velocity.x = 200;
    } else {
        player2.body.velocity.x = 0;
    }
//////////////
   if (cursor1 .up.isDown && player.body.onFloor()) {
       var stepSound = game.add.audio('step');
            stepSound.play();
            player.body.velocity.y = -400;
    	
    }
   ///////////////// 
   //SECOND PLAYER
    if (upButton.isDown && player2.body.onFloor()) {
    	 var stepSound = game.add.audio('step');
            stepSound.play();
            player2.body.velocity.y = -400;
    }
 /////////////////
    

}