import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/services/api.service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import CommentInput from "./CommentInput";
import { formatDate } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


export default function UserPhotos() {
	const { userId } = useParams();
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const response = await api.get(`/photos/photosOfUser/${userId}`);
				setPhotos(response.data);
			} catch (err) {
				console.error("Failed to fetch photos:", err);
				setPhotos([]);
			}
		};

		fetchPhotos();
	}, [userId]);


	const handleAddComment = async (data) => {
		try {
			const response = await api.post(`/photos/addComment/${data.photoId}`, data.comment);
			const updatedPhoto = response.data;
			setPhotos((prevPhotos) =>
				prevPhotos.map((photo) =>
					photo._id === updatedPhoto._id ? updatedPhoto : photo
				)
			);
		} catch (error) {
			console.error("Failed to add comment:", error);
		}
	}

	if (photos.length === 0) {
		return <p className="text-lg mt-6 text-center">No photos found for this</p>;
	}

	return (
		<div className="max-w-3xl mx-auto mt-6 px-4">
			<h1 className="text-2xl font-semibold mb-4">User Photos</h1>

			{photos.map((photo) => (
				<Card key={photo._id} className="mb-6 overflow-hidden">
					<CardHeader className="flex flex-col">
						<div className="flex gap-2">
							<Avatar className="w-12 h-12">
								<AvatarFallback className="text-lg font-medium">
									{photo.user_id.first_name[0]}
									{photo.user_id.last_name[0]}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<div className="font-md">{photo.user_id.first_name} {photo.user_id.last_name}</div>
								<div className="text-sm text-muted-foreground">{formatDate(photo.date_time)}</div>
							</div>
						</div>
						{photo.description && (
							<div className="px-2 my-4">{photo.description}</div>
						)}
					</CardHeader>
					<img
						src={`${API_URL}/uploads/images/${photo.file_name}`}
						alt="User photo"
						className="w-full max-h-[500px] object-contain bg-gray-100"
					/>
					<CardContent>

						<Separator className="my-4" />

						<h2 className="text-lg font-medium mb-2">Comments</h2>
						{photo.comments && photo.comments.length > 0 ? (
							<ul className="space-y-4">
								{photo.comments.map((comment) => (
									<li key={comment._id} className="flex items-start space-x-3">
										<Avatar className="w-10 h-10 bg-gray-200 text-sm font-medium">
											<AvatarFallback>
												{comment.user_id.first_name[0]}
												{comment.user_id.last_name[0]}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">
												<Link
													to={`/users/${comment.user_id._id}`}
													className="text-blue-600 hover:underline"
												>
													{comment.user_id.first_name} {comment.user_id.last_name}
												</Link>{" "}
												<span className="text-muted-foreground text-xs">
													on {formatDate(comment.date_time)}
												</span>
											</p>
											<p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
										</div>
									</li>
								))}
							</ul>
						) : (
							<p className="text-sm text-muted-foreground">No comments yet.</p>
						)}
						<CommentInput onSubmit={handleAddComment} photoId={photo._id} />
					</CardContent>
				</Card>
			))}
		</div>
	);
}
