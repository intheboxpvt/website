import { BoxType, Material, Finish, FoilEffect, PrintingSide } from "./types";

export interface ConfigTemplate {
  id:           string;
  name:         string;
  description:  string;
  previewImage: string;
  config: {
    boxType:      BoxType;
    dimensions:   { length: number; width: number; height: number; unit: "mm" };
    material:     Material;
    finish:       Finish;
    foilEffect:   FoilEffect;
    printingSide: PrintingSide;
    quantity:     number;
  };
}

export const TEMPLATES: ConfigTemplate[] = [
  {
    id: "luxury-black-rigid",
    name: "Luxury Black Rigid Box",
    description: "Two-piece rigid box with soft-touch matte and gold foil.",
    previewImage: "/images/templates/luxury-black-rigid.svg",
    config: {
      boxType: "rigid_lid_base",
      dimensions: { length: 200, width: 150, height: 80, unit: "mm" },
      material: "black_cardboard",
      finish: "soft_touch",
      foilEffect: "gold_foil",
      printingSide: "outside",
      quantity: 500,
    },
  },
  {
    id: "eco-kraft-mailer",
    name: "Eco Kraft Mailer",
    description: "Sustainable e-commerce shipper with natural kraft finish.",
    previewImage: "/images/templates/eco-kraft-mailer.svg",
    config: {
      boxType: "mailer",
      dimensions: { length: 300, width: 200, height: 100, unit: "mm" },
      material: "kraft",
      finish: "no_finish",
      foilEffect: "none",
      printingSide: "outside",
      quantity: 1000,
    },
  },
  {
    id: "white-perfume-matte",
    name: "White Matte Perfume Box",
    description: "Classic tall tuck-end with matte lamination and silver foil.",
    previewImage: "/images/templates/white-perfume-matte.svg",
    config: {
      boxType: "perfume",
      dimensions: { length: 60, width: 60, height: 120, unit: "mm" },
      material: "white_cardboard",
      finish: "matte_lamination",
      foilEffect: "silver_foil",
      printingSide: "outside",
      quantity: 500,
    },
  },
  {
    id: "holographic-gift",
    name: "Holographic Gift Box",
    description: "Wide shallow gift box with gloss lamination and holographic foil.",
    previewImage: "/images/templates/holographic-gift.svg",
    config: {
      boxType: "gift",
      dimensions: { length: 250, width: 200, height: 60, unit: "mm" },
      material: "white_cardboard",
      finish: "gloss_lamination",
      foilEffect: "holographic",
      printingSide: "both",
      quantity: 500,
    },
  },
  {
    id: "kraft-drawer",
    name: "Kraft Drawer Box",
    description: "Sliding drawer box in natural kraft. Minimal and modern.",
    previewImage: "/images/templates/kraft-drawer.svg",
    config: {
      boxType: "drawer",
      dimensions: { length: 150, width: 100, height: 50, unit: "mm" },
      material: "kraft",
      finish: "aqueous_coating",
      foilEffect: "none",
      printingSide: "outside",
      quantity: 500,
    },
  },
  {
    id: "rose-gold-sleeve",
    name: "Rose Gold Sleeve Box",
    description: "Elegant sleeve with rose gold foil stamping.",
    previewImage: "/images/templates/rose-gold-sleeve.svg",
    config: {
      boxType: "sleeve",
      dimensions: { length: 120, width: 90, height: 40, unit: "mm" },
      material: "white_cardboard",
      finish: "soft_touch",
      foilEffect: "rose_gold_foil",
      printingSide: "outside",
      quantity: 300,
    },
  },
];
