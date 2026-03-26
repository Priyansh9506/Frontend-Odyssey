import Era1_Arpanet from "@/components/sections/Era1_Arpanet";
import Era2_WWW from "@/components/sections/Era2_WWW";
import RetroWeb from "@/components/sections/RetroWeb";
import Era3_BubbleBurst from "@/components/sections/Era3_BubbleBurst";
import Era4_Web2 from "@/components/sections/Era4_Web2";
import Era5_SocialMedia from "@/components/sections/Era5_SocialMedia";
import Era6_Web3 from "@/components/sections/Era6_Web3";
import Era7_Web3Burst from "@/components/sections/Era7_Web3Burst";
import PageUnfurl from "@/components/PageUnfurl";

const Home = () => {
  return (
    <>
      <PageUnfurl>
        <main className="relative w-full flex flex-col items-center">
          {/* Hero / Era 1: ARPANET to WWW */}
          <Era1_Arpanet />
        </main>
      </PageUnfurl>

      {/* Subsequent Eras run natively outside the PageUnfurl scope */}
      <div className="relative w-full flex flex-col items-center z-20">
        {/* Era 2: The World Wide Web & Dot-Com Boom */}
        <Era2_WWW />

        {/* Interactive Web 1.0 Retro Break */}
        <RetroWeb />

        {/* Era 3: The Dot-Com Crash */}
        <Era3_BubbleBurst />

        {/* Era 4: Web 2.0 & Social Media Pioneers */}
        <Era4_Web2 />

        {/* Era 5: Facebook Dominance & Acquisitions */}
        <Era5_SocialMedia />

        {/* Era 6: Web 3.0 - The Decentralized Dream */}
        <Era6_Web3 />

        {/* Era 7: The Web 3.0 Bubble Burst */}
        <Era7_Web3Burst />
      </div>
    </>
  );
}



export default Home;
