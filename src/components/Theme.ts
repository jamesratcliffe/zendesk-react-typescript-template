import {DEFAULT_THEME} from '@zendeskgarden/react-theming';

/**
 * Custom Zendesk Garden theme.
 *
 * @type {object}
 */
const Theme = DEFAULT_THEME;

Theme.fontSizes = {
  'xs': '8.33px',
  'sm': '10px',
  'md': '12px',
  'lg': '14.4px',
  'xl': '17.28px',
  'xxl': '20.74px',
  'xxxl': '24.88px',
};

Theme.iconSizes = {
  'sm': '10px',
  'md': '12px',
  'lg': '20px',
};

const baseSpace = 3;

Theme.space = {
  'base': baseSpace,
  'xxs': `${baseSpace}px`,
  'xs': `${baseSpace * 2}px`,
  'sm': `${baseSpace * 3}px`,
  'md': `${baseSpace * 5}px`,
  'lg': `${baseSpace * 8}px`,
  'xl': `${baseSpace * 10}px`,
  'xxl': `${baseSpace * 12}px`,
};

export default Theme;
