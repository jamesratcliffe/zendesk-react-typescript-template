interface ZAFClientObject {
    context(): Promise<ZAFContext>,
    metadata(): Promise<ZAFMetadata>,
    request(options: ExternalRequest): Promise<ExternalResponse>,
    invoke(...args: any[]): Promise<any>,
    invoke(commands: object): Promise<any>,
    get(paths: string | string[]): Promise<object>
}

interface ZAFContext {
    instanceGuid: string,
    product: string,
    account: {
        subdomain: string,
    },
    location: string,
    ticketId: number,
};

interface ZAFMetadata {
    appId: number,
    name: string,
    installationId: number,
    version: string,
    settings: object,
};

interface ExternalRequest {
    accepts?: {
        text?: string,
    },
    autoRetry?: boolean,
    cache?: boolean,
    contentType?: boolean | string,
    data?: string | string[] | object,
    dataType?: 'text' | 'json',
    httpCompleteResponse?: boolean,
    type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    timeout?: number,
    url: string,
    xhrFields?: {
        withCredentials?: boolean
    }
}

interface ExternalResponse {
    responseJSON: object,
    responseText: string,
    status: number,
    statusText: string,
    headers: object,
}

/**
 * Zendesk Apps Framework client.
 */
export let zendeskClient: ZAFClientObject;

let context: ZAFContext;
let metadata: ZAFMetadata;

/**
 * ZAFClient object (from script tag)
 *
 * @var ZAFClient
 */
// @ts-ignore
if (typeof ZAFClient === 'undefined') {
    throw new Error('ZAFClient cannot run outside Zendesk');
} else {
    // @ts-ignore
    zendeskClient = ZAFClient.init();
}

/**
 * Zendesk App context object
 *
 * @typedef {Object} ZAFContext
 * @property {string} instanceGuid
 * @property {string} product
 * @property {object} account
 * @property {string} account.subdomain
 * @property {string} location
 */

/**
 * Get app context from Zendesk
 *
 * @return {Promise<ZAFContext>}
 */
export const getAppContext = async () => {
    if (!context) {
        context = await zendeskClient.context();
    }
    return context;
};

/**
 * Zendesk App metadata object
 *
 * @typedef {Object} ZAFMetadata
 * @property {number} appId
 * @property {string} name
 * @property {number} installationId
 * @property {string} version
 * @property {object} settings
 */

/**
 * Get app context from Zendesk
 *
 * @return {Promise<ZAFMetadata>}
 */
export const getAppMetadata = async () => {
    if (!metadata) {
        metadata = await zendeskClient.metadata();
    }
    return metadata;
};

/**
 * Get app settings from Zendesk.
 *
 * @returns {Promise<object>}
 */
export const getAppSettings = async () => {
    const {settings} = await getAppMetadata();
    return settings;
};

/**
 * Get the Zendesk instance subdomain.
 *
 * @returns {Promise<string>}
 */
export const getSubdomain = async () => {
    const {account: {subdomain}} = await getAppContext();
    return subdomain;
}

type RecordType = 'organization' | 'ticket' | 'user';

/**
 * Get the frontend URL for a Zendesk record.
 */
export const getZendeskRecordUrl = async (type: RecordType, id: number) => {
    const subdomain = await getSubdomain();

    return new URL(`https://${subdomain}.zendesk.com/agent/${type}s/${id}`)
}

/**
 * Make an API request through the Zendesk Apps Framework.
 *
 * @param options
 * @returns {Promise<object>}
 */
export const externalRequest = async (options: ExternalRequest) => {
    options.httpCompleteResponse = true;
    const {responseJSON} = await zendeskClient.request(options);
    return responseJSON;
};

type Dimension = `${number}px` | `${number}%`;

interface Dimensions {
    height: Dimension,
    width: Dimension,
}

/**
 * Resize an app the given dimensions.
 */
export const resizeApp = async (dimensions: Dimensions) => {
    try {
        await zendeskClient.invoke('resize', dimensions);
    } catch (e) {
        console.error(e);
    }
};

/**
 * Resize a sidebar app to a given height value.
 */
export const resizeSidebarApp = async (height: Dimension) => {
    await resizeApp({height, width: '100%'});
};

/**
 * Send a native Zendesk notification
 */
export const notify = async (message: string, kind: string = 'notice', sticky: boolean = false) => {
    await zendeskClient.invoke('notify', message, kind, {sticky});
};