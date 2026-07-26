import * as THREE from 'three'
import { Material, Finish, FoilEffect } from './types'

interface MatInput {
  material:   Material
  boxColor?:  string
  finish:     Finish
  foilEffect: FoilEffect
  face:       string      // 'body_front', 'body_back', 'lid', etc.
  texture?:   THREE.Texture | null
}

const BASE_COLORS: Record<Material, string> = {
  white_cardboard: '#F5F0EB',
  kraft:           '#C4975A',
  black_cardboard: '#1C1C1C',
  rigid_greyboard: '#8A8A8A',
}

const FINISH_PBR: Record<Finish, { roughness: number; metalness: number; envMapIntensity: number }> = {
  matte_lamination:  { roughness: 0.88, metalness: 0.0, envMapIntensity: 0.2 },
  gloss_lamination:  { roughness: 0.05, metalness: 0.0, envMapIntensity: 1.4 },
  soft_touch:        { roughness: 0.95, metalness: 0.0, envMapIntensity: 0.1 },
  aqueous_coating:   { roughness: 0.30, metalness: 0.0, envMapIntensity: 0.6 },
  no_finish:         { roughness: 0.90, metalness: 0.0, envMapIntensity: 0.1 },
}

export function getMaterial(input: MatInput): THREE.Material {
  const { material, boxColor, finish, foilEffect, face, texture } = input
  
  // Use boxColor if provided; for Kraft material, use Kraft base unless custom color specified
  let effectiveColor = boxColor || BASE_COLORS[material]
  if (material === 'kraft' && (!boxColor || boxColor === '#F5F0EB' || boxColor === '#FFFFFF')) {
    effectiveColor = BASE_COLORS.kraft
  }
  
  const pbr = FINISH_PBR[finish] ?? FINISH_PBR.matte_lamination

  const isPrintFace = face === 'front' || face === 'back' || face.endsWith('_front') || face.endsWith('_back') || face === 'lid'
  
  if (foilEffect !== 'none' && isPrintFace) {
    return getFoilMaterial(foilEffect)
  }

  const mat = new THREE.MeshStandardMaterial({
    color:            new THREE.Color(effectiveColor),
    roughness:        material === 'kraft' ? 0.92 : pbr.roughness,
    metalness:        pbr.metalness,
    envMapIntensity:  pbr.envMapIntensity,
    map:              texture ?? null,
  })
  return mat
}


function getFoilMaterial(foil: FoilEffect): THREE.MeshPhysicalMaterial {
  const foilColors: Record<FoilEffect, string> = {
    none:           '#FFFFFF',
    gold_foil:      '#C8A15A',
    silver_foil:    '#C8C8C8',
    holographic:    '#FFFFFF',
    rose_gold_foil: '#B76E79',
  }
  return new THREE.MeshPhysicalMaterial({
    color:       new THREE.Color(foilColors[foil]),
    metalness:   1.0,
    roughness:   foil === 'holographic' ? 0.0 : 0.08,
    reflectivity:1.0,
    clearcoat:   foil === 'holographic' ? 1.0 : 0.3,
    iridescence: foil === 'holographic' ? 1.0 : 0,
  })
}

export function getBaseColor(material: Material): string {
  return BASE_COLORS[material]
}
