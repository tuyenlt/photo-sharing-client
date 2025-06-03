import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import api from "@/services/api.service";

function UserList() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const { userId } = useParams();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await api.get("/users/list");
				setUsers(res.data);
			} catch (error) {
				console.error("Failed to fetch users", error);
			}
		};
		fetchUsers();
	}, []);

	const activeStyleClass = "!bg-blue-200";

	return (
		<div className="space-y-2">
			{users.length > 0 ? (
				users.map((user, idx) => (
					<div key={user._id}>
						<div
							className={`flex items-start gap-4 p-2 hover:bg-muted rounded-lg cursor-pointer border-b ${user._id === userId ? activeStyleClass : ""}`}
							onClick={() => navigate(`/users/${user._id}`)}
						>
							<Avatar className="w-12 h-12">
								<AvatarFallback>
									{user.first_name[0]}
									{user.last_name[0]}
								</AvatarFallback>
							</Avatar>

							<div className="flex flex-col">
								<p className="text-sm font-medium">
									{user.first_name} {user.last_name}
								</p>
								<p className="text-sm text-muted-foreground">
									{user.occupation} – {user.location}
								</p>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="text-center text-muted-foreground py-4">
					Loading...
				</div>
			)}
		</div>
	);
}

export default UserList;
