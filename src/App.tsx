import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Backdrop from '@/components/Backdrop';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import HeartField from '@/components/HeartField';
import PlaceholderPage from '@/components/PlaceholderPage';
import TopBar from '@/components/TopBar';
import { hasVisitedCelebration } from '@/lib/celebrationVisit';
import Celebration from '@/pages/Celebration';
import NotFound from '@/pages/NotFound';
import Proposal from '@/pages/Proposal';
import Uptime from '@/pages/Uptime';

function AppShell() {
  const location = useLocation();
  const { pathname } = location;
  const isBareScreen = pathname === '/' || pathname === '/celebration';
  const showAmbientHearts = pathname !== '/celebration' && hasVisitedCelebration();

  return (
    <div className="relative flex min-h-dvh flex-col">
      <Backdrop />
      <CustomCursor />
      {showAmbientHearts && <HeartField variant="ambient" />}
      {!isBareScreen && <TopBar />}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="relative flex flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Proposal />} />
            <Route path="/celebration" element={<Celebration />} />
            <Route path="/letter" element={<PlaceholderPage title="Letter" file="letter.md" />} />
            <Route path="/memories" element={<PlaceholderPage title="Memories" file="memories.jpg" />} />
            <Route path="/git-log" element={<PlaceholderPage title="Git log" file="git-log" />} />
            <Route path="/readme" element={<PlaceholderPage title="README" file="README.md" />} />
            <Route path="/reasons" element={<PlaceholderPage title="Reasons" file="reasons.ts" />} />
            <Route path="/sla" element={<PlaceholderPage title="SLA" file="SLA.md" />} />
            <Route path="/uptime" element={<Uptime />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!isBareScreen && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AppShell />
      </MotionConfig>
    </BrowserRouter>
  );
}
