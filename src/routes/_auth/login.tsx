import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardBody, Input, Button, CardFooter } from '@heroui/react';
import { useForm, type AnyFieldApi } from '@tanstack/react-form';
import ApiAuth from '@/lib/api-auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, setToken } from '@/actions';

export const Route = createFileRoute('/_auth/login')({
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      try {
        const response = await ApiAuth.post('/login', value);
        dispatch(loginSuccess(response.data.user));
        dispatch(setToken(response.data.token));
        navigate({ to: '/' });
      } catch (error: any) {
        if (error.status === 422) {
          // TODO: error handling
          console.log(error);
        }
      }
    },
  });

  return (
    <div className="bg-black text-white w-full h-full flex items-center justify-center flex-col">
      <Card className="px-6 py-4">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-bold">Login to your account</p>
          </div>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-6 w-[320px] pb-0"
          >
            <input type="hidden" name="_token" value="{{ csrf_token() }}" />
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
                      className="w-full"
                      labelPlacement="outside"
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
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button color="primary" type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Log In'}
                </Button>
              )}
            />
          </form>
        </CardBody>
        <CardFooter>
          <div className="h-full w-full">
            <p className="text-center text-sm text-gray-400">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
