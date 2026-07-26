export interface PackagingConfig {
    dimensions: {
        height: number;
        width: number;
        depth: number;
        unit: "mm" | "in";
    };
    boxType: "box" | "card" | "bag" | "rigid";
    materialColor: string;
    finish: "matte" | "gloss";
    foilEffect: boolean;
    texturePreset: "solid" | "kraft" | "subtle-grain";
    logo: {
        file: string | null;
        position: [number, number]; // [x, y]
        scale: number;
        face: "front" | "back" | "top" | "inside";
    };
    watermarkEnabled: boolean;
    contactInfo?: {
        name: string;
        email: string;
        company: string;
        quantity: number;
        notes?: string;
    };
}
