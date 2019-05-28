function Player(game, key, frame, scale, rotation,x,y,t){
	Phaser.Sprite.call(this, game, x,y, key, frame);
	this.time = t;				
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	
	game.physics.enable(this);
	this.animations.add('attack',[1,2,3,0],10,false);


}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
		

}

Player.prototype.attack = function(){
	this.animations.play('attack');
}

Player.prototype.getT = function(){
	return this.time;
}