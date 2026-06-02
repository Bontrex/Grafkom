import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// --- 1. CORE SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color("#1a1a1a"); // Added a background color so it isn't pitch black

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// GRAB THE UI ELEMENT FIRST!
const coordUI = document.getElementById("coord-ui");

// --- 2. LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// --- 3. ASSET REGISTRY ---
const loader = new GLTFLoader();

const assetRegistry = [
  // --- PILIH SATU RUANGAN SAJA (Matikan yang lain pakai // biar ga tumpang tindih) ---
  {
    name: "RuangCartoon",
    path: "./assets/cartoon_kitchen_interior.glb",
    pos: [0, 0, 0],
    scale: [10, 10, 10],
  },

  // --- PERABOTAN & PROPS ---
  {
    name: "Timbangan",
    path: "./assets/lowpoly_kitchen_scales.glb",
    pos: [4.3, 1.47, 5],
    scale: [0.25, 0.25, 0.25],
    rot: [0, 180, 0],
  },
  {
    name: "TekoKopi",
    path: "./assets/moka_coffee_pot.glb",
    pos: [5.5, 1.43, 1],
    scale: [0.25, 0.25, 0.25],
  },
  {
    name: "Kulkas",
    path: "./assets/interactive_lowpoly_vintage_fridge.glb",
    pos: [-4.3, 0, -0.34],
    scale: [2, 2, 2],
    rot: [0, 180, 0],
  },
  {
    name: "Toaster",
    path: "./assets/low_poly_toaster_animated.glb",
    pos: [5.7, 1.43, 0.2],
    scale: [0.25, 0.25, 0.25],
  },

  // --- BARANG BARU ---
  // Kipas ditaruh agak tinggi (Y = 3) biar nempel di plafon
  {
    name: "KipasAngin",
    path: "./assets/stylized_ceiling_fan.glb",
    pos: [1, 5, 0],
    scale: [0.002, 0.002, 0.002],
  },

  // --- 20 BARANG BARU (Siap ditata posisinya) ---
  // Tips: Kalau pas di-load layar jadi hitam/ketutupan, berarti ada barang yang scale [1, 1, 1] terlalu raksasa.
  // Ganti scale-nya jadi [0.01, 0.01, 0.01] untuk mengecilkan.
  {
    name: "GelasBiru",
    path: "./assets/blue_gradient_glass.glb",
    pos: [0.5, 1.27, -1.34],
    scale: [0.034, 0.034, 0.034],
  },
  {
    name: "RotiTawar",
    path: "./assets/bread_toon.glb",
    pos: [0.34, 1.34, -0.75],
    scale: [0.1, 0.1, 0.1],
  },
  {
    name: "Coklat",
    path: "./assets/chocolate_plate_lowpoly.glb",
    pos: [0.34, 1.34, -0.87],
    scale: [1, 1, 1],
    rot: [-45, 90, 0],
  },
  {
    name: "Apel",
    path: "./assets/lowpoly_apple__256_tris__130_verts.glb",
    pos: [0.43, 1.34, -0.87],
    scale: [0.25, 0.25, 0.25],
  },
  {
    name: "PisauDapur",
    path: "./assets/lowpoly_knife_-_free_3d_model.glb",
    pos: [5.5, 1.34, 2],
    scale: [0.5, 0.5, 0.5],
    rot: [90, 0, 0],
  },
  {
    name: "KueMinecraft",
    path: "./assets/minecraft_cake.glb",
    pos: [0.87, 1.34, 1.2],
    scale: [0.25, 0.25, 0.25],
  },
  {
    name: "PedangMinecraft",
    path: "./assets/diamond_minecraft_sword.glb",
    pos: [6, 1.43, 2.5],
    scale: [0.25, 0.25, 0.25],
    rot: [90, 0, 0],
  },
  {
    name: "AyamLava",
    path: "./assets/minecraft_lava_chicken.glb",
    pos: [0.87, 1.43, 1.2],
    scale: [0.5, 0.5, 0.5],
    rot: [0, 90, 0],
  },
  {
    name: "Mug",
    path: "./assets/mug.glb",
    pos: [0.25, 1.34, 0],
    scale: [0.0001, 0.0001, 0.0001],
  },
  {
    name: "Piring1",
    path: "./assets/plate.glb",
    pos: [0.5, 1.34, 0],
    scale: [0.1, 0.1, 0.1],
  },
  {
    name: "PiringKue",
    path: "./assets/plate_with_cookies.glb",
    pos: [1, 1.34, 0],
    scale: [1, 1, 1],
  },
  {
    name: "TumpukanPiring",
    path: "./assets/plates.glb",
    pos: [1, 1.34, -1],
    scale: [0.0025, 0.0025, 0.0025],
  },
  {
    name: "PiringPSX",
    path: "./assets/psx_plate.glb",
    pos: [6, 1.5, 2.5],
    scale: [1, 1, 1],
  },
  {
    name: "Pisang",
    path: "./assets/ripe_banana_photoscan_lowpoly.glb",
    pos: [0.74, 1.3, 0.5],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: "Sandvich",
    path: "./assets/sandvich.glb",
    pos: [1.7, 1.25, 1],
    scale: [1, 1, 1],
  },
  {
    name: "Wajan",
    path: "./assets/stylized_frying_pan.glb",
    pos: [1.75, 1.2, -1.5],
    scale: [0.005, 0.005, 0.005],
  },
  {
    name: "SteakSandvich",
    path: "./assets/team_fortress_2_-_buffalo_steak_sandvich.glb",
    pos: [1.4, 1.37, 0.4],
    scale: [0.034, 0.034, 0.034],
  },
  {
    name: "TempatSampah",
    path: "./assets/trash_can_minecraft.glb",
    pos: [5.7, 0, -2],
    scale: [1, 1, 1],
  },
  {
    name: "GelasAir",
    path: "./assets/water_cup.glb",
    pos: [1.5, 1.3, -1.2],
    scale: [0.2, 0.2, 0.2],
  },
  {
    name: "Lilin",
    path: "./assets/free_lowpoly_candle.glb",
    pos: [1, 1.5, -0.57], // Melayang di tengah, silakan ditata nanti X Y Z-nya
    scale: [0.05, 0.05, 0.05],
    rot: [0, 90, 0],
  },
  {
    name: "RotiFancy",
    path: "./assets/fancy_toast_-_lowpoly.glb",
    pos: [1.74, 1.32, -0.1],
    scale: [1, 1, 1],
  },
  {
    name: "KipasMeja",
    path: "./assets/desk_fan.glb",
    pos: [5.2, 1.47, 5],
    scale: [0.2, 0.2, 0.2],
    rot: [0, 45, 0],
  },
];

