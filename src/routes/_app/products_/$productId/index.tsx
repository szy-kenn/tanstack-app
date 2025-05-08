import ApiAuth from '@/lib/api-auth';
import type { RootState } from '@/reducer';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  CircularProgress,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { Edit, Router, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

export const Route = createFileRoute('/_app/products_/$productId/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const response = await ApiAuth.get(`${import.meta.env.VITE_API_AUTH_URL}/products/${params.productId}`);
    console.log('Data: ', response.data);
    return { data: response.data };
  },
});

function RouteComponent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data } = useLoaderData({ from: '/_app/products_/$productId/' });

  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      name: segment.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      path,
    };
  });

  const form = useForm({
    defaultValues: {
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      quantity: data.quantity,
      image: data.image,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        await ApiAuth.put(`/products/${data.id}`, value);
        console.log('hello');
        navigate({
          to: '/products/$productId',
          params: { productId: data.id },
          replace: true,
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 relative h-full">
      <div className="flex flex-col gap-2">
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index} href={breadcrumb.path}>
              {breadcrumb.name == data.id ? data.name : breadcrumb.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>
      <div className="h-full flex gap-2 w-full relative">
        <div className="w-full h-full relative flex items-center justify-center">
          <img alt={data.name} className="absolute top-0 left-0 h-full w-full object-cover" src={data.image} />
        </div>
        <div className="w-full p-2 py-0 h-full flex flex-col gap-8">
          <div className="flex gap-0.5 justify-center flex-col">
            <div className="flex justify-between items-center">
              <p className="text-5xl">{data.name}</p>
              {user.role == 'admin' && (
                <>
                  <Button onPress={onOpen}>
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                          <ModalBody>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                              }}
                              className="flex flex-col gap-6 w-full pb-0"
                            >
                              <form.Field
                                name="category"
                                children={(field) => {
                                  return (
                                    <Input type="hidden" id={field.name} name={field.name} value={field.state.value} />
                                  );
                                }}
                              />
                              <form.Field
                                name="price"
                                children={(field) => {
                                  return (
                                    <Input type="hidden" id={field.name} name={field.name} value={field.state.value} />
                                  );
                                }}
                              />
                              <form.Field
                                name="image"
                                children={(field) => {
                                  return (
                                    <Input type="hidden" id={field.name} name={field.name} value={field.state.value} />
                                  );
                                }}
                              />
                              <form.Field
                                name="quantity"
                                children={(field) => {
                                  return (
                                    <Input type="hidden" id={field.name} name={field.name} value={field.state.value} />
                                  );
                                }}
                              />
                              <form.Field
                                name="name"
                                children={(field) => {
                                  return (
                                    <Input
                                      className="w-full"
                                      labelPlacement="outside"
                                      label="Name"
                                      placeholder={data.name}
                                      type="text"
                                      id={field.name}
                                      name={field.name}
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                  );
                                }}
                              />
                              <form.Field
                                name="description"
                                children={(field) => {
                                  return (
                                    <Input
                                      className="w-full"
                                      labelPlacement="outside"
                                      label="Description"
                                      placeholder={data.description}
                                      type="text"
                                      id={field.name}
                                      name={field.name}
                                      value={field.state.value}
                                      onBlur={field.handleBlur}
                                      onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                  );
                                }}
                              />
                              <div className="flex gap-2 justify-end pb-4">
                                <Button color="danger" variant="light" onPress={onClose}>
                                  Close
                                </Button>
                                <form.Subscribe
                                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                                  children={([canSubmit, isSubmitting]) => (
                                    <Button color="primary" type="submit" disabled={!canSubmit} onPress={onClose}>
                                      {isSubmitting ? <CircularProgress /> : 'Save'}
                                    </Button>
                                  )}
                                />
                              </div>
                            </form>
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </>
              )}
            </div>
            <p className="text-default-400">{data.category}</p>
          </div>
          {/* <Divider /> */}
          <p>{data.description}</p>
          <Divider />
          <Button className="w-fit gap-3 items-center" variant="solid" color="primary">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      {/* <Card className="w-fit">
        <CardHeader>{data.name}</CardHeader>
        <CardBody>
          <Image alt={data.name} className="object-cover" height={200} src={data.image} width={200} isZoomed />
        </CardBody>
        <CardFooter>{data.price}</CardFooter>
      </Card> */}
    </div>
  );
}
