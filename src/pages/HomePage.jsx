import SlideShow from '../components/SlideShow';
import HeroSection from '../components/HeroSection';
import Service from '../components/Service';
import FeatureProduct from '../components/FeatureProduct';
import Customers from '../components/Customers';
import RatingCustomer from '../components/RatingCustomer';

export default function HomePage() {
  return (
    <main>
      <SlideShow />
      <HeroSection />
      <Service />
      <FeatureProduct />
      <Customers />
      <RatingCustomer />
    </main>
  );
}