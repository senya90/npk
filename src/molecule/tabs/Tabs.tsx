import React, {FC} from 'react';
import { Tabs as TabsAnt } from 'antd';
import './tabs.css'

interface TabsProps {
    defaultActiveKey?: string | undefined
    centered?: boolean | undefined
}

const Tabs: FC<TabsProps> = ({defaultActiveKey, centered, children}) => {
    
    return (
        <TabsAnt centered={centered} defaultActiveKey={defaultActiveKey}>
            {children}
        </TabsAnt>
    );
};

export {Tabs}

export const TabPane = TabsAnt.TabPane