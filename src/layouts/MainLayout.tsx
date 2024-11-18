import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-wrapper">
        <main className="content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
