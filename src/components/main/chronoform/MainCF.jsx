import style from '@/components/main/layout/Main.module.scss'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useUserContext } from '../../../context/user-context'
import { useQuery } from '@tanstack/react-query'
import { cfService } from '../../../services/chronoform.service'
import Chronoform from './components/Chronoform'

export default function MainCF() {
    const {
        user,
        chronoform,
        cfRefetch,
    } = useUserContext()

    useEffect(() => {
        cfRefetch()
    }, [])

    useEffect(() => {
        if (chronoform?.id) {
            console.log(chronoform)
        }
    }, [chronoform])

    return (
        <>
            <div
                className='max-w-[1440] w-full px-[10] my-0 mx-a'
            >
                <Chronoform
                    defaultValues={chronoform}
                />
            </div>
        </>
    )
}