import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import ResourceListPage from "./pages/ResourceListPage";
import ResourceDetailPage from "./components/ResourceDetail";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./Context/AuthContext";
import HomePage from "./pages/landing/HomePage";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <PrivateRoute element={<HomePage />} /> },
			{ path: "/login", element: <LoginPage /> },
			{ path: "/signup", element: <SignupPage /> },
			{
				path: "/resources", element: <PrivateRoute element={<ResourceListPage />} />
			},
			{ path: "/resource/:id", element: <PrivateRoute element={<ResourceDetailPage />} /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<AuthProvider> 
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
