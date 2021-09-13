import {useQuery} from 'react-query';
import {zendeskClient} from '../../lib/Zendesk';

/**
 * User object returned by the App API.
 *
 * @typedef {Object} ZAFUser
 * @property {string} role
 */

interface ZAFUser {
    name: string,
    email: string,
    role: string,
}

/**
 * Query hook to get the current user info from the App API.
 */
const useCurrentUser = () => useQuery('currentUser', async () => {
    const {currentUser} = (await zendeskClient.get('currentUser')) as {currentUser: ZAFUser};
    return currentUser;
});

export default useCurrentUser;