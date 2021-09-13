import React from 'react';
import ZendeskWordmark
  from '@zendeskgarden/svg-icons/src/26/wordmark-zendesk.svg';
import LeafIcon from '@zendeskgarden/svg-icons/src/16/leaf-stroke.svg';
import { Button } from '@zendeskgarden/react-buttons';
import { Row } from '@zendeskgarden/react-grid';

const GardenDemo = () => (
    <Row justifyContent="between">
      <ZendeskWordmark color="green"/>
      <Button>
        <Button.StartIcon>
          <LeafIcon/>
        </Button.StartIcon>
        Button
      </Button>
    </Row>
);

export default GardenDemo;