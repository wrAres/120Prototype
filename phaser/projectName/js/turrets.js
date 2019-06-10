function Player(game, key, frame, scale, rotation,x,y,t,type,mx,my,hp,damage){
	if(type ==0){
		this.range = 600;
	}else if(type ==1){
		this.range = 1000;
	}
	this.level = 0;
	this.maxHp = hp;
	Phaser.Sprite.call(this, game, x,y, key, frame);
	this.damage = damage;
	this.mx = mx;
	this.my = my;
	this.time = t;				
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;
	this.alive = true;
	this.type = type;
	this.hp = hp;
	game.physics.enable(this);
	this.buff = false;
	this.baseDamage = damage;
	this.buffDamage = Math.round(this.baseDamage*1.2);
	if(type!=2){
		this.animations.add('attack',[2,3,4,0],10,false);
	}
	if(type == 3){
		this.animations.add('fire',[0,1],10,true);
	}
	
}
/*function changePlayer(Player,game,key){
	this.level = Player.level;
	this.maxHp = Player.hp;
	Phaser.Sprite.call(this, game, x,y, key, frame);
	this.damage = Player.damage*1.1;
	this.mx = Player.mx;
	this.my = Player.my;
	this.time = Player.t;				
	this.anchor.set(0.5);
	this.scale.x = Player.scale;
	this.scale.y = Player.scale;
	this.rotation = Player.rotation;
	this.alive = true;
	this.type = Player.type;
	this.hp = Player.hp+150;
	game.physics.enable(this);
	this.buff = false;
	this.baseDamage = Player.damage;
	this.buffDamage = Math.round(this.baseDamage*1.2);
	if(type!=2){
		this.animations.add('attack',[2,3,4,0],10,false);
	}
	if(type == 3){
		this.animations.add('fire',[0,1],10,true);
	}
	for(int i = 0;i<11;i++){
		for(int j=0;j<6;j++)
	}
}*/

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
		if(this.level == 3&&this.hp<this.maxHp){
			this.hp = this.hp+0.05;
		}
		if(this.buff == true){
			this.damage = this.buffDamage;
		}else{
			this.damage = this.baseDamage;
		}
		var isBuffed = 0;
		for(var i = this.my-1;i <= this.my+1;i++){
			for(var j = this.mx-1;j<=this.mx+1;j++){
				if(j<11&&j>=0&&i<6&&i>=0){
					if(slots[i][j].type ==3){
						this.buff = true;
						isBuffed ++;
					}
				}
			}
		}
		if (isBuffed == 0){
			this.buff = false;
		}
		if(this.type ==3){
			this.animations.play('fire');
		}
}

Player.prototype.attack = function(){
	
	this.animations.play('attack');
}

Player.prototype.getT = function(){
	return this.time;
}

Player.prototype.upgrade = function(){
	if(gold >= this.level*10+10){
		if(this.type ==0&&this.level <3){
			this.damage = this.damage + 20*this.level+10;
			this.baseDamage = this.baseDamage + 20*this.level+10;
			this.buffDamage = Math.round(this.baseDamage*1.2);
			this.hp = this.hp + 20*this.level+10;
			this.maxHp = this.maxHp + 20*this.level+10;
			this.level++;
			gold = gold - this.level*10;
			goldT.text = gold;
		}else if(this.type == 1 && this.level <3){
			this.damage = this.damage +35*this.level+20;
			this.baseDamage = this.baseDamage + 20*this.level+10;
			this.buffDamage = Math.round(this.baseDamage*1.2);
			this.hp = this.hp +10*this.level+20;
			this.maxHp = this.maxHp +10*this.level+20;
			this.level++;
			gold = gold - this.level*10;
			goldT.text = gold;
		}else if(this.type ==2 && this.level <3){
			this.hp = this.hp + 100 * this.level+100;
			this.maxHp = this.maxHp + 100 * this.level+100;
			this.level++;
			gold = gold - this.level*10;
			goldT.text = gold;
		}
	}
}