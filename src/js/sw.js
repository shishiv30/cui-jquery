import { registerRoute, setCatchHandler } from 'workbox-routing';
import {
	NetworkFirst,
	StaleWhileRevalidate,
	CacheFirst,
} from 'workbox-strategies';

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';

// Cache page navigations (html) with a Network First strategy
registerRoute(
	// Check to see if the request is a navigation to a new page
	// we don't user request.destionation==='document' here
	// 'navigate' is a widly used event which could also handle window.location changes
	({ request }) => ['navigate'].includes(request.destination) >= 0,
	// Use a Network First caching strategy
	new NetworkFirst({
		// Put all cached files in a cache named 'pages'
		cacheName: 'pages',
		plugins: [
			// Ensure that only requests that result in a 200 status are cached
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	})
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
	// Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
	({ request }) => ['style', 'script'].includes(request.destination) >= 0,
	// Use a Stale While Revalidate caching strategy
	new StaleWhileRevalidate({
		// Put all cached files in a cache named 'assets'
		cacheName: 'resources',
		plugins: [
			// Ensure that only requests that result in a 200 status are cached
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	})
);

// Cache images with a Cache First strategy
registerRoute(
	// Check to see if the request's destination is style for an image
	({ request }) => ['image'].includes(request.destination) >= 0,
	// Use a Cache First caching strategy
	new CacheFirst({
		// Put all cached files in a cache named 'images'
		cacheName: 'images',
		plugins: [
			// Ensure that only requests that result in a 200 status are cached
			new CacheableResponsePlugin({
				statuses: [200],
			}),
			// Don't cache more than 50 items, and expire them after 30 days
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
			}),
		],
	})
);

// Cache  font files with a cache-first strategy for 1 year.
registerRoute(
	({ request }) => ['font'].includes(request.destination) >= 0,
	new CacheFirst({
		cacheName: 'fonts',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

// Ensure your build step is configured to include /index.html as part of your precache manifest.
precacheAndRoute(self.__WB_MANIFEST);

// Catch routing errors, like if the user is index
setCatchHandler(async ({ event }) => {
	// Return the precached index page if a document is being requested
	if (event.request.destination === 'document') {
		return matchPrecache('/index.html');
	}

	return Response.error();
});
