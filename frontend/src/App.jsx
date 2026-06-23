import { useEffect } from 'react';
import apiClient from './lib/axios';

function App() {
  useEffect(() => {
    apiClient.get('/test')
      .then(res => console.log('API test success:', res.data))
      .catch(err => console.error('API test failed:', err));
  }, []);

  return (
   <>
   
   </>
  );
}

export default App;