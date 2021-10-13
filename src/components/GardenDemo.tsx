import ZendeskWordmark from "@zendeskgarden/svg-icons/src/26/wordmark-zendesk.svg";
import {Button} from "@zendeskgarden/react-buttons";
import LeafIcon from "@zendeskgarden/svg-icons/src/12/leaf-stroke.svg";
import * as React from "react";
import {Grid, Row} from "@zendeskgarden/react-grid";
import {Greeting} from "./Greeting";

export const GardenDemo = () => (
    <Grid>
        <Greeting />
        <Row justifyContent="between">
            <ZendeskWordmark color="green" />
            <Button>
                <Button.StartIcon>
                    <LeafIcon />
                </Button.StartIcon>
                Button
            </Button>
        </Row>
    </Grid>
);
