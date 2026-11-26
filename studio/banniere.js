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
    <div style="position:absolute;inset:0;background:#F7F5FF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px">
      <div style="display:flex;align-items:center;gap:40px">
        <div style="font-family:Anton;font-size:196px;line-height:1;color:#2A1E8C;letter-spacing:4px">PIÈGES</div>
        <div style="padding:8px 34px 16px;background:#FF4F7B;transform:rotate(-3deg)">
          <div style="font-family:Anton;font-size:126px;line-height:1;color:#F7F5FF;letter-spacing:6px">DE L'ARGENT</div></div>
      </div>
      <div style="background:#2A1E8C;border-radius:60px;padding:14px 54px 20px;font-family:InterX;font-weight:800;font-size:66px;color:#F7F5FF">
        Abonne-toi pour ne plus te faire avoir</div>
    </div>`;
    await document.fonts.load('200px Anton'); await document.fonts.load('800 52px InterX'); await document.fonts.ready;
  });
  await p.screenshot({ path: process.argv[2], clip: { x: 0, y: 0, width: 2560, height: 1440 } });
  await b.close();
})();
