// Generates hand-authored Lottie JSON animations for ShopWave.
// Run: node scripts/generate_lottie.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/assets/lottie");
mkdirSync(OUT, { recursive: true });

const fill = (rgb) => ({
  ty: "fl",
  c: { a: 0, k: [...rgb, 1] },
  o: { a: 0, k: 100 },
  r: 1,
  nm: "fill",
});
const stroke = (rgb, w) => ({
  ty: "st",
  c: { a: 0, k: [...rgb, 1] },
  o: { a: 0, k: 100 },
  w: { a: 0, k: w },
  lc: 2,
  lj: 2,
  nm: "stroke",
});
const grTransform = (extra = {}) => ({
  ty: "tr",
  p: { a: 0, k: [0, 0] },
  a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] },
  r: { a: 0, k: 0 },
  o: { a: 0, k: 100 },
  ...extra,
});
const ellipse = (size, pos = [0, 0]) => ({
  ty: "el",
  s: { a: 0, k: size },
  p: { a: 0, k: pos },
  nm: "ellipse",
});
const layerBase = (ind, nm, op) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm,
  sr: 1,
  ao: 0,
  ip: 0,
  op,
  st: 0,
  bm: 0,
});

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

function comp(nm, w, h, op, layers, fr = 60) {
  return { v: "5.9.0", fr, ip: 0, op, w, h, nm, ddd: 0, assets: [], layers };
}

/* ---------------- Loader: three bouncing dots ---------------- */
function loaderDots() {
  const w = 240,
    h = 120,
    op = 60,
    color = hexToRgb("#6d5efc");
  const dot = (ind, cx, phase) => {
    const layer = layerBase(ind, `dot-${ind}`, op);
    // keyframed vertical bounce via position on the group transform
    const baseY = 60;
    const kf = [];
    const frames = [0, 12, 24, 60];
    const ys = [baseY, baseY - 26, baseY, baseY];
    for (let i = 0; i < frames.length; i++) {
      const f = (frames[i] + phase) % (op + 1);
      kf.push({
        t: frames[i] + phase,
        s: [cx, ys[i]],
        ...(i < frames.length - 1 ? { i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } } : {}),
      });
      void f;
    }
    layer.ks = {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 1, k: kf },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    };
    layer.shapes = [
      {
        ty: "gr",
        nm: `dot-grp-${ind}`,
        it: [ellipse([26, 26]), fill(color), grTransform()],
      },
    ];
    return layer;
  };
  return comp("loader-dots", w, h, op, [dot(1, 60, 0), dot(2, 120, 8), dot(3, 180, 16)]);
}

/* ---------------- Success: circle + checkmark draw ---------------- */
function successCheck() {
  const w = 200,
    h = 200,
    op = 75;
  const green = hexToRgb("#16b364");
  // Circle layer (stroked ring drawn with trim path)
  const circle = layerBase(1, "ring", op);
  circle.ks = {
    o: { a: 0, k: 100 },
    r: { a: 0, k: -90 },
    p: { a: 0, k: [100, 100, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] },
  };
  circle.shapes = [
    {
      ty: "gr",
      nm: "ring-grp",
      it: [
        ellipse([150, 150]),
        stroke(green, 12),
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 0, s: [0], i: { x: [0.3], y: [1] }, o: { x: [0.5], y: [0] } },
              { t: 32, s: [100] },
            ],
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: "trim",
        },
        grTransform(),
      ],
    },
  ];
  // Check mark path
  const check = layerBase(2, "check", op);
  check.ks = {
    o: { a: 0, k: 100 },
    r: { a: 0, k: 0 },
    p: { a: 0, k: [100, 104, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] },
  };
  check.shapes = [
    {
      ty: "gr",
      nm: "check-grp",
      it: [
        {
          ty: "sh",
          nm: "check-path",
          ks: {
            a: 0,
            k: {
              i: [
                [0, 0],
                [0, 0],
                [0, 0],
              ],
              o: [
                [0, 0],
                [0, 0],
                [0, 0],
              ],
              v: [
                [-30, 2],
                [-8, 24],
                [34, -22],
              ],
              c: false,
            },
          },
        },
        stroke(green, 12),
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 26, s: [0], i: { x: [0.3], y: [1] }, o: { x: [0.5], y: [0] } },
              { t: 50, s: [100] },
            ],
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: "trim",
        },
        grTransform(),
      ],
    },
  ];
  return comp("success-check", w, h, op, [check, circle]);
}

