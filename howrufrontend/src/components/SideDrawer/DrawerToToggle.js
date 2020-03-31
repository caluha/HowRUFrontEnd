import React from 'react';
import './DrawerToToggle.css';

const drawerToToggle = props => (
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button_line"/>
        <div className="toggle-button_line"/>
        <div className="toggle-button_line"/>
    </button> 
)

export default drawerToToggle;