import { Noise } from "../effects/Noise";
import { Aurora } from "../effects/Aurora";
import { CursorGlow } from "../effects/CursorGlow";

export function Background() {
  return (
    <>
      <div className="fixed inset-0 z-[-10] bg-background pointer-events-none" />
      <Aurora />
      <CursorGlow />
      <Noise />
    </>
  );
}
