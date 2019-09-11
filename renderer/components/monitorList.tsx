import { Parameter } from '../../shared/types';
import { useHover } from '../hooks/useHover';
import { H5, Colors, Classes } from '@blueprintjs/core';
import { Virtuoso } from 'react-virtuoso';

type Props = { params: Parameter[] };

const MonitorList: React.FC<Props> = ({ params }) => {
	return <Virtuoso style={{ flexGrow: 1 }} totalCount={params.length} item={(idx) => <Item param={params[idx]} />} />;
};

type ItemProps = { param: Parameter };
const Item: React.FC<ItemProps> = ({ param }) => {
	const [ ref, isHovered ]: any = useHover();

	return (
		<div
			key={name}
			ref={ref}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				verticalAlign: 'middle',
				alignItems: 'center',
				backgroundColor: `${isHovered ? '#00e3e3' : Colors.LIGHT_GRAY1}`,
				borderBottom: '1px'
			}}
		>
			<H5 style={{ marginLeft: '1rem', marginTop: '5px' }}>{param.name}</H5>
			<H5 style={{ marginRight: '1rem', marginTop: '5px' }}>{param.val}</H5>
		</div>
	);
};

export default MonitorList;
