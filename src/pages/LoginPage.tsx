// import { Metadata } from "next"
// import Image from "next/image"
// import Link from "next/link"

import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Navigate } from "react-router-dom";
// import api from "@/services/api";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

export default function LoginPage() {
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // useEffect(() => {
  //   const login = async () => {
  //     try {
  //       setIsLoading(true)
  //       const response = await api.post('/auth/login', form);
  //       const { token } = response.data;
  //       localStorage.setItem('@token', token);
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.error('Erro no login:', error);
  //       setIsLoading(false)
  //     }
  //   }

  //   login()
  // }, [])

  const {isAuthenticated} = useAuth()

  

  // console.log('isLoading', isLoading)
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="container sm:flex relative h-screen flex-col md:items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Register
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative m-auto">
            <h1>Login</h1>
          </div>
        </div>
        <div className="lg:p-8c h-screen flex flex-col justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira seu nome de usuário e senha para acessar o sistema.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              {/* <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link> */}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}