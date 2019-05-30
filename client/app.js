import React, { Component } from 'react';

// Components
import Router from './router';
import NavBar from './components/nav/navbar';
import Footer from './components/footer/footer';

// Styles
import './app.less'; // Global app css
import 'antd/dist/antd.css'; // Ant Design app less

class App extends Component {
  render = () => {
    return (
      <div className="app-container">
        <NavBar />
        <Router />
        <Footer />
      </div>
    );
  };
}

export default App;
