# chat-fallback
This project is a way to screen participants for a video conversation based on their self-reported environment and internet speed. If the user reports that they are not in an adequate environment to do a call or their internet speed would be too slow to participate in a video/audio conference, then a new chat will begin instead.

This app can be used as a way to "fallback" to a chat conversation for qualitative research participants who would otherwise be unable to participate. Although some information may be lost in the process, this approach can help avoid the bias that comes with only allowing participants with high-speed internet connection to participate in research.

## Work log
- [x] Initial skeleton with SvelteKit
- [x] Form that asks users if they're in a noisy environment / can use headphones
- [ ] Show zoom link if qualified, show fallback page if not
- [x] Integrate chat solution (Chaport) with fallback page
- [ ] Support URL Parameter to skip straight to chat
- [ ] Styling cleanup / externalize branding assets
- [ ] Externalize chat solution / support multiple chat solutions
- [ ] Externalize video solution / support more than just a single zoom link
- [ ] Support for URL Parameters to allow user to be addressed by (user)name

## Setup
In your environment's config (or just in a `.env` file in the root), add the following:

```
VITE_CHAPORT_APPID=yourChaportAppId
```
### Optional environment variables

`VITE_CHAPORT_SHOW_ONLOAD=true` will show the fallback chat popup when the page loads. **This only works with the Chaport integration.**

### Using other chat solutions

If you're not using Chaport as your chat fallback, you can replace the code in `lib/ChatCode.js` with your provider's embed code and chat open function(s).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
