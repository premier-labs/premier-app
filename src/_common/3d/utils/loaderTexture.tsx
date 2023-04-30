import { CanvasTexture, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const textureLoaderCache: { [key: string]: THREE.Texture } = {};

export function useTextures(texturesPath: string): THREE.Texture;
export function useTextures(texturesPath: string[]): THREE.Texture[];

export function useTextures(texturesPath: string | string[]): THREE.Texture | THREE.Texture[] {
  const textures = useTexture(texturesPath);

  if (Array.isArray(textures)) {
    textures.forEach((item, index) => {
      item.flipY = false;
      textureLoaderCache[texturesPath[index]] = item;
    });
  } else {
    textures.flipY = false;
    textureLoaderCache[texturesPath as string] = textures;
  }
  return textures;
}

const textureLoader = new TextureLoader();

export const loadTextureToObject = (texturePath: string, ref: any) => {
  const cachedTexture = textureLoaderCache[texturePath];
  if (cachedTexture) {
    if (ref.current) {
      ref.current.material.map = cachedTexture;
      ref.current.material.needsUpdate = true;
    }
    return;
  }

  textureLoader.load(texturePath, (t) => {
    t.flipY = false;

    textureLoaderCache[texturePath] = t;

    if (ref.current) {
      ref.current.material.map = t;
      ref.current.material.needsUpdate = true;
    }
  });
};

const canvasTextureLoaderCache: { [key: number | string]: THREE.CanvasTexture } = {};
export const loadTextureTextToObject = (
  dripId: number,
  dropId: number,
  totalSupply: number,
  ref: any
) => {
  const cachedTexture = canvasTextureLoaderCache[dripId];
  if (cachedTexture) {
    ref.current.map = cachedTexture;
    ref.current.map.needsUpdate = true;
    return;
  }

  ref.current.map = generatesCanvasTexture(dripId, dropId, totalSupply);
  ref.current.map.needsUpdate = true;
};

export const generatesCanvasTexture = (dripId: number, dropId: number, totalSupply: number) => {
  const _dropId = "DROP #" + dropId;
  const dripIdSupply = `${dripId} / ${totalSupply}`;

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d") as any;
  ctx.canvas.width = 500;
  ctx.canvas.height = 500;
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.font = "700 15px wide";
  ctx.fillText(_dropId, ctx.canvas.width / 2, ctx.canvas.height / 2 + 125);
  ctx.font = "700 15px wide";
  ctx.fillText(dripIdSupply, ctx.canvas.width / 2, ctx.canvas.height / 2 + 150);

  return new CanvasTexture(canvas);
};

export default useTexture;
