import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";

export function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/"
    },
    {
      name: "Estabelecimentos",
      path: "/establishment"
    }
  ]
  return (
    <div className="flex flex-col justify-start h-full p-4 min-w-22 ">
      <div className="flex justify-center items-center gap-2">
        <img src="/light.png" alt="Logo" className="rounded-full h-12 w-12" />
        <h1 className="my-4 font-extrabold text-lg">Parking System</h1>
      </div>
      <Separator className="my-2" />
      <NavigationMenu className="items-start">
        <NavigationMenuList className="flex-col items-stretch justify-start text-left">
          {links.map(link => (
            <Link to={link.path} key={link.name} className="ml-0 w-40">
              <NavigationMenuItem>
                <NavigationMenuLink className={`min-w-40 w-full text-start px-1.5 justify-start ${navigationMenuTriggerStyle()}`}>
                  {link.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}