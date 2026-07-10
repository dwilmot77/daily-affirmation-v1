# Daily Affirmation

Version 1.0 is a private, mobile-first Progressive Web App for affirmations, favorites, and daily reflections.

## Run Locally

Open PowerShell in this folder:

`C:\Users\RAC\Documents\Codex\2026-07-10\create-a-brand-new-project-named\daily-affirmation`

Run:

```powershell
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png'};http.createServer((req,res)=>{const urlPath=decodeURIComponent(req.url.split('?')[0]);const safe=path.normalize(urlPath==='/'?'/index.html':urlPath).replace(/^([/\\])+/, '');const file=path.join(root,safe);fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);});}).listen(8080,'0.0.0.0',()=>console.log('Daily Affirmation: http://localhost:8080'));"
```

On this computer, open:

`http://localhost:8080`

## Test on iPhone over Home Wi-Fi

1. Make sure your computer and iPhone are on the same Wi-Fi network.
2. Start the local server with the command above.
3. Find your computer's IPv4 address with `ipconfig`.
4. On your iPhone, open Safari.
5. Visit `http://YOUR-IP-ADDRESS:8080`.
6. If Windows asks about allowing Node.js through the firewall, allow it on private/home networks.

## Add to Home Screen

1. Open the app in Safari on your iPhone.
2. Tap Share.
3. Tap Add to Home Screen.
4. Tap Add.

## What Works Offline

After the app is opened once from a secure context, the app shell, icons, settings UI, and local affirmation library are cached for offline use. Favorites, reflections, settings, and feedback are stored locally on the device.

Local Wi-Fi addresses use `http`, which is useful for layout and install testing. Service workers require a secure context on phones, so full offline behavior is best tested from trusted `https` hosting. `localhost` works for offline testing on your computer.

## Reminders and Speech

Reminder settings are preparation only. The app stores your preferred reminder time locally and tells you whether browser notifications are available. It does not claim daily reminders work unless the browser and device actually support them.

Read aloud uses the browser's built-in speech synthesis when available. It never autoplays; use the Play and Stop buttons.

## Version 1.0 Features

- Time-based greeting and today's date
- Daily affirmation card
- New Affirmation, Copy, and Favorite buttons
- Breathe First mode with a reveal button
- Favorites list with search and removal
- Reflection journal with local auto-save
- Saved reflection history and search
- Affirmation search across all categories
- Category settings: General, Gratitude, Faith, Anxiety and Calm, Healing, Confidence, Relationships, Happiness
- Gentle Growth feedback stored locally
- Light, dark, and system theme settings
- Adjustable text size
- High-contrast option
- Read-aloud controls
- Reminder support check and local reminder preference
- Local-only data storage with no accounts, analytics, tracking, ads, paid services, cloud storage, or external services

## Files

- `index.html` - app structure
- `styles.css` - mobile-first visual design
- `app.js` - app behavior and local storage
- `manifest.webmanifest` - install metadata
- `service-worker.js` - offline cache
- `data/affirmations.json` - local affirmation library
- `icons/` - temporary app icons
