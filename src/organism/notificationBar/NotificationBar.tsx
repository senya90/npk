import React, {FC, useCallback, useEffect, useState} from 'react'
import cn from 'classnames'
import style from './notificationBar.module.scss'
import {useSelector} from "react-redux";
import { TNotification } from 'core/redux/notificationsSlice';
import {notEmptyString} from "../../helpers/utils";

type NotificationMode = 'error' | 'success' | 'warning'

interface NotificationProps {
    mode?: NotificationMode
    onNotificationHide: () => void
}

const NotificationBar: FC<NotificationProps> = ({mode, onNotificationHide, children}) => {
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
    })

    const className = cn(
        style.notification,
        {[style[`notification_${mode}`]]: mode},
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