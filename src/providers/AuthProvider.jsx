import api from "@/services/api.service";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [isLoggedOut, setIsLoggedOut] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		const storedToken = localStorage.getItem("accessToken");
		if (storedToken) {
			setToken(storedToken);
		} else {
			setIsLoggedOut(true);
			navigate("/login");
		}
	}, []);

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use((config) => {
			config.headers.Authorization =
				!config._retry && token
					? `Bearer ${token}`
					: config.headers.Authorization;
			return config;
		});
		return () => {
			api.interceptors.request.eject(authInterceptor);
		};
	}, [token]);

	useLayoutEffect(() => {
		const responseInterceptor = api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response && error.response.status === 401) {
					localStorage.removeItem("accessToken");
					setToken(null);
					setUser(null);
					setIsAuthenticated(false);
					setIsLoggedOut(true);
					navigate("/login");
				}
				return Promise.reject(error);
			}
		);
		return () => {
			api.interceptors.response.eject(responseInterceptor);
		};

	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			if (!token) {
				return;
			}
			try {
				const response = await api.get("/users/me");
				console.log("User fetched:", response.data);
				setUser(response.data);
				setIsAuthenticated(true);
			} catch (error) {
				console.error("Error fetching user:", error);
				setUser(null);
				setIsAuthenticated(false);
			}
		};
		fetchUser();
	}, [token])


	const login = async (username, password) => {
		try {
			const response = await api.post("/users/login", { username, password });
			const accessToken = response.data;
			localStorage.setItem("accessToken", accessToken);
			setToken(accessToken);
			setIsLoggedOut(false);
		} catch (error) {
			console.error("Login failed:", error);
			throw new Error("Login failed. Please check your credentials.");
		}
	}
	const register = async (data) => {
		try {
			const response = await api.post("/users", data);
			const accessToken = response.data;
			localStorage.setItem("accessToken", accessToken);
			setToken(accessToken);
		} catch (error) {
			console.error("Registration failed:", error);
			throw new Error("Registration failed. Please try again.");
		}
	}

	const logout = () => {
		localStorage.removeItem("accessToken");
		setToken(null);
		setUser(null);
		setIsAuthenticated(false);
		setIsLoggedOut(true);
		navigate("/login");
	}

	if (!isAuthenticated && !isLoggedOut) {
		return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
	}


	return (
		<authContext.Provider value={{
			user,
			token,
			login,
			logout,
			register,
			isAuthenticated
		}}>
			{children}
		</authContext.Provider>
	);
}