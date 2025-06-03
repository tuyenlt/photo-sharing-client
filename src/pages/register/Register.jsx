import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api.service";
import { useAuth } from "@/providers/AuthProvider";

function Register() {
	const navigate = useNavigate();
	const { register, isAuthenticated } = useAuth();
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		first_name: "",
		last_name: "",
		location: "",
		occupation: "",
		description: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			const payload = { ...form };
			delete payload.confirmPassword;
			await register(payload);
			navigate("/home");
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<Card className="w-full max-w-md shadow-lg px-4 py-10">
				<CardContent>
					<h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

					<form onSubmit={handleSubmit} className="space-y-4">
						{["username", "first_name", "last_name", "location", "occupation", "description"].map((field) => (
							<div key={field}>
								<Label htmlFor={field} className="capitalize mb-2">
									{field.replace("_", " ")}
								</Label>
								<Input
									id={field}
									name={field}
									type="text"
									value={form[field]}
									onChange={handleChange}
									required
								/>
							</div>
						))}

						<div>
							<Label htmlFor="password" className="mb-2">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={form.password}
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor="confirmPassword" className="mb-2">Confirm Password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={form.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>

						{error && <p className="text-sm text-red-500">{error}</p>}

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Registering..." : "Register"}
						</Button>

						<p className="text-sm text-center mt-2">
							Already have an account?{" "}
							<Link to="/login" className="text-blue-600 hover:underline">
								Login here
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default Register;
