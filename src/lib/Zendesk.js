/**
 * Zendesk Apps Framework client.
 */
export let zendeskClient;

let context;
let metadata;

/**
 * ZAFClient object (from script tag)
 *
 * @var ZAFClient
 */
if (typeof ZAFClient === 'undefined') {
  throw new Error('ZAFClient cannot run outside Zendesk');
} else {
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
  const { settings } = await getAppMetadata();
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

/**
 * Get the frontend URL for a Zendesk record.
 *
 * @param {'organization'|'ticket'|'user'} type
 * @param {number} id
 * @returns {Promise<URL>}
 */
export const getZendeskRecordUrl = async (type, id) => {
  const subdomain = await getSubdomain();

  return new URL(`https://${subdomain}.zendesk.com/agent/${type}s/${id}`)
}

/**
 * Make an API request through the Zendesk Apps Framework.
 *
 * @param options
 * @returns {Promise<object>}
 */
export const externalRequest = async options => {
  options.httpCompleteResponse = true;
  const { responseJSON } = await zendeskClient.request(options);
  return responseJSON;
};

/**
 * Resize an app the given dimensions.
 *
 * @param {Object} dimensions
 * @param {string} dimensions.height
 * @param {string} dimensions.width
 * @returns {Promise<void>}
 */
export const resizeApp = async (dimensions) => {
  try {
    await zendeskClient.invoke('resize', dimensions);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Resize a sidebar app to a given height value.
 *
 * @param {string} height
 * @returns {Promise<void>}
 */
export const resizeSidebarApp = async (height) => {
  await resizeApp({ height, width: '100%' });
};

/**
 * Send a native Zendesk notification
 *
 * @param {string} message
 * @param {'notice'|'alert'|'error'} kind
 * @param {boolean} sticky
 * @returns {Promise<void>}
 */
export const notify = async (message, kind = 'notice', sticky = false) => {
  await zendeskClient.invoke('notify', message, kind, { sticky });
};