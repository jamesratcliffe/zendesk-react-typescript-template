import React from 'react';
import { Row } from '@zendeskgarden/react-grid';
import { Header } from './Typography';
import useCurrentUser from '../hooks/zendesk/useCurrentUser';

export const Greeting = () => {
  const { isSuccess: userIsLoaded, data: currentUser } = useCurrentUser();

  return (
    userIsLoaded && (
        <Row>
          <Header tag="h1">Hi, {currentUser.name}</Header>
        </Row>
    )
  )
};