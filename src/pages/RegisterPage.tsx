import { buttonVariants } from "@/components/ui/button";
import { UserRegisterForm } from "@/components/user-register-form";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="container sm:flex relative h-screen flex-col md:items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
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
                Cadastro
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira seus dados para se cadastrar mo sistema.
              </p>
            </div>
            <UserRegisterForm />
          </div>
        </div>
      </div>
  )
} // 