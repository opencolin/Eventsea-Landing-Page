import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_SPECULAR =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_NORMAL =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_normal_2048.jpg";

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPositionW;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vPositionW = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uGlowColor;
  uniform float uIntensity;
  uniform float uPower;
  uniform vec3 uCameraPos;
  varying vec3 vNormal;
  varying vec3 vPositionW;

  void main() {
    vec3 viewDir = normalize(uCameraPos - vPositionW);
    float fres = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uPower);
    vec3 col = uGlowColor * fres * uIntensity;
    gl_FragColor = vec4(col, fres);
  }
`;

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmoRef = useRef<THREE.ShaderMaterial>(null);

  const [colorMap, specMap, normalMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURE,
    EARTH_SPECULAR,
    EARTH_NORMAL,
  ]);

  // Ensure correct color space for the albedo texture
  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.anisotropy = 8;
  }, [colorMap]);

  const atmoUniforms = useMemo(
    () => ({
      uGlowColor: { value: new THREE.Color("#3aa0ff") },
      uIntensity: { value: 1.4 },
      uPower: { value: 2.6 },
      uCameraPos: { value: new THREE.Vector3() },
    }),
    [],
  );

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.06;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = t * 0.075;
    }
    if (atmoRef.current) {
      (atmoRef.current.uniforms.uCameraPos.value as THREE.Vector3).copy(camera.position);
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 96, 96]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          specular={new THREE.Color("#2244aa")}
          shininess={18}
        />
      </mesh>

      {/* Inner atmosphere */}
      <mesh scale={1.045}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={atmoRef}
          uniforms={atmoUniforms}
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Outer halo */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          uniforms={{
            uGlowColor: { value: new THREE.Color("#1d6df0") },
            uIntensity: { value: 0.55 },
            uPower: { value: 3.2 },
            uCameraPos: atmoUniforms.uCameraPos,
          }}
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
