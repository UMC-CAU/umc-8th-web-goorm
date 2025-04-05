import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent(){
    const {theme}=useTheme();
    
    const isLightMode=theme===THEME.LIGHT;
    
    return (
    <div 
        className={clsx('p-4 h-screen w-full',
         isLightMode ? 'bg-white':'bg-gray-800'
    )}
    >
        <h1 className={clsx(
            'text-wxl font-bold',
            isLightMode ? 'text-black' : 'text-white'
        )}
        >
            Theme Content
        </h1>
        <p className={clsx('mt-2', {
            'bg-white text-black': isLightMode,
            'bg-black text-white': !isLightMode
        })}>
            ndkjncksnajc
        </p>
    </div>
);
}