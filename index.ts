import {Display, Stage, TextureAtlas, DisplayMode, ParallaxProjection, BitmapText2D, Plane, DisplayOnInitOptions} from 'picimo';

const display = new Display(
  document.getElementById('picimo'), {
    mode: DisplayMode.AAQuality,
    resizeStrategy: 'fullscreen',
    alpha: true,
    stage: new Stage(
      new ParallaxProjection(Plane.XY, {
        width: 2000,
        height: 2000,
        fit: 'contain',
        distance: 1000,
        far: 10000,
      })),
  });

display.on('init', async ({stage: {scene}}: DisplayOnInitOptions) => {

  const fontAtlas = await TextureAtlas.load('comic-schrift.json', './');
  const text = new BitmapText2D(fontAtlas, {
    capacity: 1000,
  });

  text.drawText('WELCOME\nTO\nPICIMO!', 0, 0, 0, 0, 'center', 'center');

  scene.add(text);

  // const t = (speed: number = 1, offset: number = 0) => {
  //   const now = (display.now * speed) + offset;
  //   return Math.PI * 2 * Math.ceil(now) - now;
  // };

  console.log('display', display);
  console.log('fontAtlas', fontAtlas);
  console.log('text', text);
});

display.start();
