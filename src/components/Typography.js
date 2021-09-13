import styled from 'styled-components';
import {XXL} from '@zendeskgarden/react-typography';

/*
This is an example of how you can use the styled-components package to easily
make a new component by slapping some CSS styles onto an existing one.

See https://styled-components.com/

Instead of just a static value for the margin, we use a callback that checks
the component's props so we can get a spacing value from the Zendesk Garden
theme.
 */

export const Header = styled(XXL)`
  margin-bottom: ${props => props.theme.space.md};
`;