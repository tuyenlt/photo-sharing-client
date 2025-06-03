import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/services/api.service";

function UserDetail() {
	const { userId } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await api.get(`/users/${userId}`);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, [userId]);

	if (!user) {
		return (
			<div className="flex justify-center py-10">
				<Skeleton className="h-40 w-96 rounded-xl" />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex justify-center bg-muted px-4 py-8">
			<Card className="w-full max-w-xl shadow-md h-fit">
				<CardContent className="flex flex-col items-center gap-6 p-6">
					<div className="flex flex-col items-center">
						<div className="bg-primary text-white text-xl font-bold rounded-full h-20 w-20 flex items-center justify-center">
							{user.first_name[0]}
							{user.last_name[0]}
						</div>
						<h1 className="text-2xl font-semibold mt-4">
							{user.first_name} {user.last_name}
						</h1>
					</div>

					<div className="w-full space-y-2 text-center">
						<p>
							<span className="font-medium">Location:</span> {user.location}
						</p>
						<p>
							<span className="font-medium">Occupation:</span> {user.occupation}
						</p>
						<p>
							<span className="font-medium">Description:</span>{" "}
							{user.description}
						</p>
					</div>

					<Button asChild className="w-full mt-4">
						<Link to={`/user-photos/${user._id}`}>View Photos</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

export default UserDetail;
