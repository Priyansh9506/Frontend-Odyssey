import Era1_Arpanet from "@/components/sections/Era1_Arpanet";
import Transition_Era1_to_Era2 from "@/components/sections/Transition_Era1_to_Era2";
import Era2_DotCom from "@/components/sections/Era2_DotCom";
import Era3_Web2 from "@/components/sections/Era3_Web2";
import Era4_Web3 from "@/components/sections/Era4_Web3";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center">
      {/* Hero / Era 1: ARPANET to WWW */}
      <Era1_Arpanet />

      {/* Timeline Transition animation */}
      <Transition_Era1_to_Era2 />

      {/* Era 2: Dot Com Bubble */}
      <Era2_DotCom />

      {/* Era 3: Web 2.0 / Platforms */}
      <Era3_Web2 />

      {/* Era 4: Web 3 / Metaverse Finale */}
      <Era4_Web3 />
    </main>
  );
}

