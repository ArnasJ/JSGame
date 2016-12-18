var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;

//visų reikalingų assetų užloadinimas
function preload() {
    game.load.image('background', 'assets/images/background.png');
    game.load.image('player', 'assets/images/veikejas.png');
    game.load.image('brick', 'assets/images/brick.jpg');
}

//atvaizdavimas vykdomas po užloadinimo
function create() {

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
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
}
function playerUpdate() {
    game.physics.arcade.collide(players, obstacles/* su kuo collinsionai vyksta*/)
    players.forEach(function (p) {
        p.body.velocity.x = 0;
        if (cursors.left.isDown) {
            p.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            p.body.velocity.x = 200;
        }
        else if (cursors.up.isDown) {
            p.body.velocity.y = -200;
        }
    });
}
function createObstacle() {
    var brick1 = obstacles.create(300, 522, 'brick');
    brick1.body.immovable = true;
}