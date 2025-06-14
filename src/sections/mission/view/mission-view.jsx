import { WhyChooseBlooms } from "src/sections/achievement/why-choose-blooms";

import { MissionHero } from "../mission-hero";
import { MissionContext } from "../mission-context";



export function MissionView() {
  return (
    <>
    <MissionHero/>
    <MissionContext/>
    <WhyChooseBlooms/>
    </>
    
  );
}
