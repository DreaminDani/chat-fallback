# chat-fallback
This project is a way to screen participants for a video conversation based on their self-reported environment and internet speed. If the user reports that they are not in an adequate environment to do a call or their internet speed would be too slow to participate in a video/audio conference, then a new chat will begin instead.

This app can be used as a way to "fallback" to a chat conversation for qualitative research participants who would otherwise be unable to participate. Although some information may be lost in the process, this approach can help avoid the bias that comes with only allowing participants with high-speed internet connection to participate in research.

## Work log
- [x] Initial skeleton with SvelteKit
- [ ] Form that asks users if they're in a noisy environment / can use headphones
- [ ] Show zoom link if qualified, show fallback page if not
- [ ] Integrate chat solution (likely Chaport) with fallback page
- [ ] Styling cleanup / externalize branding assets
- [ ] Externalize chat solution / support multiple chat solutions
- [ ] Externalize video solution / support more than just a single zoom link
- [ ] Support for URL Parameters to allow user to be addressed by (user)name

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
