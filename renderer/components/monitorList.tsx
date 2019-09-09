import { Param } from '../../shared/types';
import { useHover } from '../hooks/useHover';
import { H5, Colors, Classes } from '@blueprintjs/core';
import { Virtuoso } from 'react-virtuoso';

type Props = { params: Param[] };

const MonitorList: React.FC<Props> = ({ params }) => {
	return <Virtuoso style={{ flexGrow: 1 }} totalCount={params.length} item={(idx) => <Item param={params[idx]} />} />;
};

type ItemProps = { param: Param };
const Item: React.FC<ItemProps> = ({ param }) => {
	const [ ref, isHovered ]: any = useHover();

	return (
		<li
			key={name}
			ref={ref}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: `${isHovered ? '#00e3e3' : Colors.LIGHT_GRAY1}`
			}}
		>
			<H5 style={{ marginLeft: '1rem' }}>{param.name}</H5>
			<H5 style={{ marginRight: '1rem' }}>{param.val}</H5>
		</li>
	);
};

export default MonitorList;
