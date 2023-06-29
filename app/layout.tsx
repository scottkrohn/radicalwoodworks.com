import React from 'react';
import Navbar from "@components/nav/navbar";
import Footer from "@components/footer/footer";

const Layout = ({children}) => {
  return (
    <html>
    <head>
      <title>My App</title>
    </head>
    <body>
    <Navbar/>
    {children}
    <Footer/>
    </body>
    </html>
  );
}

export default Layout;