Enemies = function (game, key, frame, scale, rotation,hp){
	Phaser.Sprite.call(this, game, 1200,Math.random()*624, key, frame);
	game.physics.enable(this);					
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	this.hitP = hp;

	this.animations.add('walk',[0,1,2,3],10,true);
}

Enemies.prototype = Object.create(Phaser.Sprite.prototype);
Enemies.prototype.constructor = Enemies;

Enemies.prototype.update = function() {
	this.animations.play('walk');
	game.physics.arcade.moveToObject(this,base,35);
}

