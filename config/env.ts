import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

type Environment = 'local' | 'staging' | 'prod';

interface AppConfig {
  env: Environment;
  uiBaseURL: string;
  apiBaseURL: string;
  reqresApiKey: string;
}

const environments: Record<Environment, Pick<AppConfig, 'uiBaseURL' | 'apiBaseURL'>> = {
  local: {
    uiBaseURL: 'https://www.saucedemo.com',
    apiBaseURL: 'https://reqres.in',
  },
  staging: {
    uiBaseURL: 'https://www.saucedemo.com',
    apiBaseURL: 'https://reqres.in',
  },
  prod: {
    uiBaseURL: 'https://www.saucedemo.com',
    apiBaseURL: 'https://reqres.in',
  },
};

const currentEnv = (process.env.TEST_ENV as Environment) || 'local';

export const config: AppConfig = {
  env: currentEnv,
  ...environments[currentEnv],
  reqresApiKey: process.env.REQRES_API_KEY ?? '',
};