import InnerContainer from './InnerContainer';
import OuterContainer from './OuterContainer';
import CardTemp from './Card';
import withSyntheticEvents from '../../hoc/withSyntheticEvents';

const Card = withSyntheticEvents(CardTemp);

const StatusMenu = {
  OuterContainer,
  InnerContainer,
  Card
};

export default StatusMenu;