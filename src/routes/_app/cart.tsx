import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/cart"!</div>
}
