import React from 'react';
import Link from 'next/link';

export default ({ pathname }) => (
  <footer>
    <span >Copyrights Orathaiphathai 2018</span>
    <Link href='/privacy'>
      <a className={pathname === '/privacy' ? 'is-active' : ''}>Privacy Policy</a>
    </Link>
    <Link href='/mcookies'>
      <a className={pathname === '/mcookies' ? 'is-active' : ''}>Manage cookies</a>
    </Link>  
  </footer>
)