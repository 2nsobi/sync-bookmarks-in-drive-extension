import { Center, Group } from '@mantine/core';
import { CreateFile } from '../components/create_sync'
import { SelectFile } from '../components/select_sync'
import { Header } from '../components/header'
import { WarningOverlay } from '../components/warning_overlay'
import { useState } from 'react';

export const Home = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Header />
            <div className="card">
                <Center>
                    <Group gap={60}>
                        <CreateFile />
                        <SelectFile action={() => setVisible((v) => !v)} />
                    </Group>
                </Center>
            </div>
            {visible && <WarningOverlay yesAction={() => setVisible((v) => !v)} noAction={() => setVisible((v) => !v)} />}
        </>
    )
}