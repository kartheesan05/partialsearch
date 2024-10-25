"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";

export default function SearchablePaginatedTableComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 100;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${currentPage}&perPage=${itemsPerPage}&searchTerm=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.users);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-950">
      <Card className="w-full max-w-7xl h-[95vh] shadow-lg border-purple-200 dark:border-purple-800">
        <CardHeader className="bg-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">User Data</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] flex flex-col">
          <div className="mb-4 mt-4 relative">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:focus:border-purple-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
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
          <div className="relative flex-grow overflow-hidden rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="overflow-x-auto h-full">
              {isLoading ? (
                <div className="text-center py-20">
                  <p className="text-purple-600 dark:text-purple-400 text-lg">
                    Loading...
                  </p>
                </div>
              ) : data.length > 0 ? (
                <Table className="w-full min-w-[800px]">
                  <TableHeader className="sticky top-0 bg-purple-100 dark:bg-purple-900 z-10">
                    <TableRow>
                      <TableHead className="w-16 text-center text-purple-700 dark:text-purple-300">
                        S.No
                      </TableHead>
                      <TableHead className="text-purple-700 dark:text-purple-300">
                        First Name
                      </TableHead>
                      <TableHead className="text-purple-700 dark:text-purple-300">
                        Second Name
                      </TableHead>
                      <TableHead className="text-purple-700 dark:text-purple-300">
                        Email
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="hover:bg-purple-50 dark:hover:bg-purple-800/50 transition-colors"
                      >
                        <TableCell className="text-center font-medium text-purple-600 dark:text-purple-400">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.second_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="h-20"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-20">
                  <p className="text-purple-600 dark:text-purple-400 text-lg">
                    {searchTerm ? "No results found" : "No records available"}
                  </p>
                </div>
              )}
            </div>
            {totalCount > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-950 p-4 border-t border-purple-200 dark:border-purple-800">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                      />
                    </PaginationItem>
                    {totalPages <= 5 ? (
                      [...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className={
                              currentPage === i + 1
                                ? "bg-purple-500 text-white"
                                : "text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                            }
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    ) : (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(1)}
                            isActive={currentPage === 1}
                            className={
                              currentPage === 1
                                ? "bg-purple-500 text-white"
                                : "text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                            }
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && (
                          <PaginationEllipsis className="text-purple-600 dark:text-purple-400" />
                        )}
                        {currentPage > 2 && currentPage < totalPages - 1 && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage - 1)}
                              className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                            >
                              {currentPage - 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        {currentPage !== 1 && currentPage !== totalPages && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage)}
                              isActive
                              className="bg-purple-500 text-white"
                            >
                              {currentPage}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        {currentPage < totalPages - 1 && currentPage > 1 && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                            >
                              {currentPage + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        {currentPage < totalPages - 2 && (
                          <PaginationEllipsis className="text-purple-600 dark:text-purple-400" />
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages)}
                            isActive={currentPage === totalPages}
                            className={
                              currentPage === totalPages
                                ? "bg-purple-500 text-white"
                                : "text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                            }
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
