import { getAppSettings } from './Zendesk';

/**
 * ZAF and app config data from ZAF.
 *
 * @type {object}
 */

let configData = {};

export let initialized = false;

/**
 * Get and store the ZAF and app config.
 *
 * @returns {Promise<object>}
 */
export async function init() {
  const appSettings = await getAppSettings();
  configData = { ...configData, ...appSettings };
  initialized = true;
}

/**
 * Get a config value or all values asynchronously,
 * making sure the config is loaded from ZAF.
 *
 * @param {string} [key]
 *
 * @returns {*}
 */
export const configAsync = async (key = undefined) => {
  if (!initialized) {
    await init();
  }

  switch (typeof key) {
    case 'undefined':
      return configData;
    case 'string':
      const { [key]: value = undefined } = configData;
      return value;
    default:
      return undefined;
  }
};
