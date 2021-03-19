import { User } from 'interfaces';
import { createContext } from 'react';

export const UserContext = createContext<User | null>(null);
