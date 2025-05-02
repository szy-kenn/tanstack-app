import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  // loader: ({ context }) => context.fetchToDosByUserId(context.user.id),
})

function RouteComponent() {
  return (
    <div className='p-4'>
      <p>About Us!</p>
    </div>
  )
}
