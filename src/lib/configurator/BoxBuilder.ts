import * as THREE from 'three'
import { BoxType } from './types'

interface BuildInput {
  type:   BoxType
  lMM:    number  // length in mm
  wMM:    number  // width in mm
  hMM:    number  // height in mm
}

export function buildBoxGroup(input: BuildInput): THREE.Group {
  const { type, lMM, wMM, hMM } = input
  const l = lMM / 10  // Three.js units
  const w = wMM / 10
  const h = hMM / 10
  const t = 0.15      // wall thickness

  const group = new THREE.Group()
  group.name = 'box_group'

  // Create a placeholder material (will be replaced by MaterialSystem)
  const mat = new THREE.MeshStandardMaterial({ color: '#F5F0EB' })

  if (type === 'rigid_lid_base' || type === 'gift') {
    // Two-piece: base (lower 65%) + lid (upper 35%)
    const baseH = h * 0.65
    const lidH  = h * 0.35

    const base = new THREE.Group()
    base.name = 'base_group'
    addBoxShell(base, l, w, baseH, t, mat, 'base')
    group.add(base)

    const lid = new THREE.Group()
    lid.name = 'lid_group'
    // Lid is slightly wider to fit over the base
    addBoxShell(lid, l + t*2.2, w + t*2.2, lidH, t, mat, 'lid')
    lid.position.y = baseH - t
    group.add(lid)

  } else if (type === 'drawer') {
    // Outer sleeve (open on front face) + inner tray
    const sleeve = new THREE.Group()
    sleeve.name = 'sleeve_group'
    addDrawerSleeve(sleeve, l, w, h, t, mat)
    group.add(sleeve)

    const tray = new THREE.Group()
    tray.name = 'tray_group'
    addBoxShell(tray, l - t*2.5, w - t*2.5, h - t*1.5, t, mat, 'tray')
    tray.position.x = 0
    group.add(tray)

  } else if (type === 'mailer') {
    // E-commerce Mailer: body shell + hinged lid with side wings
    addMailerStructure(group, l, w, h, t, mat)

  } else if (type === 'sleeve') {
    // Just a tube — no top/bottom
    addSleeveTube(group, l, w, h, t, mat)

  } else if (type === 'bag') {
    // Paper bag: box shell open at top with handles
    addBoxShell(group, l, w, h, t, mat, 'bag')

    const handleGeom = new THREE.TorusGeometry(l * 0.25, 0.08, 8, 24, Math.PI)
    const handleMat = new THREE.MeshStandardMaterial({ color: '#333333', roughness: 1.0 })
    const handleMesh = new THREE.Mesh(handleGeom, handleMat)
    handleMesh.position.set(0, h, 0)
    handleMesh.castShadow = true
    group.add(handleMesh)

  } else {
    // straight_tuck, reverse_tuck, perfume — thin folding tuck cartons
    addBoxShell(group, l, w, h, t * 0.7, mat, 'body')
    addTuckLid(group, l, w, t * 0.7, mat, h)
  }


  // Center group at origin with bottom at Y=0
  group.position.y = 0
  return group
}

