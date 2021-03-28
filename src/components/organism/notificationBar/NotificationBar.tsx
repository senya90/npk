import React, {FC, useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import cn from 'classnames'

import {TNotification} from 'core/redux/notificationsSlice';
import {notEmptyString} from "../../../helpers/utils";

import style from './notificationBar.module.scss'

interface NotificationProps {
    onNotificationHide: () => void
}

const NotificationBar: FC<NotificationProps> = ({onNotificationHide, children}) => {
    const SHOWING_TIMEOUT = 5000
    const notification: TNotification = useSelector((store: any) => store.notification)

    const availableShow = useCallback((): boolean => {
        return notEmptyString(notification.message)
    }, [notification])

    const [isHide, setIsHide] = useState<boolean>(!availableShow())

    useEffect(() => {
        setIsHide(!availableShow())
    }, [notification, availableShow])

    useEffect(() => {
        let showingTimeout: any;

        if (!isHide) {
            showingTimeout = setTimeout(() => {
                setIsHide(true)
                onNotificationHide()
            }, SHOWING_TIMEOUT)
        }

        return () => {
            clearTimeout(showingTimeout)
        }
    }, [isHide, onNotificationHide])

    const className = cn(
        style.notification,
        {[style[`notification_${notification.type}`]]: notification.type},
        {[style.hide]: isHide}
        )

    return (
        <div className={className}>
            <div className={style.content}>
                {notification.message}
            </div>
        </div>
    )
}

export {NotificationBar}