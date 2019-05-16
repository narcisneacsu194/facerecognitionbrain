import React from "react";

const Rank = ({ name, entryCount }) => {
  return (
    <div>
      <div className="white f3">{`${name}, your current entry count is ${entryCount}`}</div>
    </div>
  );
};

export default Rank;