// Helper to create box shell panels
export function addBoxShell(
  group: THREE.Group,
  l: number,
  w: number,
  h: number,
  t: number,
  mat: THREE.Material,
  prefix: string
): void {
  // Bottom Panel
  const bottomGeom = new THREE.BoxGeometry(l, t, w)
  const bottomMesh = new THREE.Mesh(bottomGeom, mat.clone())
  bottomMesh.position.set(0, t / 2, 0)
  bottomMesh.userData = { face: prefix + '_bottom' }
  bottomMesh.castShadow = true
  bottomMesh.receiveShadow = true
  group.add(bottomMesh)

  // Front Panel
  const frontGeom = new THREE.BoxGeometry(l, h, t)
  const frontMesh = new THREE.Mesh(frontGeom, mat.clone())
  frontMesh.position.set(0, h / 2, w / 2 - t / 2)
  frontMesh.userData = { face: prefix + '_front' }
  frontMesh.castShadow = true
  frontMesh.receiveShadow = true
  group.add(frontMesh)

  // Back Panel
  const backGeom = new THREE.BoxGeometry(l, h, t)
  const backMesh = new THREE.Mesh(backGeom, mat.clone())
  backMesh.position.set(0, h / 2, -w / 2 + t / 2)
  backMesh.userData = { face: prefix + '_back' }
  backMesh.castShadow = true
  backMesh.receiveShadow = true
  group.add(backMesh)

  // Left Panel
  const leftGeom = new THREE.BoxGeometry(t, h, w - t * 2)
  const leftMesh = new THREE.Mesh(leftGeom, mat.clone())
  leftMesh.position.set(-l / 2 + t / 2, h / 2, 0)
  leftMesh.userData = { face: prefix + '_left' }
  leftMesh.castShadow = true
  leftMesh.receiveShadow = true
  group.add(leftMesh)

  // Right Panel
  const rightGeom = new THREE.BoxGeometry(t, h, w - t * 2)
  const rightMesh = new THREE.Mesh(rightGeom, mat.clone())
  rightMesh.position.set(l / 2 - t / 2, h / 2, 0)
  rightMesh.userData = { face: prefix + '_right' }
  rightMesh.castShadow = true
  rightMesh.receiveShadow = true
  group.add(rightMesh)
}

// Helper to create tuck lid
export function addTuckLid(
  group: THREE.Group,
  l: number,
  w: number,
  t: number,
  mat: THREE.Material,
  bodyHeight: number
): void {
  // Create a pivot shifted geometry for folding animation
  const lidGeom = new THREE.BoxGeometry(l, t, w)
  lidGeom.translate(0, 0, w / 2) // shift geometry so local origin is at back edge

  const lidMesh = new THREE.Mesh(lidGeom, mat.clone())
  // Position it at the top back of the box
  lidMesh.position.set(0, bodyHeight - t / 2, -w / 2)
  lidMesh.name = 'lid'
  lidMesh.userData = { face: 'lid', isLid: true }
  lidMesh.castShadow = true
  lidMesh.receiveShadow = true
  group.add(lidMesh)
}

// Helper to create drawer sleeve (open on front face Z = w/2)
export function addDrawerSleeve(
  group: THREE.Group,
  l: number,
  w: number,
  h: number,
  t: number,
  mat: THREE.Material
): void {
  // Bottom Panel
  const bottomGeom = new THREE.BoxGeometry(l, t, w)
  const bottomMesh = new THREE.Mesh(bottomGeom, mat.clone())
  bottomMesh.position.set(0, t / 2, 0)
  bottomMesh.userData = { face: 'sleeve_bottom' }
  bottomMesh.castShadow = true
  bottomMesh.receiveShadow = true
  group.add(bottomMesh)

  // Top Panel
  const topGeom = new THREE.BoxGeometry(l, t, w)
  const topMesh = new THREE.Mesh(topGeom, mat.clone())
  topMesh.position.set(0, h - t / 2, 0)
  topMesh.userData = { face: 'sleeve_top' }
  topMesh.castShadow = true
  topMesh.receiveShadow = true
  group.add(topMesh)

  // Back Panel
  const backGeom = new THREE.BoxGeometry(l, h - t * 2, t)
  const backMesh = new THREE.Mesh(backGeom, mat.clone())
  backMesh.position.set(0, h / 2, -w / 2 + t / 2)
  backMesh.userData = { face: 'sleeve_back' }
  backMesh.castShadow = true
  backMesh.receiveShadow = true
  group.add(backMesh)

  // Left Panel
  const leftGeom = new THREE.BoxGeometry(t, h - t * 2, w - t)
  const leftMesh = new THREE.Mesh(leftGeom, mat.clone())
  leftMesh.position.set(-l / 2 + t / 2, h / 2, t / 2)
  leftMesh.userData = { face: 'sleeve_left' }
  leftMesh.castShadow = true
  leftMesh.receiveShadow = true
  group.add(leftMesh)

  // Right Panel
  const rightGeom = new THREE.BoxGeometry(t, h - t * 2, w - t)
  const rightMesh = new THREE.Mesh(rightGeom, mat.clone())
  rightMesh.position.set(l / 2 - t / 2, h / 2, t / 2)
  rightMesh.userData = { face: 'sleeve_right' }
  rightMesh.castShadow = true
  rightMesh.receiveShadow = true
  group.add(rightMesh)
}

