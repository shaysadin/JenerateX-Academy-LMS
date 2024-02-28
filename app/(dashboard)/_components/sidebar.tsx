import { Logo } from "./logo"
import { SideBarRoutes } from "./sidebar-routes"

export const SideBar = () => {
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="py-2 mx-auto">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SideBarRoutes />
            </div>
        </div>
    )
}