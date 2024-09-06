// Copies and modifes certain files such that they can properly be used by the extension once built.
// This should be run after running vite build.

const fs = require('fs');

// 1) Copy src/background/ to built dist/ dir.
fs.cp(
    './src/background',
    './dist/background',
    { recursive: true },
    err => {
        if (err) {
            console.log(err)
        }
    }
)

// 2) Replace enviroment variable placeholers within manifest file with their values
// and save new manifest to the built dist/ dir.
const manifest = require("./src/manifest.json");
manifest.key = process.env.EXTENSION_PUBLIC_KEY
manifest.oauth2.client_id = process.env.OAUTH2_CLIENT_ID
fs.writeFile(
    './dist/manifest.json',
    JSON.stringify(manifest, null, 4),  // 4 space for pretty print
    err => {
        if (err) {
            console.log(err)
        }
    }
)
