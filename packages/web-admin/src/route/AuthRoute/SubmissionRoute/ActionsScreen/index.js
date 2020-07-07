import React from 'react';

const ActionsScreen = ({ actions }) => {
  return <div>
    ActionsScreen
    <ul>
      {actions && actions.map((action, actionIndex) => {
        return <li key={action.id}>{action.data.action}</li>;
      })}
    </ul>
  </div>;
};

export default ActionsScreen;