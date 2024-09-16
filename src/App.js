import { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import momo from "moment";
import { SearchOutlined } from "@ant-design/icons";
import Data from "./vehicle_data.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter data based on the search value
  const filteredData = Data.filter(
    (vehicle) =>
      vehicle.Name.toLowerCase().includes(searchValue.toLowerCase()) ||
      vehicle.Model.toLowerCase().includes(searchValue.toLowerCase()) ||
      vehicle.Manufacturer.toLowerCase().includes(searchValue.toLowerCase()) ||
      (vehicle.Type && vehicle.Type.toLowerCase().includes(searchValue.toLowerCase()))
  )
    .sort((a, b) => {
      const searchTerm = searchValue.toLowerCase();
      const aMatch =
        a.Name.toLowerCase().startsWith(searchTerm) ||
        a.Model.toLowerCase().startsWith(searchTerm) ||
        a.Manufacturer.toLowerCase().startsWith(searchTerm) ||
        (a.Type && a.Type.toLowerCase().startsWith(searchTerm));
  
      const bMatch =
        b.Name.toLowerCase().startsWith(searchTerm) ||
        b.Model.toLowerCase().startsWith(searchTerm) ||
        b.Manufacturer.toLowerCase().startsWith(searchTerm) ||
        (b.Type && b.Type.toLowerCase().startsWith(searchTerm));
  
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    })
    // Remove duplicates based on 'Name' field or any other key field
    .filter((vehicle, index, self) => 
      index === self.findIndex((v) => v.Name === vehicle.Name)
    );

  const handleChange = (pagination) => {
    setCurrentPage(pagination.current); 
    setPageSize(pagination.pageSize); 
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.Name.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: "Model",
      dataIndex: "Model",
      key: "model",
      sorter: (a, b) => a.Model.localeCompare(b.Model),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Model"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.Model.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "type",
      sorter: (a, b) => a.Type.localeCompare(b.Type),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Type"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.Type.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: "Manufacturer",
      dataIndex: "Manufacturer",
      key: "manufacturer",
      sorter: (a, b) => a.Manufacturer.localeCompare(b.Manufacturer),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Manufacturer"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.Manufacturer.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: "Manufacturing Date",
      dataIndex: "Manufacturing Date",
      key: "manufacturingDate",
      sorter: (a, b) => new Date(a["Manufacturing Date"]) - new Date(b["Manufacturing Date"]),
      render: (date) => momo(date).format("YYYY-MM-DD") // Formatting the date
    },
    {
      title: "Seating Capacity",
      dataIndex: "Seating",
      key: "seating",
      sorter: (a, b) => a.Seating - b.Seating,
    }
  ];

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
            columns={columns}
            dataSource={filteredData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData.length,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
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
