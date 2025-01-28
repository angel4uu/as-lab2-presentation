import { ColumnDef } from "@tanstack/react-table"
import { getMainQuery, Student } from "../api/studentApi"
import { DataTable } from "./ui/data-table"
import { useEffect, useState } from "react"
import {  ProfessionalCareer } from "../api"
import { ComboboxDemo } from "./ui/combobox"

interface MainQueryProps {
  careers: ProfessionalCareer[];
}

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "first_name",
    header: "First name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "entry_date",
    header: "Entry date",
  }
]

export const MainQuery = ({ careers }: MainQueryProps) => {
  const [query, setQuery] = useState<Student[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<number>(0);
  const transformedCareers = Array.isArray(careers) ? careers.map((career) => ({
    value: String(career.code),
    label: career.name,
  })) : [];

  useEffect(() => {
    const fetchMainQuery =async()=> {
      try {
        const response = await getMainQuery(selectedCareer);
        setQuery(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if(selectedCareer!==0){
      fetchMainQuery();
    }
    
  }, [selectedCareer])
  return (
    <div className="flex flex-col gap-6">
      <p>
        Lista alumnos por carrera profesional cuyos alumnos
        ingresaron después del 1/1/2021, su color favorito no es
        Rojo y su edad esté entre 18 y 25 años.
      </p>
      <div className="w-full flex justify-end">
        <ComboboxDemo data={transformedCareers} elementName={"career"} onSelect={(value) => setSelectedCareer(Number(value))}/>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={query} />
      </div>
    </div>
  )
}
