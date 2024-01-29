import { Outlet } from "react-router-dom"
import { Sidebar } from "./components/sidebar"
import { Separator } from "./components/ui/separator"
import { ModeToggle } from "./components/mode-toggle"
import { AuthProvider } from "./contexts/AuthContext"


function App() {
  

  return (
    <AuthProvider>
      <main className="flex w-full justify-start h-screen">
        <Sidebar />
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex flex-col justify-start align-middle items-center flex-1 h-full">
          <header className="flex flex-row justify-end items-center w-full h-16 px-4">
            <ModeToggle />
          </header>
          <section className="overflow-y-auto w-full">
            <Outlet />
          </section>
        </div>
      </main>
    </AuthProvider>
  )
}

export default App
