import './App.css'
import AppLayout from '@/components/AppLayout'
import { Provider } from './context/provider'
import { UserContextProvider } from './context/user-context'

export default function App() {

  return (
    <>
      <Provider>
        <UserContextProvider>
          <AppLayout />
        </UserContextProvider>
      </Provider>
    </>
  )
}
