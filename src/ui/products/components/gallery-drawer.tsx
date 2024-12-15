import { DialogDescription, DialogTitle } from "@/ui/shadcn/dialog";
import { Drawer, DrawerClose, DrawerContent } from "@/ui/shadcn/drawer";
import { Root as VisuallyHiddenRoot } from "@radix-ui/react-visually-hidden";
import { XIcon } from "lucide-react";
import Image from "next/image";

type GalleryDrawerProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
};

export const GalleryDrawer = ({ isOpen, onOpenChange, children }: GalleryDrawerProps) => {
	return (
		<Drawer open={isOpen} onOpenChange={onOpenChange} aria-label="Product gallery viewer">
			<VisuallyHiddenRoot asChild>
				<div>
					<DialogTitle />
					<DialogDescription />
				</div>
			</VisuallyHiddenRoot>

			<DrawerContent className="h-[90vh]">
				<DrawerClose className="hidden sm:block">
					<div className="flex items-center justify-center">
						<div className="p-0 mt-6 mb-6 w-8 h-8 flex items-center justify-center rounded-full border border-black hover:bg-gray-200 cursor-pointer">
							<XIcon />
						</div>
					</div>
				</DrawerClose>
				<div className="flex flex-col h-full" role="dialog" aria-modal="true">
					<div className="flex-1 px-6 pb-safe">{children}</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
