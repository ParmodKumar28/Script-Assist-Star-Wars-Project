import { create } from "zustand"

interface ThemeState {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<ThemeState>((set) => ({
  darkMode: localStorage.getItem("theme") === "dark", // Load from localStorage
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode
    localStorage.setItem("theme", newMode ? "dark" : "light") // Persist theme
    return { darkMode: newMode }
  })
}))

export default useThemeStore
