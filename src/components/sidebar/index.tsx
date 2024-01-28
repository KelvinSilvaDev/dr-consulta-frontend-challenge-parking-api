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
      <h1>Sidebar</h1>
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