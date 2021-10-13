import * as React from 'react';
import { Row } from '@zendeskgarden/react-grid';
import { Header } from './Typography';
import {useCurrentUser} from "@zendesk/sell-zaf-app-toolbox";

export const Greeting = () => {
  const user = useCurrentUser();

  return (
    user && (
        <Row>
          <Header tag="h1">Hi, {user.name}</Header>
        </Row>
    )
  )
};
