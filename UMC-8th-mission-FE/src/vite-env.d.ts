// <reference types="vite/client" />

// CSS 모듈 타입 선언
declare module '*.css';

interface ImportMetaEnv {
    readonly VITE_SERVER_API_URL: string;
}

interface ImportMeta {
    readonly env: ImporMetaEnv;
}