import {Display, Stage2D, TextureAtlas, DisplayMode, ParallaxProjection, BitmapText2D, Plane, DisplayOnInitOptions} from 'picimo';

const display = new Display(
  document.getElementById('picimo'), {
    mode: DisplayMode.AAQuality,
    resizeStrategy: 'fullscreen',
    alpha: true,
    stage: new Stage2D(
      new ParallaxProjection(Plane.XY, {
        width: 2000,
        height: 2000,
        fit: 'contain',
        distance: 1000,
        far: 10000,
      })),
  });

display.on('init', async ({stage: {scene}}: DisplayOnInitOptions) => {

  const text = new BitmapText2D({ capacity: 1000 });
  text.fontAtlas = await TextureAtlas.load('comic-schrift.json', './');

  text.drawText('WELCOME\nTO\nPICIMO!', 0, 0, 0, 0, 'center', 'center');

  scene.add(text);

  // const t = (speed: number = 1, offset: number = 0) => {
  //   const now = (display.now * speed) + offset;
  //   return Math.PI * 2 * Math.ceil(now) - now;
  // };

  console.log('display', display);
  console.log('fontAtlas', text.fontAtlas);
  console.log('text', text);
});

display.start();
