import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";

export default function UserList() {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                console.log(params);
                return (
                    <>
                        <Avatar src={params.value.avatar} />
                        {params.value.username}
                    </>
                );
            }
        },
        { field: "email", headerName: "E-mail", width: 130 },
        {
            field: "status",
            headerName: "Status",
            width: 90
        },
        {
            field: "transaction",
            headerName: "Transaction",
            width: 100
        }
    ];

    const rows = [
        {
            id: 1,
            user: {
                username: "Harry Potter",
                avatar:
                    "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
            },
            email: "Harry@gmail.com",
            status: "Active",
            transaction: "$120"
        }
    ];

    return (
        <>
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </>
    );
}