import styled from 'styled-components';
import LoadMoreContainer from './LoadMoreContainer';

const SubmissionContainer = styled(LoadMoreContainer)`
  display: grid;
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    grid-template-areas:
      "timestamp status"
      "question action";
  }
  grid-template-areas:
    "status"  
    "timestamp"
    "question"
    "action";
  text-align: left;
`;

export default SubmissionContainer;