/* ---------------- Empty cart: bobbing bag ---------------- */
function emptyBag() {
  const w = 220,
    h = 220,
    op = 90;
  const purple = hexToRgb("#6d5efc");
  const light = hexToRgb("#e9e6ff");
  const bag = layerBase(1, "bag", op);
  bag.ks = {
    o: { a: 0, k: 100 },
    r: {
      a: 1,
      k: [
        { t: 0, s: [-4], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
        { t: 45, s: [4], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
        { t: 90, s: [-4] },
      ],
    },
    p: {
      a: 1,
      k: [
        { t: 0, s: [110, 118, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 45, s: [110, 100, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
        { t: 90, s: [110, 118, 0] },
      ],
    },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] },
  };
  // Bag body: rounded rectangle
  bag.shapes = [
    {
      ty: "gr",
      nm: "body",
      it: [
        {
          ty: "rc",
          nm: "rect",
          s: { a: 0, k: [120, 104] },
          p: { a: 0, k: [0, 12] },
          r: { a: 0, k: 20 },
        },
        fill(light),
        stroke(purple, 8),
        grTransform(),
      ],
    },
    {
      ty: "gr",
      nm: "handle",
      it: [
        {
          ty: "sh",
          nm: "handle-path",
          ks: {
            a: 0,
            k: {
              i: [
                [0, 0],
                [-24, 0],
                [0, 0],
              ],
              o: [
                [0, -34],
                [24, 0],
                [0, 0],
              ],
              v: [
                [-34, -34],
                [0, -50],
                [34, -34],
              ],
              c: false,
            },
          },
        },
        stroke(purple, 8),
        grTransform(),
      ],
    },
  ];
  // Floating sparkle dots
  const sparkle = (ind, pos, delay) => {
    const l = layerBase(ind, `sparkle-${ind}`, op);
    l.ks = {
      o: {
        a: 1,
        k: [
          { t: delay, s: [0] },
          { t: delay + 15, s: [100] },
          { t: delay + 40, s: [0] },
          { t: op, s: [0] },
        ],
      },
      r: { a: 0, k: 0 },
      p: {
        a: 1,
        k: [
          { t: delay, s: [pos[0], pos[1], 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
          { t: delay + 40, s: [pos[0], pos[1] - 26, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    };
    l.shapes = [{ ty: "gr", nm: "s", it: [ellipse([12, 12]), fill(purple), grTransform()] }];
    return l;
  };
  return comp("empty-bag", w, h, op, [
    sparkle(2, [46, 70], 0),
    sparkle(3, [176, 84], 22),
    bag,
  ]);
}

/* ---------------- Hero: floating product bubbles ---------------- */
function heroFloat() {
  const w = 400,
    h = 400,
    op = 120;
  const palette = ["#6d5efc", "#00c2a8", "#ff7a59", "#2ea6ff", "#ff5d8f"];
  const bubble = (ind, pos, size, colorHex, phase, amp) => {
    const l = layerBase(ind, `bubble-${ind}`, op);
    const half = op / 2;
    const up = ((0 + phase) % op);
    const mid = ((half + phase) % op) || half;
    void up;
    void mid;
    l.ks = {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: {
        a: 1,
        k: [
          { t: 0, s: [pos[0], pos[1] + amp, 0], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
          { t: half, s: [pos[0], pos[1] - amp, 0], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
          { t: op, s: [pos[0], pos[1] + amp, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { t: 0, s: [96, 96, 100], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
          { t: half, s: [104, 104, 100], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
          { t: op, s: [96, 96, 100] },
        ],
      },
    };
    l.shapes = [
      { ty: "gr", nm: "b", it: [ellipse([size, size]), fill(hexToRgb(colorHex)), grTransform()] },
    ];
    // stagger by shifting keyframe times using phase
    l.ks.p.k = l.ks.p.k.map((k) => ({ ...k, t: (k.t + phase) % (op + 1) })).sort(
      (a, b) => a.t - b.t
    );
    return l;
  };
  // ring outline (pulsing)
  const ring = layerBase(1, "ring", op);
  ring.ks = {
    o: {
      a: 1,
      k: [
        { t: 0, s: [70] },
        { t: 60, s: [30] },
        { t: 120, s: [70] },
      ],
    },
    r: { a: 0, k: 0 },
    p: { a: 0, k: [200, 200, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: {
      a: 1,
      k: [
        { t: 0, s: [80, 80, 100], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
        { t: 60, s: [110, 110, 100], i: { x: 0.42, y: 1 }, o: { x: 0.58, y: 0 } },
        { t: 120, s: [80, 80, 100] },
      ],
    },
  };
  ring.shapes = [
    { ty: "gr", nm: "r", it: [ellipse([260, 260]), stroke(hexToRgb("#6d5efc"), 6), grTransform()] },
  ];
  return comp("hero-float", w, h, op, [
    ring,
    bubble(2, [120, 150], 74, palette[0], 0, 16),
    bubble(3, [270, 130], 54, palette[1], 30, 20),
    bubble(4, [300, 260], 66, palette[3], 55, 14),
    bubble(5, [140, 280], 46, palette[2], 80, 22),
    bubble(6, [210, 210], 40, palette[4], 15, 18),
  ]);
}

const files = {
  "loader-dots.json": loaderDots(),
  "success-check.json": successCheck(),
  "empty-bag.json": emptyBag(),
  "hero-float.json": heroFloat(),
};

for (const [name, data] of Object.entries(files)) {
  const path = resolve(OUT, name);
  writeFileSync(path, JSON.stringify(data));
  // validate round-trip
  JSON.parse(JSON.stringify(data));
  console.log("wrote", name, "-", JSON.stringify(data).length, "bytes");
}
