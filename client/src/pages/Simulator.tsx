import Navigation from "../Navigation";
import Footer from "../Footer";
import OrbitSimulator from "../OrbitSimulator";

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
