import React, {FC} from 'react';
import { Tabs as TabsAnt } from 'antd';
import './tabs.css'

interface TabsProps {
    defaultActiveKey?: string | undefined
    centered?: boolean | undefined
    className?: string
}

const Tabs: FC<TabsProps> = ({
     defaultActiveKey,
     centered,
    className,
     children
}) => {

    return (
        <TabsAnt className={className} centered={centered} defaultActiveKey={defaultActiveKey}>
            {children}
        </TabsAnt>
    );
};

export {Tabs}

export const TabPane = TabsAnt.TabPane