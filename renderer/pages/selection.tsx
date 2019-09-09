import React, { useState } from 'react';
import Page from '../layout';
import ParamTree from '../components/antTree';

const pp = { FTE: [ 'A.B.C.D', 'A.B.C', 'A.B.C.E', 'E.F.C', 'E.F.C.D.E' ] };
const Selection = () => {
	const [ checked, setChecked ] = useState([]);
	return (
		<Page>
			<ParamTree params={pp} checked={checked} setChecked={(c) => setChecked(c)} />
		</Page>
	);
};

export default Selection;
