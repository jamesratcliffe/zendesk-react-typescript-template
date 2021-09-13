// noinspection JSUnusedGlobalSymbols
import { useQuery } from 'react-query';
import { zendeskClient } from '../../lib/Zendesk';

/**
 * Hook for ZAF client-side API.
 *
 * See Zendesk docs for valid paths argument values:
 * https://developer.zendesk.com/apps/docs/core-api/client_api#client.getpaths
 *
 * The paths argument is also used passed as the queryKey to React Query.
 *
 * @param {string|array} paths
 * @param {boolean|"always"} refetch Shorthand for useQuery's refetch options
 * @return {object}
 */
const useZAFGet = (paths, refetch = false) => useQuery(paths, async () => {
  return await zendeskClient.get(paths);
}, {
  refetchOnMount: refetch,
  refetchOnReconnect: refetch,
  refetchOnWindowFocus: refetch,
});

export default useZAFGet;