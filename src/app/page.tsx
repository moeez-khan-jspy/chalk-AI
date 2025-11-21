import HeroSection from '@/components/hero-section/page';
import SubjectsSection from '@/components/subjects-section/page';
import VideoSectionLanding from '@/components/video-section-landing/page';
import LandingSecondComponent from '@/components/landing-second-component/page';
import Footer from '@/components/footer/page';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SubjectsSection />
      <LandingSecondComponent />
      <VideoSectionLanding />
      <Footer />
    </main>
  );
}

