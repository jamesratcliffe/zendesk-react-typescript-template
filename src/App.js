import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Grid } from '@zendeskgarden/react-grid';
import Theme from './components/Theme';
import '@zendeskgarden/css-bedrock';
import useDynamicAppHeight from './hooks/zendesk/useDynamicAppHeight';
import { Greeting } from './components/Greeting';
import GardenDemo from './components/ComponentDemo';

/*
Little example Zendesk app with React and Zendesk Garden.

See the React docs on Hooks for more info about useState() and useEffect().
  https://reactjs.org/docs/hooks-intro.html

We're able to use an SVG file as a React component by installing the
@svgr/parcel-plugin-svgr package.
 */

/**
 * We need to create a client for React Query to provide to other components
 * @type {QueryClient}
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60000,
    },
  },
});

const App = () => {
  const appHeightRef = useDynamicAppHeight();

  return (
      <QueryClientProvider
          client={queryClient}> {/* Provide the react-query client to the app */}
        <ThemeProvider theme={Theme}> {/* Using an optional custom theme */}
          <div className="main"
               ref={appHeightRef}> {/* This div will change height dynamically to fit its content */}
            <Grid>
              <Greeting/>
              <GardenDemo/>
            </Grid>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
  );
};

export default App;
