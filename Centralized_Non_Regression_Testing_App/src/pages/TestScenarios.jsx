import React, { useState, useEffect } from "react";
import DownArrow from "../assets/down.png";
import { Space, Table, Tag } from "antd";
import "../css/TestScenarios.css";
import TestCaseCard from "../components/TestCaseCard";

const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const TestScenarios = () => {
  const testCases = [
    { id: 1, name: "Test Case 1" },
    { id: 2, name: "Test Case 2" },
    { id: 3, name: "Test Case 3" },
  ];
  const [isOpen, setOpen] = useState(false);
  const [cases, setCases] = useState([]);
  const [selectedTestCases, setSelectedTestCases] = useState([]);

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

  const handleCardClick = (testCase) => {
    setSelectedTestCases((prevSelected) => {
      if (prevSelected.find((selected) => selected.id === testCase.id)) {
        return prevSelected.filter((selected) => selected.id !== testCase.id);
      } else {
        return [...prevSelected, testCase];
      }
    });
  };
  return (
    <div>
      <h1 className="font-bold text-4xl">Test Scenarios</h1>
      <p className="text-gray-400 text-sm">Create scenarios with test cases</p>
      <div className="bg-white shadow-md mt-4 rounded-md p-5 ">
        <div
          onClick={() => setOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-xl font-extrabold">Create Test Scenarios</p>
          <img className="w-6" src={DownArrow} alt="" />
        </div>
        {isOpen && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <input
                  placeholder="Scenario Name"
                  className="text-sm p-4 bg-zinc-100 rounded placeholder:text-xs outline-none"
                  type="text"
                />
                <select
                  className="text-zinc-500 bg-zinc-100 p-4 rounded-md text-sm"
                  name=""
                  id=""
                >
                  <option value="">SMPP</option>
                  <option value="">MAP</option>
                </select>
              </div>
              <button className="text-white text-sm p-5 rounded-lg w-24 bg-purple-600">
                Save
              </button>
            </div>
            <div class="flex gap-8 mt-4">
              <div class="w-1/2">
                <p className="text-lg font-extrabold text-purple-600">
                  Select Test Cases
                </p>
                <p className="mt-2">10 test cases founded</p>
                <div class="grid grid-cols-2 gap-3 mt-3">
                  {cases.map((testCase) => (
                    <TestCaseCard
                      key={testCase.id}
                      name={testCase.name}
                      parameters={testCase.parameters}
                      testCase={testCase}
                      isSelected={selectedTestCases.some(
                        (selected) => selected.id === testCase.id
                      )}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
              <div class="w-1/2">
                <p className="text-lg font-extrabold text-purple-600">
                  Selected Test Cases
                </p>
                <div className="space-y-3 mt-2">
                  {selectedTestCases.map((testCase) => (
                    <div className="bg-zinc-100 p-4 rounded-lg">
                      <p>{testCase.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Table
        className="custom-table my-7 shadow-md bg-white rounded-lg"
        dataSource={data}
      >
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
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

export default TestScenarios;
