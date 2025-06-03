import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogOutIcon, UploadCloud } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";


export default function ActionMenu() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	return (
		<div className="flex">
			<Link to="/upload-photo" className="p-4 hover:bg-accent rounded-md flex gap-2">
				<UploadCloud />
				<div className="text-md">Upload Photo</div>
			</Link>
			<div
				className="p-4 hover:bg-accent rounded-md flex gap-2 cursor-pointer"
				onClick={logout}
			>
				<LogOutIcon />
				<div className="text-md">Logout</div>
			</div>

		</div>
	);
}
