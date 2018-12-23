import {Navbar,NavItem,Icon,Dropdown,Button} from 'react-materialize'
import React from 'react'

const TopBar = ({openRules}) => (
    <div className='nav-container'>
        <Navbar brand='EPIDEMIC' right>
            <NavItem 
            onClick={(e)=>{
                e.preventDefault();
                openRules();
            }}><Icon>book</Icon></NavItem>
            
            <Dropdown trigger={  
                <NavItem><Icon>settings</Icon></NavItem>
            }>
            <NavItem>one</NavItem>
            <NavItem>two</NavItem>
            <NavItem divider />
            <NavItem>three</NavItem>
            </Dropdown>
        </Navbar>
    </div>
)

export default TopBar;