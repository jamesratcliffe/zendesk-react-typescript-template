import { useQuery } from 'react-query';
import { externalRequest, zendeskClient } from '../../lib/Zendesk';

/**
 * Organization object from the Zendesk REST API
 *
 * @typedef {Object} RestOrganization
 * @property {int} id
 * @property {string} external_id
 * @property {string} updated_at
 */

/**
 * Query hook to get the current organization's info from the REST API.
 *
 * (Some org data isn't available from the ZAF)
 *
 * @returns {object}
 */
const useOrganizationInfo = () => useQuery('organization', async () => {
  const ZAFData = await zendeskClient.get('organization.id');
  /** @type RestOrganization */
  const { organization } = await externalRequest({
    url: `/api/v2/organizations/${ZAFData['organization.id']}`,
    type: 'GET',
    dataType: 'json',
  });
  return organization;
});

export default useOrganizationInfo;