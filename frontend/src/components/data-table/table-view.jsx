import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableView({ data, currentPage, itemsPerPage }) {
  return (
    <Table className="w-full min-w-[800px]">
      <TableHeader className="sticky top-0 bg-blue-100 dark:bg-blue-900 z-10">
        <TableRow>
          <TableHead className="w-16 text-center text-blue-700 dark:text-blue-300">
            S.No
          </TableHead>
          <TableHead className="text-blue-700 dark:text-blue-300">
            First Name
          </TableHead>
          <TableHead className="text-blue-700 dark:text-blue-300">
            Second Name
          </TableHead>
          <TableHead className="text-blue-700 dark:text-blue-300">
            Email
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={item.id}
            className="hover:bg-blue-50 dark:hover:bg-blue-800/50 transition-colors"
          >
            <TableCell className="text-center font-medium text-blue-600 dark:text-blue-400">
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
  );
}
