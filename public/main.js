  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  
  // Cena, câmera e renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Luz
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);
  
  // Carregar modelo GLB
  const loader = new GLTFLoader();
  loader.load('models/teste.glb', (gltf) => {
  const model = gltf.scene;

  // Ajuste eixo
  model.rotation.x = -Math.PI / 2;

  // Centraliza pivô
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  scene.add(model);
}, undefined, (error) => {
    console.error('Erro ao carregar modelo:', error);
});

// Controles de câmera
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 5);
controls.update();

// Responsividade
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop de animação
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


animate();
