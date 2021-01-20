import React, {FC, useEffect, useState} from 'react'
import cn from 'classnames'
import style from './notificationBar.module.scss'
import {useSelector} from "react-redux";
import { TNotification } from 'core/redux/notificationsSlice';
import {notEmptyString} from "../../helpers/utils";

type NotificationMode = 'error' | 'success' | 'warning'

interface NotificationProps {
    mode?: NotificationMode
}

const NotificationBar: FC<NotificationProps> = ({mode, children}) => {
    const SHOWING_TIMEOUT = 5000
    const notification: TNotification = useSelector((store: any) => store.notification)
    const availableShow = (): boolean => {
        return notEmptyString(notification.message)
    }

    const [isHide, setIsHide] = useState<boolean>(!availableShow())

    useEffect(() => {
        const showingTimeout = setTimeout(() => {
            setIsHide(true)
        }, SHOWING_TIMEOUT)

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
                Уведомление о Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores culpa ducimus eaque excepturi fugiat illo maxime nesciunt officia repellendus? Alias asperiores delectus dolores eveniet, ipsa natus nesciunt officiis voluptatem!
            </div>
        </div>
    )
}

export {NotificationBar}