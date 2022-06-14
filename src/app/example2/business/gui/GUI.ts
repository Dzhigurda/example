type ThemeType = "dark" | "light"
export interface GUIFormDTO {
    theme: ThemeType
}

export class GUI {
    public theme: ThemeType = "dark";

    constructor() {
        // set default value
        this.changeTheme(localStorage.getItem("color-theme") as ThemeType ?? 'light');
    }
    changeTheme(theme: ThemeType) {
        this.theme = theme; 
        document.documentElement.classList.toggle("dark-mode", theme === 'dark' ); 
        localStorage.setItem("color-theme", theme); 
        return this;
    }

    restore(gui: GUIFormDTO) {
        this.theme = gui.theme;
        return this;
    }
}