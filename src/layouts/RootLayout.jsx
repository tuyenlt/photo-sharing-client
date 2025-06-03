import TopBar from "@/components/TopBar";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import { Toaster } from "sonner";

export default function RootLayout() {
	return (
		<div className="w-full">
			<TopBar />
			<LeftSideBar />
			<main className="mt-20 ml-70 absolute w-[calc(100vw-280px)]">
				<Outlet />
			</main>
			<Toaster />
		</div>
	);
}