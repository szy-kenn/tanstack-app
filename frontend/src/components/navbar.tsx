import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link } from '@tanstack/react-router';
import { Footprints, Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <HeroUINavbar className="border-b border-white/35">
      <NavbarBrand>
        <Link to="/" className="flex gap-2 items-center" activeOptions={{ exact: true }}>
          <Footprints className="w-4 h-4" />
          <p className="font-bold text-inherit">Shoemaker</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link to="/" activeOptions={{ exact: true }}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/products" activeOptions={{ exact: true }}>
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/about" activeOptions={{ exact: true }}>
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Search className="w-4 h-4" />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ShoppingCart className="w-4 h-4" />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <User className="w-4 h-4" />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;
