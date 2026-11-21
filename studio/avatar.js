// Photo de profil du compte, dans la charte des vidéos. node avatar.js <sortie.png>
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'player.html'));
  await p.evaluate(async () => {
    document.body.innerHTML = `<div style="position:absolute;inset:0;background:#FFC83D;overflow:hidden">
      <div style="position:absolute;left:540px;top:540px;transform:translate(-50%,-50%) rotate(-8deg);filter:drop-shadow(14px 18px 0 rgba(0,0,0,.26))">
        ${O.tag('9,99', { w: 700, fill: '#14213D', ink: '#F4EBD9', fs: 190 })}</div></div>`;
    document.body.style.cssText = 'width:1080px;height:1080px;margin:0';
    await document.fonts.load('200px Anton'); await document.fonts.ready;
  });
  await p.screenshot({ path: process.argv[2], clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  await b.close();
})();
