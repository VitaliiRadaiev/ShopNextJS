import { DotenvParseOutput, DotenvConfigOutput, config } from "dotenv";

class ConfigService {
    private static instance: ConfigService;
    private config: DotenvParseOutput;

    constructor() {
        const result: DotenvConfigOutput = config();
        if (result.error) {
            throw new Error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
        } else {
            console.log('[ConfigService] Конфигурация .env загружена');
            this.config = result.parsed as DotenvParseOutput;
        }
    }

    getKey(key: string): string {
        return this.config[key];
    }

    public static get(): ConfigService {
        if(!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }

        return ConfigService.instance;
    }
}

export const configService = ConfigService.get();