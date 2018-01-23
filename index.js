let app = new PIXI.Application(800, 600, {backgroundColor: '#000000'});
document.body.appendChild(app.view);
document.addEventListener('keydown', onKeyDown);

app.stop();

PIXI.loader
    .add('wan.json')
    .add('wan.png')
    .add('fastwan1.png')
    .add('fastwan2.png')
    .load(onAssetsLoaded);

let moveSpeed = 10;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let container = new PIXI.Container();
container.width = app.screen.width;
container.height = app.screen.height;
app.stage.addChild(container);

let bg = PIXI.Sprite.fromImage('bg.jpg');
bg.x = 0;
bg.y = 0;

container.addChild(bg);

let yeezy = PIXI.Sprite.fromImage('yeezy.png');
yeezy.anchor.set(0.5);
yeezy.x = 500;
yeezy.y = 600;
yeezy.scale.x = 0.3;
yeezy.scale.y = 0.3;

container.addChild(yeezy);

// wan

// let wan = PIXI.Sprite.fromImage('wan.png');
// wan.anchor.set(0.5);
// wan.x = app.screen.width / 2;
// wan.y = app.screen.height / 2;
// wan.scale.x = 0.3;
// wan.scale.y = 0.3;
//
// wan.interactive = true;
//
// app.stage.addChild(wan);

let aniwan;

function onAssetsLoaded() {
  frames = [];
  frames.push(PIXI.Texture.fromFrame('wan.png'));
  frames.push(PIXI.Texture.fromFrame('fastwan1.png'));
  frames.push(PIXI.Texture.fromFrame('fastwan2.png'));

  animWan = new PIXI.extras.AnimatedSprite(frames);
  animWan.anchor.set(0.5);
  animWan.x = app.screen.width / 2;
  animWan.y = app.screen.height / 2;
  animWan.scale.x = 0.3;
  animWan.scale.y = 0.3;
  animWan.animationSpeed = 0.2;
  app.stage.addChild(animWan);
  app.start();
}

function onKeyDown(key) {
  // animWan.play();
  if(key.keyCode === 37) { // left
    animWan.x -= moveSpeed;
  }
  if(key.keyCode === 39) { // right
    animWan.x += moveSpeed;
    console.log(`aniWan.x: ${animWan.x}`);
  }
  if(key.keyCode === 38) { // up
    container.y += moveSpeed;
  }
  if(key.keyCode === 40) { // down
    container.y -= moveSpeed;
    console.log(`container.y: ${container.y}`);
    if(container.y < -190 && container.y > -400 && animWan.x > 420 && animWan.x < 570)
      collideYeezy();
  }
}

function collideYeezy() {
  yeezy.destroy();
  moveSpeed = 40;
  animWan.play();
}
