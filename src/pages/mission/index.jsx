import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {MissionView} from 'src/sections/mission/view/mission-view'



// ----------------------------------------------------------------------

const metadata = { title: `Mission - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

     <MissionView/>
    </>
  );
}
