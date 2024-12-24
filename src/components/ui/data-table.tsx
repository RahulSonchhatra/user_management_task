// "use client"

// import {
//     ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
//     getPaginationRowModel,
//     SortingState,
//     getSortedRowModel,
// } from "@tanstack/react-table"

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Button } from "./button"
// import React from "react"
// import { Input } from "./input"

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
// }

// export function DataTable<TData, TValue>({
//     columns,
//     data,
// }: DataTableProps<TData, TValue>) {
//     const [sorting, setSorting] = React.useState<SortingState>([])

//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onSortingChange: setSorting,
//         getSortedRowModel: getSortedRowModel(),
//         state: {
//             sorting,
//         },
//     })



//     return (
//         <div>
//             <Input
//                 placeholder="Filter emails..."
//                 value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
//                 onChange={(event) =>
//                     table.getColumn("email")?.setFilterValue(event.target.value)
//                 }
//                 className="max-w-sm"
//             />
//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <TableHead key={header.id}>
//                                             {header.isPlaceholder
//                                                 ? null
//                                                 : flexRender(
//                                                     header.column.columnDef.header,
//                                                     header.getContext()
//                                                 )}
//                                         </TableHead>
//                                     )
//                                 })}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     data-state={row.getIsSelected() && "selected"}
//                                 >
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                                     No results.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//             <div className="flex items-center justify-end space-x-2 py-4">
//                 <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => table.previousPage()}
//                     disabled={!table.getCanPreviousPage()}
//                 >
//                     Previous
//                 </Button>
//                 <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => table.nextPage()}
//                     disabled={!table.getCanNextPage()}
//                 >
//                     Next
//                 </Button>
//             </div>

//         </div>
//     )
// }



"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import React from "react"
import { Input } from "./input"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalRows: number
    pageSize: number
    currentPage: number
    onSearchChange: (search: string) => void
    onPaginationChange: (page: number) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalRows,
    pageSize,
    currentPage,
    onSearchChange,
    onPaginationChange,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [search, setSearch] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    const totalPages = Math.ceil(totalRows / pageSize)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearch(value)
        onSearchChange(value)
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            onPaginationChange(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPaginationChange(currentPage + 1)
        }
    }

    return (
        <div>
            <Input
                placeholder="Filter emails..."
                value={search}
                onChange={handleSearch}
                className="max-w-sm"
            />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
            <div className="flex items-center justify-between py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
