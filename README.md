# ShoeVox Client

The front-end web client for ShoeVox, a social 3D worldbuilding website.

The repo for the ShoeVox API server can be found [here](https://github.com/isaiahaiasi/shoevox-server)

## Getting Started

### Environment Variables

Certain env variables are required, which can be added to .env or .env.local

- `VITE_API_URL`: The URL to connect to the ShoeVox API.
- `VITE_GOOGLE_CLIENT_ID`: The Client ID for the associated Google API Project used to enable OAuth "Log in with Google."

### Scripts

Install dependencies, then run either of the following commands:

- `pnpm start`: Creates a static build and starts a server to serve the files in Production mode.
- `pnpm dev`: Starts a dev server which utilizes Hot Module Reloading for faster development.
