import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import DeveloperSection from "./DeveloperSection";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Developer Intro Section */}
      <DeveloperSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
