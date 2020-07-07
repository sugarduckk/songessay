import styledLink from './styledLink';
import ClickableTextTemp from './ClickableText';
import withSyntheticEvents from '../hoc/withSyntheticEvents';

const ClickableText = withSyntheticEvents(ClickableTextTemp);

export {
  styledLink,
  ClickableText
};