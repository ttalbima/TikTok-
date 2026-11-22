// Bannière YouTube 2560×1440 ; tout le texte tient dans la zone sûre centrale de 1546×423.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2560, height: 1440 } });
  await p.goto('file://' + path.join(__dirname, 'player.html'));
  await p.evaluate(async () => {
    document.body.style.cssText = 'margin:0;width:2560px;height:1440px';
    document.body.innerHTML = `
    <div style="position:absolute;inset:0;background:#F4EBD9;display:flex;align-items:center;justify-content:center">
      <div style="display:flex;align-items:center;gap:44px;transform:translateY(-60px)">
        <div style="font-family:Anton;font-size:190px;line-height:1;color:#14213D;letter-spacing:4px">PIÈGES</div>
        <div style="padding:8px 34px 16px;background:#FF5A4E;transform:rotate(-3deg)">
          <div style="font-family:Anton;font-size:120px;line-height:1;color:#F4EBD9;letter-spacing:6px">DE L'ARGENT</div></div>
      </div>
      <div style="position:absolute;top:830px;width:100%;text-align:center;font-family:InterX;font-weight:800;font-size:52px;color:#14213D">
        Ce qui te fait perdre de l'argent sans le voir</div>
    </div>`;
    await document.fonts.load('200px Anton'); await document.fonts.load('800 52px InterX'); await document.fonts.ready;
  });
  await p.screenshot({ path: process.argv[2], clip: { x: 0, y: 0, width: 2560, height: 1440 } });
  await b.close();
})();
