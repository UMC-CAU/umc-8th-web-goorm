import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME {
    LIGHT='LIGHT',
    DARK='DARK',
}

type TTheme=THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme:TTheme;
    toggleTheme: ()=>void;
}

export const ThemeContent=createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider=({children}:PropsWithChildren)=>{
    const [theme, setTheme]=useState<TTheme>(THEME.LIGHT);

    const toggleTheme=():void=>{
        setTheme((prevTheme):THEME=>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
    }
    return (
        <ThemeContent.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContent.Provider >
    );
};

export const useTheme=():IThemeContext=>{
    const context =useContext(ThemeContent);

    if (!context){
        throw new Error('useTheme must be used whithin a ThemeProvider');
    }

    return context;
};