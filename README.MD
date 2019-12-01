# Kitchen Sorcery in-browser food delivery order tracker

## Project Installation

1. Install dependencies

```bash
$ cd kitchen_sorcery
$ npm install
```

## Run the application

1. Create webpack bundle file(bundle.js)

   - Development

   ```bash
   $ npm run dev
   ```

   - Production

   ```bash
   $ npm run build
   ```

2. Start server on http://localhost:3000/

```bash
$ npm run server
```

## Run tests

```bash
$ npm test
```

## Tech Stack

1. ReactJs
   - Built UI with ReactJs for improved rendering performance and component reuse.
2. React Styled-Components
   - Styled components with React Styled-Components to eliminate stylesheets.
3. Socket.io
   - Implemented two-way communication between client and server with Socket.io.
4. MapBox API
   - Implemented map of order destinations with Mapbox GL JS. Click on marker to see address details.
5. NodeJs/ExpressJs
   - Implemented server and server static assets with NodeJs and ExpressJs. The server is currently setup to read JSON file once on initial reload only to prevent computer crashing. To read again, restart server or remove line 10 and 14 in server/index.js.
6. Jest/Enzyme
   - Wrote unit and integration tests with Jest and Enzyme.
7. ESLint
   - Implemented linting with ESLint to ensure quality of code.
8. Babel
   - Transpiled JSX with Babel.
9. Webpack
   - Build bundle file with webpack.
