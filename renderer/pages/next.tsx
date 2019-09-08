import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Page from '../layouts';

const Next = () => {
	return (
		<Page>
			<Head>
				<title>Next - Nextron (with-typescript)</title>
			</Head>
			<div>
				<p>
					⚡ Electron + Next.js ⚡ -
					<Link href="/home">
						<a>Go to home page</a>
					</Link>
				</p>
			</div>
		</Page>
	);
};

export default Next;
