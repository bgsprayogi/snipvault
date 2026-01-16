import axios from "axios";
import { SnippetConfig } from "@/types";

const API_URL = "http://localhost:5000/snippets";

export const snippetService = {
    // 1. GET BY ID (Dipakai saat user membuka link sharing, misal: /share/x7Ha2)
    getById: async (id: string): Promise<SnippetConfig> => {
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data.data;

        // PENTING: Mapping data dari Backend (snake_case) balik ke Frontend (camelCase)
        // Backend: window_type -> Frontend: windowType
        return {
            code: data.code,
            language: data.language,
            theme: data.theme,
            padding: data.padding,
            windowType: data.window_type,
        };
    },

    // 2. CREATE / SAVE (Dipakai saat user klik tombol "Share Link")
    // Return value-nya adalah string ID unik (misal "aX9zK")
    create: async (config: SnippetConfig): Promise<string> => {

        // PENTING: Mapping data dari Frontend ke format yang diminta Backend
        const payload = {
            code: config.code,
            language: config.language,
            theme: config.theme,
            padding: config.padding,
            window_type: config.windowType, // Backend minta 'window_type' (pakai underscore)
        };

        const res = await axios.post(API_URL, payload);
        return res.data.id;
    }
};