import Era1_Arpanet from "@/components/sections/Era1_Arpanet";
import Era2_WWW from "@/components/sections/Era2_WWW";
import RetroWeb from "@/components/sections/RetroWeb";
import Era3_BubbleBurst from "@/components/sections/Era3_BubbleBurst";
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
      </div>
    </>
  );
}



export default Home;
