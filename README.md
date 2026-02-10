# node-K Website

## Setup

Make sure to install the dependencies (done automatically when using devcontainer):

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## Docker

A Dockerfile is included in the project which simply builds and serves the app.

To preview a local version of this you can use the `docker-compose.local.yaml` file.

```bash
docker compose -f docker-compose.local.yaml up
```

The `docker-compose.yaml` file includes production specific config such as traefik labels and a proxy network.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.