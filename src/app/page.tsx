import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Team from "@/components/Team";
import Join from "@/components/Join";
import Blog from "@/components/Blog";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div className="flex flex-col scroll-smooth">
      <Hero />
      <About />
      <Events />
      <Team />
      <Blog />
      <Gallery />
      <Join />
    </div>
  );
}