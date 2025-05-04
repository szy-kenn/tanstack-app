import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/checkout"!</div>
}
