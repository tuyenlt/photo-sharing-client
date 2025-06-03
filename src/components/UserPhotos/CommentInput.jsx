import { useAuth } from "@/providers/AuthProvider"
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";


export default function CommentInput({ onSubmit, photoId }) {
	const { user } = useAuth();
	const [comment, setComment] = useState("");

	const handleSubmit = () => {
		if (!comment.trim()) return;
		onSubmit({
			photoId,
			comment: {
				comment: comment.trim(),
				user_id: user._id
			}
		});
		setComment("");
	}
	return (
		<div className="flex w-full items-center mt-4 gap-2">
			<Avatar className="w-10 h-10">
				<AvatarFallback className="text-md font-md">
					{user.first_name[0]}
					{user.last_name[0]}
				</AvatarFallback>
			</Avatar>
			<Input
				type="text"
				placeholder="Write a comment..."
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSubmit();
					}
				}}
			/>
			<Button
				className="flex items-center cursor-pointer"
				onClick={handleSubmit}
			>
				<SendHorizonal />
				<span className="">Send</span>
			</Button>
		</div>
	)
}