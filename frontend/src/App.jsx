import { useEffect } from 'react';
import apiClient from './lib/axios';

function App() {
  useEffect(() => {
    apiClient.get('/test')
      .then(res => console.log('API test success:', res.data))
      .catch(err => console.error('API test failed:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F9FAFB] flex items-center justify-center">
      <p>Co‑Trader — API connection test. Open console to verify.</p>
    </div>
  );
}

export default App;