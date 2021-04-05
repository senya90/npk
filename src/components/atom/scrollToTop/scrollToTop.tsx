import {useEffect} from 'react';
import { withRouter, useLocation } from 'react-router-dom';


const _ScrollToTop: any = (props: any) => {
    const { pathname } = useLocation();
    useEffect(() => {
        setTimeout(() => {
            window.scroll(0, 0);
        }, 16)
    }, [pathname]);

    return null;
};

const ScrollToTop = withRouter(_ScrollToTop)

export {ScrollToTop}