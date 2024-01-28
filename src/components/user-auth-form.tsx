"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
// import api from "@/services/api"
import { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const { login } = useAuth()

  // const navigate = useNavigate()

  // const login = async () => {
  //   console.log('form', form)
  //   try {
  //     setIsLoading(true)
  //     const response = await api.post('/auth/login', form);
  //     const { token } = response.data;
  //     localStorage.setItem('@token', token);
  //     setIsLoading(false)
  //     navigate('/')
  //   } catch (error) {
  //     console.error('Erro no login:', error);
  //     setIsLoading(false)
  //   }
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setForm({ ...form, [id]: value })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    login(form.username, form.password)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="username"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="none"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (

              <Circle className="mr-2 h-4 w-4 animate-spin" />
              // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Username
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Circle className="mr-2 h-4 w-4 animate-spin" />
          // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Circle className="mr-2 h-4 w-4" />
          // <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}
