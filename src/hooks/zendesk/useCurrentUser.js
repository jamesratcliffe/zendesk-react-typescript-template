import { useQuery } from 'react-query';
import { zendeskClient } from '../../lib/Zendesk';

/**
 * User object returned by the App API.
 *
 * @typedef {Object} ZAFUser
 * @property {string} role
 */

/**
 * Query hook to get the current user info from the App API.
 *
 * @returns {object}
 */
const useCurrentUser = () => useQuery('currentUser', async () => {
  /** @type ZAFUser */
  const { currentUser } = await zendeskClient.get('currentUser');
  return currentUser;
});

export default useCurrentUser;