// Helper to create open tube sleeve
export function addSleeveTube(
  group: THREE.Group,
  l: number,
  w: number,
  h: number,
  t: number,
  mat: THREE.Material
): void {
  // Front Panel
  const frontGeom = new THREE.BoxGeometry(l, h, t)
  const frontMesh = new THREE.Mesh(frontGeom, mat.clone())
  frontMesh.position.set(0, h / 2, w / 2 - t / 2)
  frontMesh.userData = { face: 'sleeve_front' }
  frontMesh.castShadow = true
  frontMesh.receiveShadow = true
  group.add(frontMesh)

  // Back Panel
  const backGeom = new THREE.BoxGeometry(l, h, t)
  const backMesh = new THREE.Mesh(backGeom, mat.clone())
  backMesh.position.set(0, h / 2, -w / 2 + t / 2)
  backMesh.userData = { face: 'sleeve_back' }
  backMesh.castShadow = true
  backMesh.receiveShadow = true
  group.add(backMesh)

  // Left Panel
  const leftGeom = new THREE.BoxGeometry(t, h, w - t * 2)
  const leftMesh = new THREE.Mesh(leftGeom, mat.clone())
  leftMesh.position.set(-l / 2 + t / 2, h / 2, 0)
  leftMesh.userData = { face: 'sleeve_left' }
  leftMesh.castShadow = true
  leftMesh.receiveShadow = true
  group.add(leftMesh)

  // Right Panel
  const rightGeom = new THREE.BoxGeometry(t, h, w - t * 2)
  const rightMesh = new THREE.Mesh(rightGeom, mat.clone())
  rightMesh.position.set(l / 2 - t / 2, h / 2, 0)
  rightMesh.userData = { face: 'sleeve_right' }
  rightMesh.castShadow = true
  rightMesh.receiveShadow = true
  group.add(rightMesh)
}

export function addMailerStructure(
  group: THREE.Group,
  l: number,
  w: number,
  h: number,
  t: number,
  mat: THREE.Material
): void {
  // Main body shell
  addBoxShell(group, l, w, h, t, mat, 'body')

  // Top hinged lid attached at back edge
  const lidGeom = new THREE.BoxGeometry(l, t, w)
  lidGeom.translate(0, 0, w / 2)
  const lidMesh = new THREE.Mesh(lidGeom, mat.clone())
  lidMesh.position.set(0, h - t / 2, -w / 2)
  lidMesh.name = 'lid'
  lidMesh.userData = { face: 'lid', isLid: true }
  lidMesh.castShadow = true
  lidMesh.receiveShadow = true

  // Left & Right side wings on lid
  const wingGeom = new THREE.BoxGeometry(t, h * 0.7, w * 0.95)
  const leftWing = new THREE.Mesh(wingGeom, mat.clone())
  leftWing.position.set(-l / 2 + t / 2, -h * 0.35, w / 2)
  leftWing.userData = { face: 'wing_left' }
  lidMesh.add(leftWing)

  const rightWing = new THREE.Mesh(wingGeom, mat.clone())
  rightWing.position.set(l / 2 - t / 2, -h * 0.35, w / 2)
  rightWing.userData = { face: 'wing_right' };
  lidMesh.add(rightWing)

  group.add(lidMesh)
}

export function disposeBoxGroup(group: THREE.Group): void {
  group.traverse(obj => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose()
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose())
      } else {
        obj.material.dispose()
      }
    }
  })
}

