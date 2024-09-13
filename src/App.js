import { useState } from "react";
import { Table, Input } from "antd";
import momo from "moment";
import Data from "./vehicle_data.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [searchValue, setsearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [psize, setpsize] = useState(5);

  const handleSearch = (e) => {
    setsearchValue(e.target.value);
  };

  const filteredData = Data.filter(
    (vehicle) =>
      vehicle.Name.toLowerCase().includes(searchValue.toLowerCase()) ||
      vehicle.Model.toLowerCase().includes(searchValue.toLowerCase()) ||
      vehicle.Manufacturer.toLowerCase().includes(searchValue.toLowerCase())
  );

  const col = [
    { title: "Name", dataIndex: "Name", key: "name" },
    { title: "Model", dataIndex: "Model", key: "model" },
    { title: "Type", dataIndex: "Type", key: "type" },
    { title: "Manufacturer", dataIndex: "Manufacturer", key: "manufacturer" },
    {
      title: "Manufacturing Date",
      dataIndex: "Manufacturing Date",
      key: "manufacturingDate",
      render: (date) => momo(date).format("YYYY-MM-DD"), // Formatting the date
    },
    { title: "Seating Capacity", dataIndex: "Seating", key: "seating" },
  ];

  // Handling page change
  const handleChange = (pagination) => {
    setCurrentPage(pagination.current); 
    setpsize(pagination.psize); 
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6">
          <Input
            placeholder="Search by Name, Model, or Manufacturer"
            value={searchValue}
            onChange={handleSearch}
            className="border-2 border-sky-300 rounded-lg h-10 w-full"
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={col}
            dataSource={filteredData}
            pagination={{
              current: currentPage,
              psize: psize,
              total: filteredData.length,
              showSizeChanger: true,
              psizeOptions: ["5", "10", "20", "50"],
            }}
            onChange={handleChange}
            rowKey="Name"
            className="w-full"
            scroll={{ x: true }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
