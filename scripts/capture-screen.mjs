import { spawn } from 'child_process';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:4321/evaluation/self.html';
const outPath = process.argv[3] || 'actual.png';
const width = parseInt(process.argv[4] || '390', 10);
const height = parseInt(process.argv[5] || '852', 10);

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9345;
const proc = spawn(chrome, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--window-size=1280,1024',
  '--hide-scrollbars',
  url
]);

setTimeout(async () => {
  try {
    const res = await fetch(`http://localhost:${port}/json`);
    const tabs = await res.json();
    const targetTab = tabs.find(t => t.url.includes(url) || t.url.includes(url.split('/').pop())) || tabs[0];
    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const curId = id++;
        const timeout = setTimeout(() => reject(new Error(`Timeout ${method}`)), 5000);
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === curId) {
            clearTimeout(timeout);
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    ws.onopen = async () => {
      if (width < 768) {
        await send('Emulation.setDeviceMetricsOverride', {
          width,
          height,
          deviceScaleFactor: 1,
          mobile: true
        });
        await send('Emulation.setTouchEmulationEnabled', { enabled: true });
      } else {
        await send('Emulation.setDeviceMetricsOverride', {
          width,
          height,
          deviceScaleFactor: 1,
          mobile: false
        });
      }

      // Wait for layout to settle
      await new Promise(r => setTimeout(r, 600));

      const shot = await send('Page.captureScreenshot', {
        clip: {
          x: 0,
          y: 0,
          width,
          height,
          scale: 1
        }
      });

      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      ws.close();
      proc.kill();
      process.exit(0);
    };
  } catch (err) {
    console.error('Capture error:', err);
    proc.kill();
    process.exit(1);
  }
}, 1500);
