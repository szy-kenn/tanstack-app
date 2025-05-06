import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardBody, Input, Button, CardFooter, Alert } from '@heroui/react';
import { useForm, type AnyFieldApi } from '@tanstack/react-form';
import ApiAuth from '@/lib/api-auth';
import { useState } from 'react';
import type { ValidationErrors } from '@/lib/types';

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? <em>{field.state.meta.errors.join(', ')}</em> : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

function RouteComponent() {
  const navigate = useNavigate();

  const [isLoading] = useState(false);
  const [, setError] = useState<ValidationErrors>({});

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'user',
    },
    onSubmit: async ({ value }) => {
      try {
        await ApiAuth.post('/register', value);
        navigate({ to: '/' });
      } catch (error: any) {
        if (error.status === 422) {
          setError(error.response.data.errors);
        }
      }
    },
  });

  return (
    <>
      <div className="bg-black text-white w-full h-full flex items-center justify-center">
        <Card className="px-6 py-4">
          <CardHeader className="flex flex-col gap-2">
            {/* {error.length > 0 && (
              <div key="danger" className="w-full flex items-center my-3">
                <Alert color={'danger'} title={`${error}`} />
              </div>
            )} */}
            <p className="text-md font-bold">Create a new account</p>
          </CardHeader>
          <CardBody>
            <form
              className="flex flex-col gap-6 w-[320px] pb-0"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <input type="hidden" name="_token" value="{{ csrf_token() }}" />
              <form.Field
                name="name"
                children={(field) => {
                  return (
                    <>
                      <Input
                        className="w-full"
                        labelPlacement="outside"
                        label="Name"
                        placeholder="Enter your name"
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <>
                      <Input
                        className="w-full"
                        labelPlacement="outside"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  return (
                    <>
                      <Input
                        labelPlacement="outside"
                        className="w-full"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
              <form.Field
                name="password_confirmation"
                children={(field) => {
                  return (
                    <>
                      <Input
                        labelPlacement="outside"
                        className="w-full"
                        label="Confirm Password"
                        placeholder="Confirm password"
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button color="primary" type="submit" disabled={!canSubmit || isLoading}>
                    {isSubmitting ? '...' : 'Sign Up'}
                  </Button>
                )}
              />
            </form>
          </CardBody>
          <CardFooter>
            <div className="h-full w-full">
              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">
                  Log In
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
