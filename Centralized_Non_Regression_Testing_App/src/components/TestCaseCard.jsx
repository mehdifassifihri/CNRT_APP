import React from "react";

const TestCaseCard = ({ testCase, isSelected, onClick, name, parameters }) => {
  return (
    <div
      onClick={() => onClick(testCase)}
      class={`p-4 border-2 rounded-md cursor-pointer ${
        isSelected ? "border-green-500" : "border-gray-300"
      }`}
    >
      <p class="font-bold">{name}</p>
      <div className="mt-2">
        {parameters.map((param, index) => (
          <p key={index} className="text-sm">
            {param.key} : {param.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TestCaseCard;
