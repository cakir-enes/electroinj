import React from 'react'
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import Link from 'next/link';

const NavBar = () => (
    <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>MON</Navbar.Heading>
            <Navbar.Divider />
            <Link href='/home'><Button className="bp3-minimal" icon="home" text="Home" /></Link>
            <Link href='/monitor'><Button className="bp3-minimal" icon="document" text="Files" /></Link>
        </Navbar.Group>
    </Navbar>
)
export default NavBar
