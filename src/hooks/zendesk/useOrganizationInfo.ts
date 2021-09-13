import {useQuery} from 'react-query';
import {externalRequest, zendeskClient} from '../../lib/Zendesk';

interface RestOrg {
    id: number,
    external_id: string,
    updated_at: string,
}

interface RestOrgResponse {
    organization: RestOrg,
}

/**
 * Query hook to get the current organization's info from the REST API.
 *
 * (Some org data isn't available from the ZAF)
 */
const useOrganizationInfo = () => useQuery('organization', async () => {
    const ZAFData = await zendeskClient.get('organization.id');
    const {organization} = (await externalRequest({
        url: `/api/v2/organizations/${ZAFData['organization.id']}`,
        type: 'GET',
        dataType: 'json',
    })) as RestOrgResponse;
    return organization;
});

export default useOrganizationInfo;