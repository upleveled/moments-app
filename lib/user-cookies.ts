import cookies from 'js-cookie';
import { User } from 'interfaces';

export const getUserFromCookie = (): User | null => {
	const cookie = cookies.get('auth');
	if (!cookie) {
		return null;
	}
	return JSON.parse(cookie);
};

export const setUserCookie = (user: User) => {
	cookies.set('auth', user, {
		expires: 1 / 24,
		sameSite: 'Strict',
	});
	cookies.set('hasSession', 'true', {
		expires: 1 * 365,
		sameSite: 'Strict',
	});
};

export const removeUserCookie = () => {
	cookies.remove('auth');
	cookies.remove('hasSession');
};
