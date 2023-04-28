/// <reference types="vite/client" />

/*
FB = Firebase
SUPABASE
*/
interface ImportMetaEnv {
  readonly VITE_APP_ID: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_DEFAULT_LANG: string;
  readonly VITE_FB_API_KEY: string;
  readonly VITE_FB_AUTH_DOMAIN: string;
  readonly VITE_FB_PROJECT_ID: string;
  readonly VITE_FB_STORAGE_BUCKET: string;
  readonly VITE_FB_MESSAGING_SENDER_ID: string;
  readonly VITE_FB_APP_ID: string;
  readonly VITE_FB_MEASUREMENT_ID: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;

  // TODO: Add all the table names here and replace into the services files
  readonly VITE_TABLE_NAME_YEAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
