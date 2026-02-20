import style from '@/components/main/layout/Main.module.scss'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useUserContext } from '../../../context/user-context'
import { useQuery } from '@tanstack/react-query'
import { cfService } from '../../../services/chronoform.service'
import Chronoform from './components/Chronoform'

export default function MainCF() {
    const {
        user,
        chronoform,
        cfIsLoading,
        cfIsFetching,
        cfIsError,
        cfError,
        cfIsSuccess,
        cfRefetch,
    } = useUserContext()

    const [isPageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        setIsPageLoading(true)
        cfRefetch().finally(() => {
            setIsPageLoading(false)
        })
    }, [])

    useEffect(() => {
        if (chronoform?.id) {
            console.log(chronoform)
        }
    }, [chronoform])

    console.log('cfIsLoading:', cfIsLoading)
    console.log('cfIsSuccess:', cfIsSuccess)
    console.log('chronoform:', chronoform)

    if (cfIsLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // const hasData = chronoform && Object.keys(chronoform).length > 0

    if (cfIsFetching) {
        return (
            <div>Fetching...</div>
        )
    }

    if (isPageLoading) {
        return (
            <div>PageLoading...</div>
        )
    }

    if (cfIsError) {
        return (
            <div>Error: {cfError.message}</div>
        )
    }

    return cfIsSuccess && !cfIsLoading && (
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