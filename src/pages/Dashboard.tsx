import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CursorShadow } from '@/components/CursorShadow';
import { AmbientGrid } from '@/components/AmbientGrid';
import { Header } from '@/components/Header';
import { UploadCard } from '@/components/UploadCard';
import { RecentUploads } from '@/components/RecentUploads';
import { AuthModal } from '@/components/AuthModal';
import { Button } from '@/components/Button';
import { useSession } from '@/contexts/SessionContext';
import { useToast } from '@/components/Toast';

interface Upload {
  name: string;
  size: number;
}

const Dashboard = () => {
  const { isAuthed } = useSession();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    if (!isAuthed) {
      navigate('/');
    }
  }, [isAuthed, navigate]);

  const handleFileSelect = (file: File) => {
    setUploads(prev => [{ name: file.name, size: file.size }, ...prev]);
  };

  const handleApply = () => {
    showToast('Main program coming soon');
  };

  if (!isAuthed) return null;

  return (
    <>
      <CursorShadow />
      <AmbientGrid />
      
      {/* Background gradients */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(220 60% 12% / 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(199 60% 20% / 0.2) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative min-h-screen">
        <Header onLoginClick={() => setAuthModalOpen(true)} />

        <main className="container mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
          <UploadCard onFileSelect={handleFileSelect} />
          
          <RecentUploads uploads={uploads} />

          {uploads.length > 0 && (
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleApply}
              className="mt-8"
            >
              Apply
            </Button>
          )}
        </main>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ToastContainer />
    </>
  );
};

export default Dashboard;
