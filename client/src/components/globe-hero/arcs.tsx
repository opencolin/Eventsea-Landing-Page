import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ARCS, CITIES, latLngToVec3 } from "./cities";

type ArcData = {
  curve: THREE.QuadraticBezierCurve3;
  positions: Float32Array;
  totalPoints: number;
  startOffset: number;
  speed: number;
  color: THREE.Color;
};

const SEGMENTS = 80;
const COLORS = ["#38bdf8", "#34d399", "#a78bfa", "#fb7185", "#fcd34d"];

function buildArc(a: THREE.Vector3, b: THREE.Vector3): THREE.QuadraticBezierCurve3 {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  // distance-based lift so longer arcs bow further from the surface
  const distance = a.distanceTo(b);
  const lift = 1 + 0.35 + distance * 0.4;
  mid.normalize().multiplyScalar(lift);
  return new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone());
}

export default function Arcs() {
  const arcs = useMemo<ArcData[]>(() => {
    return ARCS.map(([i, j], idx) => {
      const a = new THREE.Vector3(...latLngToVec3(CITIES[i].lat, CITIES[i].lng, 1.001));
      const b = new THREE.Vector3(...latLngToVec3(CITIES[j].lat, CITIES[j].lng, 1.001));
      const curve = buildArc(a, b);
      const pts = curve.getPoints(SEGMENTS);
      const positions = new Float32Array(pts.length * 3);
      pts.forEach((p, k) => {
        positions[k * 3] = p.x;
        positions[k * 3 + 1] = p.y;
        positions[k * 3 + 2] = p.z;
      });
      return {
        curve,
        positions,
        totalPoints: pts.length,
        startOffset: (idx * 0.13) % 1,
        speed: 0.18 + (idx % 5) * 0.04,
        color: new THREE.Color(COLORS[idx % COLORS.length]),
      };
    });
  }, []);

  // Static arc paths (faint base lines) — pre-built as THREE.Line objects to
  // sidestep the JSX <line> / SVG name collision in R3F's typings
  const baseLines = useMemo(
    () =>
      arcs.map((arc) => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(arc.positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: arc.color,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        return new THREE.Line(geom, mat);
      }),
    [arcs],
  );

  // Pulse heads
  const pulseGroup = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pulseGroup.current) return;
    const t = clock.elapsedTime;
    pulseGroup.current.children.forEach((child, idx) => {
      const arc = arcs[idx];
      const u = ((t * arc.speed + arc.startOffset) % 1);
      const p = arc.curve.getPoint(u);
      child.position.set(p.x, p.y, p.z);
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      const fade = Math.sin(u * Math.PI);
      mat.opacity = 0.6 + 0.4 * fade;
      (child as THREE.Mesh).scale.setScalar(0.012 + 0.018 * fade);
    });
  });

  return (
    <group>
      {/* Base arc lines */}
      {baseLines.map((lineObj, idx) => (
        <primitive key={`base-${idx}`} object={lineObj} />
      ))}

      {/* Pulse heads */}
      <group ref={pulseGroup}>
        {arcs.map((arc, idx) => (
          <mesh key={`pulse-${idx}`}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial
              color={arc.color}
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* City pins */}
      {CITIES.map((c, idx) => {
        const [x, y, z] = latLngToVec3(c.lat, c.lng, 1.012);
        return (
          <group key={c.name} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.012, 12, 12]} />
              <meshBasicMaterial
                color={COLORS[idx % COLORS.length]}
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* halo */}
            <mesh>
              <sphereGeometry args={[0.028, 16, 16]} />
              <meshBasicMaterial
                color={COLORS[idx % COLORS.length]}
                transparent
                opacity={0.25}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
