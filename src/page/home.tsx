import { useTitle } from "@/hooks/Title"
import AboutSection from "./home/about"
import ContactSection from "./home/final"
import HeroSection from "./home/hero"
import RepositorySection from "./home/repository"

export default function Home() {
  useTitle("Ocean - Home")

  return <>
    <HeroSection />
    <AboutSection />
    <RepositorySection />
    <ContactSection />
  </>
}