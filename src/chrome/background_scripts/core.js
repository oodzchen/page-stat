const focused = new Map();
/* Keeps a map for the focused host in the focused window
 *
 * scheme:
 *
 * windowId => Host
 * 
 */

async function updateFocus(windowId, urlContainer) {
	const hasFocus = focused.get(windowId);
	const currentHost = urlContainer.url.host;

	if (urlContainer.stat) {
		if (!hasFocus) {
			focused.set(windowId, new Host(currentHost));
		} else if (currentHost != hasFocus.host) {
			await updateHostTime(hasFocus);
			focused.set(windowId, new Host(currentHost));
		}
	} else if (hasFocus) {
		focused.set(windowId, null);
		await updateHostTime(hasFocus);
	}
}


