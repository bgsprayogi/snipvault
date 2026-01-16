export type ThemeColor = 'blue' | 'purple' | 'pink' | 'orange' | 'green' | 'red';
export type PaddingSize = 'tight' | 'normal' | 'relaxed'; // <--- TAMBAHKAN INI
export type WindowType = 'mac' | 'windows' | 'none';

export interface SnippetConfig {
    theme: ThemeColor;
    padding: number;
    windowType: WindowType;
    language: string;
    code: string;
}