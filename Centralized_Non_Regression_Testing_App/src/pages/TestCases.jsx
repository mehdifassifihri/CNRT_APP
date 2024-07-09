import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import "../css/TestScenarios.css";
import { Tooltip } from "antd";

const { Column, ColumnGroup } = Table;

const TestCases = () => {
  const [parameters, setParameters] = useState([{ key: "", value: "" }]);
  const [name, setName] = useState("");
  const [cases, setCases] = useState(null);

  const addTestCase = async () => {
    const testCaseData = {
      name: name,
      parameters: parameters,
    };

    try {
      const response = await fetch("http://localhost:8085/testcase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCaseData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Success:", result);
      fetchData();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8085/testcase");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setCases(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyChange = (index, e) => {
    const newParameters = [...parameters];
    newParameters[index].key = e.target.value;
    setParameters(newParameters);
  };

  const handleValueChange = (index, e) => {
    const newParameters = [...parameters];
    newParameters[index].value = e.target.value;
    setParameters(newParameters);
  };

  const addParameter = () => {
    setParameters([...parameters, { key: "", value: "" }]);
  };

  const removeParameter = (index) => {
    const newParameters = parameters.filter((_, i) => i !== index);
    setParameters(newParameters);
  };
  return (
    <div>
      <h1 className="font-bold text-4xl">Test Cases</h1>
      <p className="text-gray-400 text-sm">Create test cases</p>
      <div className="w-full shadow-md p-6 mt-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <p className="text-xl font-extrabold">Create Test Cases</p>
        </div>
        <div className="mt-3 flex justify-between items-end">
          <div className="space-y-3">
            <input
              onChange={handleNameChange}
              placeholder="Name of Test Case"
              className="text-sm bg-zinc-100 rounded-md p-4 outline-none placeholder:text-xs"
              type="text"
            />
            <div className="flex flex-col gap-3">
              {parameters.map((param, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    placeholder="Key"
                    value={param.key}
                    onChange={(e) => handleKeyChange(index, e)}
                    className="text-sm bg-zinc-100 rounded-md p-4 outline-none placeholder:text-xs mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={param.value}
                    onChange={(e) => handleValueChange(index, e)}
                    className="text-sm bg-zinc-100 rounded-md p-4 outline-none placeholder:text-xs mr-2"
                  />
                  {parameters.length > 1 && (
                    <button
                      onClick={() => removeParameter(index)}
                      className="text-sm bg-red-500 text-white rounded-md p-2 outline-none"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addParameter}
                className="text-sm bg-blue-500 text-white rounded-md p-4 outline-none"
              >
                Add Parameter
              </button>
              <div className="mt-4">
                <h3 className="text-lg">Generated URL</h3>
                <p className="bg-zinc-100 rounded-md p-4">
                  getUserInfo?
                  {parameters
                    .map((param) => `${param.key}=${param.value}`)
                    .join("&")}
                </p>
              </div>
            </div>
            <div className="">
              <p className="font-bold text-xs mt-5"></p>
            </div>
          </div>

          <button
            onClick={addTestCase}
            className="bg-purple-600 text-white text-sm p-5 rounded-md h-14"
          >
            Create
          </button>
        </div>
      </div>
      <Table
        className="custom-table my-7 shadow-md bg-white rounded-lg"
        dataSource={cases}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Parameters"
          key="parameters"
          render={(text, record) => (
            <Space size="middle">
              {record.parameters.map((param) => (
                <Tooltip title={param.value}>
                  <Tag key={param.id} color="blue">
                    {param.key}
                  </Tag>
                </Tooltip>
              ))}
            </Space>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default TestCases;
