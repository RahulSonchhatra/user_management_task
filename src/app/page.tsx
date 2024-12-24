"use client"

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/services";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/columns";

export default function Home() {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");

  const fetchData = async (page: number, pageSize: number, search: string) => {
    try {
      const response = await fetchUsers(page, pageSize, search);
      console.log("response",response)
      setData(response.users);
      setTotalRows(response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize, search);
  }, [currentPage, search]);

  return (
    <div className="p-8">
      <DataTable
        columns={columns}
        data={data}
        totalRows={totalRows}
        pageSize={pageSize}
        currentPage={currentPage}
        onSearchChange={(value) => setSearch(value)}
        onPaginationChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
