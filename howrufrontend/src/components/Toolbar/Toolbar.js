import React from 'react';
import './Toolbar.css'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_navigation">
      <div></div>
      <div className="toolbar_logo"><a href="/">HowRU</a></div>
      <div className="spacer"></div>
      <div className="toolbar_navigation-items">
        <ul>
          <li><a href="/">Feelz</a></li>
          <li><a href="/">User</a></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default toolbar;