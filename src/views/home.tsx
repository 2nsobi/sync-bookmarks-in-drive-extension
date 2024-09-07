import { Center, Group, Divider, Text, Textarea, Flex } from '@mantine/core';
import { CreateFile } from '../components/create_sync'
import { SelectFile, WarningOverlay } from '../components/select_sync'
import { Header } from '../components/header'
import { useState } from 'react';

export const Home = () => {
    const [warningVisible, setWarningVisible] = useState(false);
    // const [syncFileUrlVisible, setSyncFileUrlVisible] = useState(true);
    const [syncFileUrlVisible, _] = useState(true);
    const temp_url = 'https://docs.google.com/spreadsheets/d/1aIwfoZgs6RudKdSchg--tuj3RxtB90cBFvnAj3rfUmc/edit?gid=837567275#gid=837567275'

    return (
        <>
            <Header />
            <div className="card">
                <Center>
                    <Group gap={80}>
                        <CreateFile />
                        <SelectFile action={() => setWarningVisible((v) => !v)} />
                    </Group>
                </Center>
            </div>
            {
                syncFileUrlVisible
                && (
                    <>
                        <Divider className='no-margin' my="md" />
                        <div className="card left-text">
                            <Group gap={0}>
                                <Text>- <a href={temp_url} target="_blank">CURRENT SYNC FILE</a></Text>
                                <Text>- <a href={temp_url} target="_blank">OLD BOOKMARKS (DAY OLD BACKUP)</a></Text>
                            </Group>
                        </div>
                    </>
                )
            }
            <Divider className='no-margin' my="md" />
            <div className="card">
                <Flex
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                >
                    <Text style={{ color: 'lightgray' }}>LOGS :</Text>
                    <Textarea
                        h={100}
                        w='100%'
                        styles={{
                            wrapper: { height: '100%', width: '100%' },
                            input: { height: '100%', width: '100%' }
                        }}
                        disabled
                        value={'testing...'} />
                </Flex>
            </div>
            {warningVisible && <WarningOverlay closeAction={() => setWarningVisible((v) => !v)} />}
        </>
    )
}