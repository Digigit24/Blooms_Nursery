import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {AchievementView} from 'src/sections/achievement/view/achievement-view'


// ----------------------------------------------------------------------

const metadata = { title: `Achievement - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AchievementView/>

      
    </>
  );
}
