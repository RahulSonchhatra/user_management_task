"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "./ui/button"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>
    },
    {
        accessorKey: "firstName",
        header: "FirstName",
    },
    {
        accessorKey: "lastName",
        header: "LastName",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },

]
