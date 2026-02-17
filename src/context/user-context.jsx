import { createContext, useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { chronotypeService } from "@/services/chronotype.service";
import { cfService  } from "@/services/chronoform.service";

const UserContext = createContext({
    isAuth: false,
    userId: 0,
    user: {},
    chronoform: {},
    chronotype: {},
    access_token: '',
    refresh_token: '',
    ctxLoading: false
})

export function UserContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    const [userId, setUserId] = useState(0)
    const [user, setUser] = useState({})
    const [chronoform, setChronoform] = useState({})
    const [chronotype, setChronotype] = useState({})
    const [access_token, setAccessToken] = useState('')
    const [refresh_token, setRefreshToken] = useState('')
    const [ctxLoading, setCtxLoading] = useState(false)

    const {
        isLoading: cfIsLoading,
        data: cfData,
        isError: cfIsError,
        error: cfError,
        isSuccess: cfIsSuccess,
        refetch: cfRefetch,
    } = useQuery({
        queryKey: ['chronoform'],
        queryFn: () => cfService.getCF(
            user.access_token,
            user.refresh_token,
            changeAccessToken
        ),
        enabled: false,
        retry: 2
    })

    const {
        isLoading: chronotypeIsLoading,
        data: chronotypeData,
        isFetching: chronotypeIsFetching,
        isError: chronotypeIsError,
        error: chronotypeError,
        isSuccess: chronotypeIsSuccess,
        refetch: chronotypeRefetch,
    } = useQuery({
        queryKey: ['get chronotype ', userId],
        queryFn: () => chronotypeService.getChronotype(userId),
        enabled: false,
        retry: 0
    });

    const enterAccount = (user) => {
        setUserId(user.id)
        setUser(user)
        setAccessToken(user.access_token)
        setRefreshToken(user.refresh_token)
        setIsAuth(true)
    }

    const outAccount = () => {
        setUserId(0)
        setUser({})
        setAccessToken('')
        setRefreshToken('')
        setIsAuth(false)
    }

    const assignCF = (cf) => {
        setChronoform(cf)
    }

    const assignChronotype = (chronotype) => {
        setChronotype(chronotype)
    }

    const changeAccessToken = (token) => {
        setAccessToken(token)
    }

    useEffect(() => {
        if (cfIsSuccess && cfData.id) {
            assignCF(cfData)
        }
    }, [cfData])

    useEffect(() => {
        if (chronotypeIsSuccess && chronotypeData.id) {
            assignChronotype(chronotypeData)
        }
    }, [chronotypeData])

    const value = {
        isAuth,
        userId,
        user,
        chronoform,
        chronotype,
        access_token,
        refresh_token,
        ctxLoading,
        enterAccount,
        outAccount,
        changeAccessToken,
        assignCF,
        cfRefetch
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext

export function useUserContext() {
    return useContext(UserContext)
}