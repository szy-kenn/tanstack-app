import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
    <div className='flex py-1.5 px-3'>
      <Link to='/' className='[&.active]:font-bold hover:bg-gray-200 p-2 px-3 rounded-sm'>
        Home
      </Link>
      <Link to="/about" className='[&.active]:font-bold hover:bg-gray-200 p-2 px-3 rounded-sm'>
        About
      </Link>
    </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
},
)
