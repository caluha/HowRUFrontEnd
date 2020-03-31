import React from 'react';
import './Toolbar.css'
import DrawerToToggle from '../SideDrawer/DrawerToToggle';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_navigation">
      <div>
        <DrawerToToggle click={props.drawerClickHandler}/>
      </div>
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