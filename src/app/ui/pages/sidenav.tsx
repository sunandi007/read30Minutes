"use client";

import { HiColorSwatch, HiChartPie, HiBookOpen, HiSearch, HiHome } from "react-icons/hi";
import { Sidebar } from "flowbite-react";

const links = [
  { name: "Home", href: "/pages/book", icon: HiHome },
  { name: "Explore", href: "/pages/explore", icon: HiSearch },
  { name: "My Library", href: "/pages/library", icon: HiBookOpen },
  { name: "Dashboard", href: "/pages/dashboard", icon: HiChartPie, child: [
    { name: "Management Books", href: "/pages/dashboard/mgmt-books", icon: HiColorSwatch },
    { name: "Management Category", href: "/pages/dashboard/mgmt-category", icon: HiColorSwatch },
    { name: "Management Author", href: "/pages/dashboard/mgmt-author", icon: HiColorSwatch },
  ]},
];

export default function SideNav() {
  return (
    <div className="h-screen">
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Logo href="#" img="/favicon.ico" imgAlt="Flowbite logo">
        Flowbite
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        {links.map((link, index) => {
            if (link.child) {
              // Render the collapsible menu
              return (
                <Sidebar.Collapse key={index} icon={link.icon} label={link.name}>
                  {link.child.map((childLink, childIndex) => (
                    <Sidebar.Item key={childIndex} href={childLink.href} icon={childLink.icon}>
                      {childLink.name}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              );
            } else {
              // Render regular sidebar items
              return (
                <Sidebar.Item key={index} href={link.href} icon={link.icon}>
                  {link.name}
                </Sidebar.Item>
              );
            }
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}