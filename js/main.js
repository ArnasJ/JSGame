var game = new Phaser.Game(640, 480, Phaser.AUTO);

var GameState = {
    preload: function(){
    this.load.image('background', 'assets/images/background.png')
},
create: function(){

},
update: function(){

}
};

game.state.add('GameState', GameState);
game.state.start('GameState');
