import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import ActionMenu from "./ActionMenu";

function TopBar() {
	const navigate = useNavigate();
	const { user } = useAuth();

	if (!user) {
		return null;
	}
	return (
		<div className="fixed z-10 bg-white w-full h-20 top-0 border-b flex justify-between items-center px-6">
			<div className="flex items-center">
				<Avatar
					className="w-12 h-12 m-2 cursor-pointer"
					onClick={() => navigate(`/users/${user._id}`)}
				>
					<AvatarFallback className="text-2xl font-md">
						{user.first_name[0]}
						{user.last_name[0]}
					</AvatarFallback>
				</Avatar>
				<div className="">
					<h1 className="text-lg font-semibold">
						{user.first_name} {user.last_name}
					</h1>
					<p className="text-sm text-muted-foreground">
						{user.occupation} – {user.location}
					</p>
				</div>
			</div>
			<ActionMenu />
		</div>
	);
}

export default TopBar;
