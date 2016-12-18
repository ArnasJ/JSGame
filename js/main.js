var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;
var background;

//visų reikalingų assetų užloadinimas
function preload() {
    game.load.audio('mainTheme', ['assets/sounds/mainTheme.ogg', 'assets/sounds/mainTheme.wav', 'assets/sounds/mainTheme.mp3']);
    game.load.audio('step', 'assets/sounds/step.wav')
    game.load.image('background', 'assets/images/background.png');
    game.load.image('player', 'assets/images/veikejas.png');
    game.load.image('brick', 'assets/images/brick.jpg');
}

//atvaizdavimas vykdomas po užloadinimo
function create() {

    //sounds
    music = game.add.audio('mainTheme');
    music.play('', 0, 0.75, true);

    //background
    game.background = game.add.sprite(0, 0, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE)

    //players
    players = game.add.group();
    players.enableBody = true;
    createPlayer(30, 400);

    //obstacles
    obstacles = game.add.group();
    obstacles.enableBody = true;
    createObstacle();

    //keyboard input
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    playerUpdate();
}

function createPlayer(x, y) {
    var player = players.create(x, y, 'player');
    player.body.bounce.y = 0.3;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
}
function playerUpdate() {
    game.physics.arcade.collide(players, obstacles)
    players.forEach(function (p) {
        p.body.velocity.x = 0;
        if (cursors.left.isDown) {
            p.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            p.body.velocity.x = 200;
        }
        //jump
        if (cursors.up.isDown && p.body.touching.down) {
            var stepSound = game.add.audio('step');
            stepSound.play();
            p.body.velocity.y = -400;
        }
    });
}
function createObstacle() {
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
}