import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Portfolio } from '../pages/Portfolio';
import { ProjectDetail } from '../pages/ProjectDetail';
import { Capabilities } from '../pages/Capabilities';
import { Contact } from '../pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0e27] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}