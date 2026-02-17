import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthSignup from "@/components/auth/components/AuthSignup";
import AuthLayout from '@/components/auth/AuthLayout'
import AuthSignin from "@/components/auth/components/AuthSignin";
import MainLayout from "@/components/main/layout/MainLayout";
import MainUser from "@/components/main/user/MainUser";
import MainCF from "./main/chronoform/MainCF";

export default function AppLayout() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<MainUser />} />
                        <Route path='user' element={<MainUser />} />
                        <Route path='chronoform' element={<MainCF />} />
                    </Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route index element={<AuthSignin />} />
                        <Route path='signin' element={<AuthSignin />} />
                        <Route path='signup' element={<AuthSignup />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}