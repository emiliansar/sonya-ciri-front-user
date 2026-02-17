import style from '@/components/main/layout/Main.module.scss'
import { useEffect, useRef, useState } from 'react'
import UserFirstName from './components/UserFirstName'
import { useUserContext } from "@/context/user-context"
import UserLastName from './components/UserLastName'
import UserUniqueName from './components/UserUniqueName'
import UserButtonSave from './components/UserButtonSave'
import { userService } from '@/services/user.service'
import UserError from './components/UserError'
import UserButtonDelete from './components/UserButtonDelete'
import { useMutation } from '@tanstack/react-query'
import UserLinkChronoform from './components/UserLinkChronoform'

export default function MainUser() {
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const uniqueNameRef = useRef(null)

    const {
        user,
        access_token,
        refresh_token,
        changeAccessToken,
        enterAccount,
        outAccount
    } = useUserContext()

    const [errorValue, setErrorValue] = useState(null)

    const {
        mutate: userMutate,
        isPending: userIsPending
    } = useMutation({
        mutationKey: ['patch'],
        mutationFn: (dto) => userService.patchUser(
            access_token,
            refresh_token,
            changeAccessToken,
            dto
        ),
        onSuccess: (data) => {
            console.log(data)
            enterAccount(data)
        },
        onError: (e) => {
            setErrorValue(e.response?.data?.message || e.message || "Ошибка")
        }
    })

    const saveUser = () => {
        if (
            firstNameRef.current.value == user.first_name &&
            lastNameRef.current.value == user.last_name &&
            uniqueNameRef.current.value == user.unique_name
        ) {
            return
        }

        console.log('Сохранения... save')

        setErrorValue('')

        const dto = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            unique_name: uniqueNameRef.current.value
        }

        if (
            !dto.first_name
            || !dto.last_name
            || !dto.unique_name
        ) {
            return setErrorValue("Форма не заполнена")
        }

        userMutate(dto)
    }

    const {
        mutate: userDelete,
        isPending: userDeleteIsPending
    } = useMutation({
        mutationKey: ['delete'],
        mutationFn: () => userService.deleteUser(
            access_token,
            refresh_token,
            changeAccessToken
        ),
        onSuccess: (data) => {
            console.log(data)
            outAccount()
            // navigate('/auth')
        },
        onError: (e) => {
            setErrorValue(e.response?.data?.message || e.message || "Ошибка")
        }
    })

    const deleteUser = () => {
        const isDelete = confirm("Вы уверены что хотите удалить аккаунт?")

        if (isDelete) {
            userDelete()
        }
    }

    return (
        <div className={style.UserForm}>
            <div className={style.UserForm__Container}>
                <p className={style.UserForm__Title}>Я</p>

                <UserFirstName
                    defaultValue={user.first_name}
                    firstNameRef={firstNameRef}
                />
                <UserLastName
                    defaultValue={user.last_name}
                    lastNameRef={lastNameRef}
                />
                <UserUniqueName
                    defaultValue={user.unique_name}
                    uniqueNameRef={uniqueNameRef}
                />

                <UserError errorValue={errorValue} />

                <UserButtonSave
                    saveUser={saveUser}
                    isPending={userIsPending}
                />

                <UserButtonDelete
                    deleteUser={deleteUser}
                    isPending={userDeleteIsPending}
                />

                <UserLinkChronoform />
            </div>
        </div>
    )
}