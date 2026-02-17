import { Outlet, useNavigate } from 'react-router'
import style from './Main.module.scss'
import { useEffect } from 'react'
import { useUserContext } from '@/context/user-context'

export default function MainLayout() {
    const { userId } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userId) {
            navigate('/auth')
        }
    }, [userId])

    return (
        <div className={style.MainLayout}>
            <div className={style.MainLayout__Container}>
                <Outlet />
            </div>
        </div>
    )
}