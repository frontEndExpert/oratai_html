import React from 'react';
import Header from './header';
import Nav from './nav';
import Footer from './footer';

const App = ({ children }) => (
  <main>
    <Header />
    <Nav />
    {children}
    <Footer />
  </main>
)

export default App
