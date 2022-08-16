import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ThemeContext } from '../App';

function Loading() {
    const theme = useContext(ThemeContext);

    console.log(theme)

    return (
        <TailSpin
            height="80"
            width="80"
            color={theme.theme == 'light' ? "hsl(200, 15%, 8%)" : 'hsl(0, 0%, 100%)'}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{ margin: 'auto' }}
            wrapperClass="loading-container"
            visible={true}
        />
    )
}

export default Loading;
