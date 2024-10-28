"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";
import { TableView } from "@/components/data-table/table-view";
import { TablePagination } from "@/components/data-table/table-pagination";
import { useUserData } from "@/hooks/use-user-data";

export default function PaginatedTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const { data, totalCount, error, isLoading, fetchData } = useUserData(itemsPerPage);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [fetchData, currentPage, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-blue-950">
      <Card className="w-full max-w-7xl h-[95vh]">
        <CardHeader className="space-y-1 bg-blue-800 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            User Data
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] flex flex-col">
          <div className="mb-4 mt-4 relative">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 border-gray-200 dark:border-gray-800 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={18}
            />
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="mb-4 bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-800"
            >
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-200">
                Error
              </AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="relative flex-grow overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="overflow-x-auto h-full">
              {isLoading ? (
                <div className="text-center py-20">
                  <p className="text-blue-600 dark:text-blue-400 text-lg">
                    Loading...
                  </p>
                </div>
              ) : data.length > 0 ? (
                <TableView
                  data={data}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
              ) : (
                <div className="text-center py-20">
                  <p className="text-blue-600 dark:text-blue-400 text-lg">
                    {searchTerm ? "No results found" : "No records available"}
                  </p>
                </div>
              )}
            </div>

            {totalCount > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-950 p-4 border-t border-gray-200 dark:border-gray-800">
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
