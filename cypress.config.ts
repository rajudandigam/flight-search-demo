import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "src/cypress/support/e2e.ts",
    specPattern: 'src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1440,
    viewportHeight: 900,
    videosFolder: 'src/cypress/artifacts/videos',
    screenshotsFolder: 'src/cypress/artifacts/screenshots',
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    viewportWidth: 1200,
    viewportHeight: 800,
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: "src/cypress/support/component.ts",
    indexHtmlFile: "src/cypress/support/component-index.html",
    videosFolder: 'cypress-artifacts/videos',
    screenshotsFolder: 'cypress-artifacts/screenshots',
  },
});
