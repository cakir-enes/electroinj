import { Alignment, Button, Navbar } from '@blueprintjs/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useObservable, observer } from 'mobx-react-lite';

const NavBar = observer(() => {
	const store = useObservable({ page: 'home' });
	useEffect(
		() => {
			console.log(`New page ${store.page}`);
		},
		[ store.page ]
	);
	const pageSetter = (p: string) => {
		return () => {
			console.log(p);
			store.page = p;
		};
	};
	return (
		<Navbar>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>{store.page}</Navbar.Heading>
				<Navbar.Divider />
				<Link href="/monitor">
					<Button className="bp3-minimal" icon="document" text="Monitor" onClick={pageSetter('Mon')} />
				</Link>
				<Link href="/selection">
					<Button className="bp3-minimal" icon="document" text="Select" onClick={pageSetter('Select')} />
				</Link>
			</Navbar.Group>
		</Navbar>
	);
});
export default NavBar;
