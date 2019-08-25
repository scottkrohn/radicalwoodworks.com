const NAV = {
  pages: {
    home: {
      key: 'home',
      label: 'Home',
      path: '',
    },
    about: {
      key: 'about',
      label: 'About Us',
      path: 'about',
    },
    contact: {
      key: 'contact',
      label: 'Contact',
      path: 'contact',
    },
    products: {
      key: 'products',
      label: 'Products',
      path: 'products',
    },
    faq: {
      key: 'faq',
      label: 'FAQ',
      path: 'faq',
    },
    login: {
      key: 'login',
      label: 'Login',
      path: 'login',
    },
    logout: {
      key: 'logout',
      label: 'Logout',
      path: '',
    },
    admin: {
      key: 'admin',
      label: 'Admin',
      path: 'admin',
    },
  },
  navBarLinks: {
    mainNav: [
      {
        label: 'Home',
        path: '/',
        value: 'home',
      },
      {
        label: 'Products',
        path: '/products',
        value: 'products',
      },
      {
        label: 'About Us',
        path: '/about',
        value: 'about',
      },
      {
        label: 'Contact',
        path: '/contact',
        value: 'contact',
      },
      {
        label: 'FAQ',
        path: '/faq',
        value: 'faq',
      },
    ],
    accountNav: {
      login: {
        label: 'Login',
        path: '/login',
        value: 'login',
      },
      admin: {
        label: 'Admin',
        path: '/admin',
        value: 'admin',
      },
      logout: {
        label: 'Logout',
        path: 'javascript:;',
        value: 'logout',
      },
    },
  },
};

export default NAV;
