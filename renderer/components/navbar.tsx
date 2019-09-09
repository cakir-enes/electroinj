import { Alignment, Button, Navbar } from '@blueprintjs/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NavBar = () => {
    const [page, setPage] = useState()
    useEffect(() => {
        console.log(`New page ${page}`)
    }, [page])
    const pageSetter = (p: string) => {

        return () => { console.log(p); setPage(p) }
    }
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>{page}</Navbar.Heading>
                <Navbar.Divider />
                <Link href='/monitor'><Button className="bp3-minimal" icon="document" text="Monitor" onClick={pageSetter('Mon')} /></Link>
                <Link href='/selection'><Button className="bp3-minimal" icon="document" text="Select" onClick={pageSetter('Select')} /></Link>
            </Navbar.Group>
        </Navbar>
    )
}
export default NavBar
