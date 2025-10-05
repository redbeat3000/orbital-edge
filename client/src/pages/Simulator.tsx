import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OrbitSimulator from "@/components/OrbitSimulator";

export default function Simulator() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20">
        <OrbitSimulator />
      </div>

      <Footer />
    </div>
  );
}
