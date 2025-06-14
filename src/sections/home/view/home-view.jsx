// import { Footer } from 'src/layouts/main/footer';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeMinimal } from '../home-minimal';
import { HomePricing } from '../home-pricing';
import { useGetProducts } from '../../../actions/product';
import ProductDetails from '../../product/ProductDetails';
import { ProductShopView } from '../../product/view/product-shop-view';


// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();
  const { products, productsLoading } = useGetProducts();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />
      <HomeHero/>
      <ProductDetails/>
      
      <ProductShopView products={products} loading={productsLoading}/>
      <HomeMinimal/>
      <HomePricing/>
      {/* <Footer/> */}
      
    </>
  );
}
