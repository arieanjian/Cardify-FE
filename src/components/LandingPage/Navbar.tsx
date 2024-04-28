import React from "react";
// image
import NavbarDivider from "@/assets/imgs/Navbar-Divider.svg";

const Navbar: React.FC = () => {
  // navbar 要顯示的東西
  const navItems: string[] = ["Workspace", "Board", "Card", "Upgrade"];
  return (
    <section
      className={`
      h-[80px] 2xl:h-[100px] 
      flex flex-col justify-end gap-3 2xl:gap-5 
      px-2 lg:px-4 xl:px-6 2xl:px-8 3xl:px-10
    `}
    >
      <nav className="navbar overflow-auto flex justify-between divide-x divide-solid">
        {navItems.map((navItem) => (
          <a
            key={navItem}
            className="flex-1 min-w-[120px] flex-shrink-0 flex-center border-0 h-10 cursor-pointer font-bold text-lg text-[#121212]"
          >
            # {navItem}
          </a>
        ))}
      </nav>

      <img src={NavbarDivider} alt="NavbarDivider" className="w-full" />
    </section>
  );
};

export default Navbar;
