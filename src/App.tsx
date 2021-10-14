import * as React from 'react';
import {useMemo} from 'react';
import {ThemeProvider} from '@zendeskgarden/react-theming';
import Theme from './components/Theme';
import '@zendeskgarden/css-bedrock';
import {Client, UserProvider, ZAFClientContextProvider} from "@zendesk/sell-zaf-app-toolbox";
import {GardenDemo} from "./components/GardenDemo";
import {DynamicHeightContainer} from "./components/DynamicHeightContainer";

/**
 * Little example Zendesk app with React and Zendesk Garden.
 */

declare let ZAFClient: {
    init: () => Client;
};

const App = () => {
    const client = useMemo(() => ZAFClient.init(), []);

    return (
        <ZAFClientContextProvider value={client}>
            <UserProvider>
                {/* Provide the Zendesk theme */}
                <ThemeProvider theme={Theme}>
                    {/* This div will change height dynamically to fit its content */}
                    <DynamicHeightContainer>
                        <GardenDemo />
                    </DynamicHeightContainer>
                </ThemeProvider>
            </UserProvider>
        </ZAFClientContextProvider>
    );
};

export default App;
