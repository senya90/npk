import React, {FC} from 'react';
import { Tabs as TabsAnt } from 'antd';
import './tabs.css'

interface TabsProps {
    activeKey?: string | undefined
    defaultActiveKey?: string | undefined
    centered?: boolean | undefined
    onChange?: (activeKey: string) => void
    className?: string
}

const Tabs: FC<TabsProps> = ({
    defaultActiveKey,
    activeKey,
    centered,
    className,
    children,
    onChange
}) => {

    return (
        <TabsAnt
            activeKey={activeKey}
            className={className}
            centered={centered}
            defaultActiveKey={defaultActiveKey}
            onChange={onChange}
        >
            {children}
        </TabsAnt>
    );
};

export {Tabs}

export const TabPane = TabsAnt.TabPane