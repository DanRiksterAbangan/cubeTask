import * as THREE from 'three';
import './style.css';
import gsap from "gsap"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Scene
const scene = new THREE.Scene()

// Cube
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshStandardMaterial({
  color: "#0xff0000",
  roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Grid Helper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light
const light = new THREE.PointLight(0xffffff, 100, 100)
light.position.set(10, 10 ,10)
// light.intensity = 1.25
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height, 
  0.1, 
  100
)
camera.position.z = 20
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// Resize
window.addEventListener('resize', () => {
  // Update the Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update Camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Timeline Effects
const tl = gsap.timeline(
  { defaults: { duration: 1 } }
)
tl.fromTo(mesh.scale, { z:0, x:0, y:0 }, { z:1, x:1, y:1 })
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", {opacity: 0}, { opacity: 1 })

// Mouse Animation Colors / Effects
let mouseDown = false
let rgb = [12, 23 ,55]
window.addEventListener("mousedown", () => (mouseDown = true ))
window.addEventListener("mouseup", () => (mouseDown = false ))
window.addEventListener("mousemove", (e) => {
  if(mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    // Animation
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r, 
      g:newColor.g, 
      b:newColor.b,
    })
  }
})