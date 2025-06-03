import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import api from "@/services/api.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function UploadPhoto() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleSubmit = async () => {
		if (!file) {
			toast.error("Please select a photo to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("photo", file);
		formData.append("description", description);
		formData.append("user_id", user._id);

		try {
			await api.post("/photos/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Photo uploaded successfully!");
			setFile(null);
			setDescription("");
			setPreviewUrl(null);
			navigate(`/user-photos/${user._id}`);
		} catch (err) {
			console.error(err);
			toast.error("Failed to upload photo. Please try again.");
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		if (selectedFile) {
			setPreviewUrl(URL.createObjectURL(selectedFile));
		} else {
			setPreviewUrl(null);
		}
	};

	if (!user) {
		return <p className="text-center text-red-600 mt-6">You must be logged in to upload a photo.</p>;
	}

	return (
		<div className="flex flex-col items-center px-10 w-full">
			<div
				className="w-full max-w-screen-xl mt-10 p-6 border bg-white rounded-xl shadow-md"
			>
				<h2 className="text-2xl font-semibold mb-4 text-center">Upload Photo</h2>
				<div className="mb-4">
					<label
						htmlFor="photo-upload"
						className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-blue-500 transition"
					>
						<span className="text-gray-500">
							{file ? file.name : "Click to select a photo"}
						</span>
						<input
							id="photo-upload"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden"
							required
						/>
					</label>
				</div>


				{previewUrl && (
					<img
						src={previewUrl}
						alt="Preview"
						className="w-full max-h-120 object-contain mb-4 border rounded"
					/>
				)}

				<input
					type="text"
					placeholder="Description (optional)"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full mb-4 border rounded px-3 py-2"
				/>

				<Button
					type="submit"
					className="w-full  text-white py-2 rounded cursor-pointer"
					onClick={handleSubmit}
				>
					Upload
				</Button>
			</div>
		</div>
	);
}
