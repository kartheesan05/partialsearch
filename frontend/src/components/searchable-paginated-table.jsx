"use client";

import * as React from "react";
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
import { getUsers } from "@/lib/actions";

export function SearchablePaginatedTableComponent() {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const itemsPerPage = 100;

  const fetchData = React.useCallback(async () => {
    const result = await getUsers(currentPage, itemsPerPage, searchTerm);
    setData(result.users);
    setTotalCount(result.totalCount);
  }, [currentPage, searchTerm]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <Card className="w-full max-w-7xl h-[95vh]">
        <CardHeader>
          <CardTitle>User Directory (100 records per page)</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] flex flex-col">
          <div className="mb-4">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="relative flex-grow overflow-hidden">
            <div className="overflow-x-auto h-full">
              {data.length > 0 ? (
                <Table className="w-full min-w-[800px]">
                  <TableHeader className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                    <TableRow>
                      <TableHead className="w-16">S.No</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Second Name</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
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
                    {/* <TableRow>
                      <TableCell colSpan={4} className="h-20"></TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchTerm ? "No results found" : "No records available"}
                  </p>
                </div>
              )}
            </div>
            {totalCount > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-950 p-4 border-t border-gray-200 dark:border-gray-800">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {totalPages <= 5 ? (
                      [...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
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
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && <PaginationEllipsis />}
                        {currentPage > 2 && currentPage < totalPages - 1 && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage - 1)}
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
                            >
                              {currentPage}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        {currentPage < totalPages - 1 && currentPage > 1 && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              {currentPage + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        {currentPage < totalPages - 2 && <PaginationEllipsis />}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages)}
                            isActive={currentPage === totalPages}
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