// --- 3.5 ANIMATION & INTERACTION STATES ---
const clock = new THREE.Clock();
const mixers = []; // Daftar semua pemutar animasi
const objectActions = {}; // Tempat nyimpen tombol play untuk setiap barang

assetRegistry.forEach((item) => {
  loader.load(
    item.path,
    (gltf) => {
      const model = gltf.scene;

      // Terapkan posisi dan skala
      model.position.set(item.pos[0], item.pos[1], item.pos[2]);
      model.scale.set(item.scale[0], item.scale[1], item.scale[2]);

      // --- TAMBAHAN LOGIKA ROTASI ---
      const rot = item.rot || [0, 0, 0]; // Default 0 kalau ga ditulis di registry
      model.rotation.set(
        THREE.MathUtils.degToRad(rot[0]), // X
        THREE.MathUtils.degToRad(rot[1]), // Y (Putar kiri/kanan)
        THREE.MathUtils.degToRad(rot[2]), // Z
      );

      model.name = item.name;
      scene.add(model);
      console.log(`${item.name} berhasil masuk!`);
      model.name = item.name;
      scene.add(model);
      console.log(`${item.name} berhasil masuk!`);

      // --- BACA DAN SIAPKAN ANIMASI BAWAAN .GLB ---
      if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        mixers.push(mixer);

        // Ambil animasi pertama dari file tersebut
        const action = mixer.clipAction(gltf.animations[0]);

        // Simpan "tombol play"-nya supaya nanti bisa dipencet waktu di-klik
        objectActions[item.name] = action;

        // Kalau itu Kipas Angin, langsung di-play terus-menerus (Loop)
        if (
          item.name === "KipasAngin" ||
          item.name === "KipasMeja" ||
          item.name === "Lilin" ||
          item.name === "RotiFancy"
        ) {
          action.play();
        } else {
          // Buat Kulkas dan Toaster, animasinya diputar sekali aja lalu berhenti di akhir
          action.setLoop(THREE.LoopOnce);
          action.clampWhenFinished = true;
        }
      }
    },
    undefined,
    (error) => {
      console.error(`Gagal load ${item.name}:`, error);
    },
  );
});

