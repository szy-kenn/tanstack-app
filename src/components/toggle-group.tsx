import { useCheckbox, CheckboxGroup, Chip, VisuallyHidden, tv } from '@heroui/react';

export const CustomCheckbox = (props: any) => {
  const checkbox = tv({
    slots: {
      base: 'border-default hover:bg-default-200 p-3',
      content: 'text-default-500',
    },
    variants: {
      isSelected: {
        true: {
          base: 'border-black bg-white hover:bg-white hover:border-white',
          content: 'text-black pl-1',
        },
      },
      isFocusVisible: {
        true: {
          base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-white',
        },
      },
    },
  });

  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="default"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  );
};

export const CheckIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};
