import { useState, useCallback, useRef, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Parameter } from '../../shared/types';

export function useHover() {
	const [ value, setValue ] = useState(false);

	// Wrap in useCallback so we can use in dependencies below
	const handleMouseOver = useCallback(() => setValue(true), []);
	const handleMouseOut = useCallback(() => setValue(false), []);

	// Keep track of the last node passed to callbackRef
	// so we can remove its event listeners.
	const ref = useRef(null);

	// Use a callback ref instead of useEffect so that event listeners
	// get changed in the case that the returned ref gets added to
	// a different element later. With useEffect, changes to ref.current
	// wouldn't cause a rerender and thus the effect would run again.
	const callbackRef = useCallback(
		(node) => {
			if (ref.current) {
				ref.current.removeEventListener('mouseover', handleMouseOver);
				ref.current.removeEventListener('mouseout', handleMouseOut);
			}

			ref.current = node;

			if (ref.current) {
				ref.current.addEventListener('mouseover', handleMouseOver);
				ref.current.addEventListener('mouseout', handleMouseOut);
			}
		},
		[ handleMouseOver, handleMouseOut ]
	);

	return [ callbackRef, value ];
}

export const useParameters = () => {
	const [ params, setParams ] = useState(
		Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' } as Partial<Parameter>))
	);
	useEffect(() => {
		ipcRenderer.on('update', (event, arg) => {
			setParams(arg);
		});

		const tok = setInterval(() => {
			// setParams(params.map((i) => ({ ...i, val: Math.random().toFixed(0) })));
			ipcRenderer.send('update');
		}, 100 / 10);
		return () => {
			console.log('CLEARING SHIT');
			clearInterval(tok);
		};
	}, []);
	return params;
};
