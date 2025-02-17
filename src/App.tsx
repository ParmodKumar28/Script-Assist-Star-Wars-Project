import { Outlet } from "react-router-dom"
import { MantineProvider, ColorSchemeProvider, type ColorScheme, ActionIcon, Flex } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "react-query"
import { Notifications } from "@mantine/notifications"
import useThemeStore from "./store/app.store"
import { useEffect, useState } from "react"
import ThemeToggle from "./components/ThemeToggle"

const queryClient = new QueryClient()

function App() {
	// Load dark mode state
	const darkMode = useThemeStore((state) => state.darkMode)
	const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)

	// Sync with localStorage to persist user preference
	const [colorScheme, setColorScheme] = useState<ColorScheme>(darkMode ? "dark" : "light")

	useEffect(() => {
		setColorScheme(darkMode ? "dark" : "light")
		localStorage.setItem("theme", darkMode ? "dark" : "light")
	}, [darkMode])

	return (
		<QueryClientProvider client={queryClient}>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleDarkMode}>
				<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
					<Notifications position="top-right" />

					{/* Flex container to position the theme toggle button */}
					<Flex justify="flex-end" p="md">
						<ThemeToggle />
					</Flex>

					<Outlet />
				</MantineProvider>
			</ColorSchemeProvider>
		</QueryClientProvider>
	)
}

export default App
