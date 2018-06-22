import React from 'react';
import Link from 'next/link';

export default ({ pathname }) => (
  <footer>
    <span >Copyrights Orathaiphathai 2018</span>
    <Link href='/privacy'>
      <a>Privacy Policy</a>
    </Link>
    <Link href='/mcookies'>
      <a  >Manage cookies</a>
    </Link>  
  </footer>
)