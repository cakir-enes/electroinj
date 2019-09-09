import React, { useState } from 'react'
import Page from '../layout';
import MonitorList from '../components/monitorList';
import { Param } from '../../shared/types';

const Monitor = () => {
    const [params, setParams] = useState(
        Array.from({ length: 150 }).map((_, i) => ({ name: 'aa' + i, val: 'sdf' } as Param))
    );
    return (
        <Page>
            <MonitorList params={params} />
        </Page>
    )
}

export default Monitor