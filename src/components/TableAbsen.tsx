import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CiTrash } from "react-icons/ci";
import { useData } from "./context";
import FetchService from "@/service/fetch.service";

function TableAbsen() {
  const [data, setData] = useData();
  const fetchService = FetchService.getInstance();

  const handleClick = async (id: string, attendance: boolean) => {
    fetchService.updateStatus(id, { present: attendance }).then((data) => {
      const name = data.name;
      setData((prevData) =>
        prevData.map((person) =>
          person.id === data.id ? { ...person, present: attendance } : person
        )
      );
      toast.success(`${name} is now ${attendance ? "present" : "absent"}`);
    });
  };

  const handleDelete = async (id: string) => {
    fetchService.deleteResource(id).then(() => {
      setData((prevData) => prevData.filter((person) => person.id !== id));
      toast.success("Person deleted successfully");
    });
  };

  return (
    <Table className="text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-center">Attendance</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((person: any, index: number) => (
          <TableRow
            key={person.userId}
            className={`${
              person.present ? "bg-[#a9f0a925]" : "bg-[#ff696125]"
            }`}
          >
            <TableCell
              onClick={() =>
                handleClick(person.id, person.present ? false : true)
              }
              className="font-medium"
            >
              {index + 1}
            </TableCell>
            <TableCell
              onClick={() =>
                handleClick(person.id, person.present ? false : true)
              }
            >
              {person.name}
            </TableCell>
            <TableCell
              onClick={() =>
                handleClick(person.id, person.present ? false : true)
              }
            >
              {person.role}
            </TableCell>
            <TableCell
              onClick={() =>
                handleClick(person.id, person.present ? false : true)
              }
            >
              {person.present ? "Present" : "Absent"}
            </TableCell>
            <TableCell className="flex justify-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <CiTrash className="cursor-pointer hover:fill-destructive transition-colors duration-200" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your data of person and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="hover:bg-destructive"
                      onClick={() => handleDelete(person.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableAbsen;
