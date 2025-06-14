import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {VisionView} from 'src/sections/vision/view/vision-view'



// ----------------------------------------------------------------------

const metadata = { title: `Vision - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

     <VisionView/>
    </>
  );
}
