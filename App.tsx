
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Community from './pages/Community';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Assistant from './pages/Assistant';
import EnglishAssistantChat from './components/EnglishAssistantChat';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const isAssistantPage = pathname === '/assistant';

  React.useEffect(() => {
    // إظهار لودر خفيف عند كل تغيير في المسار
    setIsLoading(true);
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-arabic bg-white text-slate-900 dark:bg-brand-navy dark:text-slate-50 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      {isLoading && <PageLoader />}
      <main className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/community" element={<Community />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </main>
      {!isAssistantPage && <Footer />}
      <EnglishAssistantChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;

