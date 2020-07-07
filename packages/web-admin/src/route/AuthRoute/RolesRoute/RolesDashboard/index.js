import React from 'react';
import RoleCard from './RoleCard';

const RolesDashboard = ({ roles }) => {
  const [expandIndex, setExpandIndex] = React.useState();
  return <div>
    {roles && roles.map((role, roleIndex) => {
      return <RoleCard key={role.id} role={role} roleIndex={roleIndex} expandIndex={expandIndex} setExpandIndex={setExpandIndex} />;
    })}
  </div>;
};

export default RolesDashboard;