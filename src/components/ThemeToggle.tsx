import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { Sun, Moon } from "lucide-react"
import useThemeStore from "../store/app.store"

const ThemeToggle = () => {
  const darkMode = useThemeStore((state) => state.darkMode)
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)

  return (
    <ActionIcon onClick={toggleDarkMode} size="lg" variant="light">
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </ActionIcon>
  )
}

export default ThemeToggle
