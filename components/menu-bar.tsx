import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

export const MenubarComp = ({
  children,
  options,
}: {
  children: React.ReactNode;
  options: {
    name: string;
    value: string;
  }[];
}) => {
  return (
    <>
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="p-3">{children}</MenubarTrigger>
          <MenubarContent className="w-full bg-slate-400/20">
            {options.map((option) => (
              <MenubarItem
                key={option.value}
                className="cursor-pointer hover:bg-slate-400/10 active:bg-slate-400/20 rounded-[10px]"
              >
                {option.name}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
