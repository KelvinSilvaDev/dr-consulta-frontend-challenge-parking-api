import { Outlet } from "react-router-dom"
import { ModeToggle } from "./components/mode-toggle"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "./components/ui/sonner"


function App() {


  return (
    <AuthProvider>
      <main className="flex flex-col justify-start align-middle items-center flex-1 h-full">
        <header className="flex flex-row justify-end items-center w-full h-16 px-4">
          <ModeToggle />
        </header>
        <section className="overflow-y-auto w-full">
          <Outlet />
        </section>
      </main>
      <Toaster />
    </AuthProvider>
  )
}

export default App
