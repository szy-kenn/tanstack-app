import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/checkout"!</div>
}
