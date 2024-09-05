import { Button, Text } from '@mantine/core';

export const SelectFile = ({ action }: { action: any }) => {
    return (
        <Button
            onClick={action}
            styles={{ root: { height: 120, width: 100 } }}
            variant="filled"
            color="gray"
        >
            <Text styles={{ root: { textWrap: "pretty" } }} >
                SELECT SYNC FILE<br />
                <img src="Google_Drive_icon_(2020).svg" width={30} height={30} />
            </Text>

        </Button>
    )
}
