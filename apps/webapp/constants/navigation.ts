export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
}

export const navItems: Array<INavItem> = [
  {
    label: "Tokens",
    children: [
      {
        label: "Mint",
        subLabel: "Mint Scuderia Racing NFTs",
        href: "#",
      },
      {
        label: "View & Stake",
        subLabel: "View your NFTs and stake them for utility",
        href: "#",
      },
      {
        label: "SCOOT Token",
        subLabel: "Manage your $SCT balance"
      }
    ],
  },
  {
    label: "Racing",
    href: "#",
    children: [
      {
        label: "Race",
        subLabel: "Coming soon...",
        href: "#",
      },
    ],
  },
];
