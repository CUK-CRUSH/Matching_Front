import { ReactNode, FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const NavLinkVariants = cva(
  `
  flex justify-center items-center active:scale-95 rounded-xl 
  text-sm font-bold text-black transition-all shadow-md
  hover:scale-105 duration-200
  `,
  {
    variants: {
      variant: {
        default: ' shadow-none active:scale-100',
        grey: ' bg-slate-300 ',
        blue: ' bg-blue-800',
      },
      size: {
        default: '',
        md: ' w-[6.875rem] h-[2.375rem] text-[1rem] rounded-md',
        lg: 'w-[21.875rem] h-[7.5rem] text-[3rem] rounded-3xl',
        wlg: 'w-[24rem] h-[5.25rem] text-[2rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface NavLinkProps extends VariantProps<typeof NavLinkVariants> {
  href: string;
  label?: string;
  children?: ReactNode;
  as?: 'a' | 'button';
}

const NavLink: FC<NavLinkProps> = ({
  variant,
  size,
  children,
  label,
  href,
  as = 'a',
  ...props
}) => {
  const Component = as;

  return (
    <Component
      href={href}
      className={cn(NavLinkVariants({ variant, size }), 'p-2 hover:underline')}
      {...props}
    >
      {children || label}
    </Component>
  );
};

export default NavLink;
