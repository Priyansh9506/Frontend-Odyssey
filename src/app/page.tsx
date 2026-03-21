import Era1_Arpanet from "@/components/sections/Era1_Arpanet";
import PageUnfurl from "@/components/PageUnfurl";
// import Transition_Era1_to_Era2 from "@/components/sections/Transition_Era1_to_Era2";
// import Era2_DotCom from "@/components/sections/Era2_DotCom";
// import Era3_Web2 from "@/components/sections/Era3_Web2";
// import Era4_Web3 from "@/components/sections/Era4_Web3";

const Home = () => {
  return (
    <PageUnfurl>
      <main className="relative w-full flex flex-col items-center">
        {/* Hero / Era 1: ARPANET to WWW */}
        <Era1_Arpanet />

      {/* 
      <Transition_Era1_to_Era2 />
      <Era2_DotCom />
      <Era3_Web2 />
      <Era4_Web3 /> 
      */}
    </main>
    </PageUnfurl>
  );
}



export default Home;
