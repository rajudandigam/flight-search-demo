// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

import { initialize, mswDecorator } from 'msw-storybook-addon';

// Point Storybook to the worker served from the app root
initialize({ serviceWorker: { url: '/mockServiceWorker.js' } });

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