// --- 4. DEBUGGING HELPERS ---
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// --- 5. CONTROLS & MOVEMENT STATE ---
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  " ": false,
  control: false,
};
let isGhostMode = false;
const walkSpeed = 0.1;
const normalYHeight = 1.5;

camera.position.set(0, normalYHeight, 5);
controls.target.set(0, normalYHeight, 0);

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (keys.hasOwnProperty(key)) keys[key] = true;

  if (key === "l") {
    isGhostMode = !isGhostMode;
    console.log(`Ghost Mode: ${isGhostMode ? "ON" : "OFF"}`);
    if (!isGhostMode) {
      camera.position.y = normalYHeight;
      controls.target.y = normalYHeight;
    }
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (keys.hasOwnProperty(key)) keys[key] = false;
});

// --- 6. RAYCASTER (KLIK INTERAKSI) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousedown", (event) => {
  // Ubah klik mouse jadi sistem koordinat Three.js
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Cek apakah laser nabrak benda
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    let clickedMesh = intersects[0].object;

    // Karena kulkas terdiri dari banyak partikel, kita harus naik ke "Parent"
    // sampai ketemu nama "Kulkas" yang udah kita daftarin di registry
    let namaBenda = "";
    let current = clickedMesh;
    while (current) {
      if (
        current.name === "Kulkas" ||
        current.name === "Toaster" ||
        current.name === "TekoKopi"
      ) {
        namaBenda = current.name;
        break;
      }
      current = current.parent;
    }

    // LOGIKA INTERAKSI (Pakai Animasi Bawaan)
    if (
      namaBenda === "Kulkas" ||
      namaBenda === "Toaster" ||
      namaBenda === "TekoKopi"
    ) {
      const aksi = objectActions[namaBenda];
      if (aksi) {
        // Kalau animasinya lagi jalan, jangan di-restart. Kalau berhenti, mainkan!
        // (Bisa juga dibikin play mundur/tutup, tapi untuk sekarang kita play maju dulu)
        aksi.reset();
        aksi.play();
        console.log(`Menjalankan animasi bawaan untuk: ${namaBenda}`);
      }
    }
  }
});

// --- 7. RESIZE EVENT ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 8. ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);

  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);

  const right = new THREE.Vector3();
  right.crossVectors(forward, camera.up).normalize();

  if (!isGhostMode) {
    forward.y = 0;
    forward.normalize();
  }

  const moveVector = new THREE.Vector3(0, 0, 0);

  if (keys.w) moveVector.add(forward);
  if (keys.s) moveVector.sub(forward);
  if (keys.a) moveVector.sub(right);
  if (keys.d) moveVector.add(right);

  if (moveVector.lengthSq() > 0) {
    moveVector.normalize().multiplyScalar(walkSpeed);
  }

  if (isGhostMode) {
    if (keys[" "]) moveVector.y += walkSpeed;
    if (keys.control) moveVector.y -= walkSpeed;
  }

  camera.position.add(moveVector);
  controls.target.add(moveVector);

  if (!isGhostMode) {
    camera.position.y = normalYHeight;
    controls.target.y = normalYHeight;
  }

  // Update Real-Time Camera Coordinates on screen
  if (coordUI) {
    const cx = camera.position.x.toFixed(2);
    const cy = camera.position.y.toFixed(2);
    const cz = camera.position.z.toFixed(2);
    coordUI.innerText = `Posisi Kamu: [${cx}, ${cy}, ${cz}]`;
  }

  // --- UPDATE ANIMASI BAWAAN (MIXER) ---
  const delta = clock.getDelta();
  mixers.forEach((mixer) => mixer.update(delta));

  controls.update();
  renderer.render(scene, camera);
}

animate();
