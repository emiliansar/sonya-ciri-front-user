import style from '@/components/main/layout/Main.module.scss'
import { Trash2 } from 'lucide-react'

export default function UserButtonDelete({ deleteUser, isPending }) {
    return (
        <div className={style.UserForm__UserButtonDelete}>
            <button
                type="button"
                className={style.UserForm__UserButtonDelete__Button}
                onClick={deleteUser}
                disabled={isPending}
            >
                <span>Удалить</span>
                <Trash2 />
            </button>
        </div>
    )
}