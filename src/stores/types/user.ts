import type { User } from '@supabase/supabase-js';

export interface IUserData extends User {
	email: string;
	user_metadata: IUserMetadata;
}

export interface IUserMetadata {
	name?: string;
}
