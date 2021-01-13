import React, {FC, useState} from 'react'
import cn from 'classnames'
import style from './notification.module.scss'

type NotificationMode = 'error' | 'success' | 'warning'

interface NotificationProps {
    mode?: NotificationMode
}

const Notification: FC<NotificationProps> = ({mode, children}) => {
    const [isHide, setIsHide] = useState<boolean>(true)

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

export {Notification}