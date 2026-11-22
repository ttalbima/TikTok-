// Photo de profil du compte : logo typographique « PIÈGES DE L'ARGENT ».
// node avatar.js <sortie.png>
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'player.html'));
  await p.evaluate(async () => {
    document.body.style.cssText = 'margin:0;width:1080px;height:1080px';
    document.body.innerHTML = `
    <div style="position:absolute;inset:0;background:#F4EBD9;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div style="font-family:Anton;font-size:305px;line-height:.92;color:#14213D;letter-spacing:4px">PIÈGES</div>
      <div style="margin-top:40px;padding:6px 30px 12px;background:#FF5A4E;transform:rotate(-3deg)">
        <div style="font-family:Anton;font-size:136px;line-height:1;color:#F4EBD9;letter-spacing:6px">DE L'ARGENT</div>
      </div>
    </div>`;
    await document.fonts.load('200px Anton'); await document.fonts.ready;
  });
  await p.screenshot({ path: process.argv[2], clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  await b.close();
})();
