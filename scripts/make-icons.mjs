import sharp from "sharp";
import { writeFileSync } from "fs";

const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#16a34a"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="280" font-family="Apple Color Emoji, Segoe UI Emoji">🥗</text>
</svg>`;

async function make(size, name) {
  const buf = Buffer.from(svg(size));
  await sharp(buf).resize(size, size).png().toFile(`./public/${name}`);
  console.log("wrote", name);
}

await make(192, "icon-192.png");
await make(512, "icon-512.png");
await make(180, "apple-touch-icon.png");
console.log("done");
