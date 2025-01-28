import { useEffect, useState } from "react";
import { getCountByCareer, StudentCount } from "../api";
import { DataTable } from "./ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<StudentCount>[] = [
  {
    accessorKey: "career",
    header: "Career",
  },
  {
    accessorKey: "student_count",
    header: "Student count",
  },
]

export const CountStudents = () => {
  const [query, setQuery] = useState<StudentCount[]>([]);
  useEffect(() => {
    const fetchStudentCount =async()=>{
      try {
        const response = await getCountByCareer();
        console.log(response.data);
        setQuery(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudentCount();   
  }, [])
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={query} />
    </div>
  )
}