Enemies = function (game, key, frame, scale, rotation, hp,type){
	Phaser.Sprite.call(this, game, 1400,130+Math.random()*500, key, frame);
	game.physics.enable(this);					
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	this.hitP = hp;
	this.alive = true;
	this.maxH = hp;
	this.type = type;
	if(type == 1){
		this.animations.add('walk',[1,2,3,4],10,true);
	}else{
		this.animations.add('walk',[0,1,2,3],10,true);
	}
	if(type == 0){
		this.animations.add('attack',[4,5],100,false);
	}else{
		this.animations.add('attack',[0,1,2],100,false);
	}
}
Enemies.prototype
Enemies.prototype = Object.create(Phaser.Sprite.prototype);
Enemies.prototype.constructor = Enemies;
Enemies.prototype.key = function(){
	return this.key;
}
Enemies.prototype.update = function() {
	this.animations.play('walk');
	if(this.type!=3){
		game.physics.arcade.moveToObject(this,base,35);
	}else{
		game.physics.arcade.moveToObject(this,base,50+score/20);
	}
}

Enemies.prototype.attack = function(){
	this.animations.play('attack');
	console.log('at');
}