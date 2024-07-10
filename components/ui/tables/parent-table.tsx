import { ParentDetails } from "@/interface/user-interface";
import Image from "next/image";
const parentTableHeadings = [
  "User ID",
  "Student ID",
  "Name",
  "Email",
  "Phone No",
  "Class",
  "Roll No",
];
export const ParentTableComp = ({
  data,
}: {
  data: ParentDetails[] | undefined;
}) => {
  return (
    <>
      <table className="w-full mt-10 max-h-[70vh] overflow-auto">
        <thead className="bg-[#7A1FA01A]">
          {parentTableHeadings.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data?.map((val: ParentDetails) => {
            return (
              <>
                <tr>
                  <td className="w-[200px] text-start p-3">
                    {val.user_id || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.student_id || "-"}
                  </td>
                  <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                    {val.student_name ? (
                      <>
                        <Image
                          src="/assets/profile.svg"
                          width={30}
                          height={30}
                          alt="profile"
                          className="rounded-full object-cover"
                        />
                        <p>{val.student_name || "-"}</p>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.email || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.phone_no || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.class || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.roll_no || "-"}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
