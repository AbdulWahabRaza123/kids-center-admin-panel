import { NanyDetails } from "@/interface/user-interface";
import Image from "next/image";
const nanyTableHeadings = [
  "User ID",
  "Nany ID",
  "Name",
  "Email",
  "Phone No",
  "Qualification",
  "Reg No",
];
export const NanyTableComp = ({
  data,
}: {
  data: NanyDetails[] | undefined;
}) => {
  return (
    <>
      <table className="w-full mt-10 max-h-[70vh] overflow-auto">
        <thead className="bg-[#7A1FA01A]">
          {nanyTableHeadings.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data?.map((val: NanyDetails) => {
            return (
              <>
                <tr>
                  <td className="w-[200px] text-start p-3">
                    {val.user_id || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.nany_id || "-"}
                  </td>
                  <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                    {val.nany_name ? (
                      <>
                        <Image
                          src="/assets/profile.svg"
                          width={30}
                          height={30}
                          alt="profile"
                          className="rounded-full object-cover"
                        />
                        <p>{val.nany_name || "-"}</p>
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
                    {val.qualification || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.reg_no || "-"}
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
