import style from '@/components/main/layout/Main.module.scss'

export default function UserError({ errorValue }) {
    return (
        <>
            {errorValue && (
                <div className={style.AuthForm__Container__Error}>
                    <p className={style.AuthForm__Container__Error__Text}>
                        {errorValue}
                    </p>
                </div>
            )}
        </>
    )
}