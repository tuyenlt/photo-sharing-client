import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api.service";
import { useAuth } from "@/providers/AuthProvider";

function Login() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ username: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { login } = useAuth();

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login(form.username, form.password);
			navigate("/home");
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<Card className="w-full max-w-md shadow-lg p-4">
				<CardContent>
					<h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
					<form onSubmit={handleSubmit} className="space-y-8">
						<div>
							<Label htmlFor="username" className="mb-2">Username</Label>
							<Input
								id="username"
								name="username"
								type="text"
								value={form.username}
								onChange={handleChange}
								required
							/>
						</div>
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

						{error && <p className="text-sm text-red-500">{error}</p>}

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</form>

					<p className="text-sm text-center mt-6 mb-4">
						Don’t have an account?{" "}
						<Link to="/register" className="text-blue-600 hover:underline">
							Register here
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default Login;
