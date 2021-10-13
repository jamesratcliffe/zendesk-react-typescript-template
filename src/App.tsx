import * as React from 'react';
import {useMemo} from 'react';
import {ThemeProvider} from '@zendeskgarden/react-theming';
import {Grid} from '@zendeskgarden/react-grid';
import Theme from './components/Theme';
import '@zendeskgarden/css-bedrock';
import useDynamicAppHeight from './hooks/zendesk/useDynamicAppHeight';
import {Greeting} from './components/Greeting';
import GardenDemo from './components/GardenDemo';
import {Client, UserProvider, ZAFClientContextProvider} from "@zendesk/sell-zaf-app-toolbox";

/*
Little example Zendesk app with React and Zendesk Garden.

See the React docs on Hooks for more info about useState() and useEffect().
  https://reactjs.org/docs/hooks-intro.html

We're able to use an SVG file as a React component by installing the
@svgr/parcel-plugin-svgr package.
 */


declare let ZAFClient: {
    init: () => Client;
};

const App = () => {
    const client = useMemo(() => ZAFClient.init(), []);
    const appHeightRef = useDynamicAppHeight();

    return (
        <ZAFClientContextProvider value={client}>
            <UserProvider>
                {/* Provide the Zendesk theme */}
                <ThemeProvider theme={Theme}>
                    {/* This div will change height dynamically to fit its content */}
                    <div className="main" ref={appHeightRef}>
                        <Grid>
                            <Greeting />
                            <GardenDemo />
                        </Grid>
                    </div>
                </ThemeProvider>
            </UserProvider>
        </ZAFClientContextProvider>
    );
};

export default App;
