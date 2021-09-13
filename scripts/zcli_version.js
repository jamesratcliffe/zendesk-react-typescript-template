const fs = require('fs')

const rawManifest = fs.readFileSync('dist/manifest.json');
const manifest = JSON.parse(rawManifest);

process.stdout.write(manifest['version'])
