"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary p-4 rounded-xl w-3/4 gap-2 shadow-sm">
      <div className=" flex flex-col-reverse  sm:flex-row sm:items-center sm:justify-around">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "outline"}
          >
            <Link href="/client">Client</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
        <div className="flex justify-center mb-3 sm:m-0">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
