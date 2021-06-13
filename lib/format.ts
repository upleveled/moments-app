export function fmtMSS(s: number) {
	console.log(s);
	return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}
