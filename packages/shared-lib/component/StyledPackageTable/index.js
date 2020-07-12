import Table from './Table';
import Thead from './Thead';
import Tbody from './Tbody';
import TdTemp from './Td';
import withSyntheticEvents from '../../hoc/withSyntheticEvents';

const Td = withSyntheticEvents(TdTemp);

const StyledPackageTable = {
  Table,
  Thead,
  Tbody,
  Td
};

export default StyledPackageTable;