import React from 'react';
import Routes from './routes';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="content" style={{ marginLeft: '200px', padding: '1rem' }}>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
