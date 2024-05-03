import { PropositionType } from "@/app/types/SpreadType";
import { formatRelativeDate } from "@/lib/utils";
import { Columns } from "../../table/Columns";
import { DataTable } from "../../table/DataTable";

interface SpreadPropositionPageProps {
  propositions: PropositionType[];
}

const convertStatus = (status: string) => {
  switch (status) {
    case "P":
      return "Pending";
    case "A":
      return "Accepted";
    case "R":
      return "Rejected";
    default:
      return "Unknown";
  }
};

type SimplifiedPropositionType = {
  price: number;
  status: string;
  volume: number;
  created_at: string;
};

function simplifyPropositions(
  propositions: PropositionType[]
): SimplifiedPropositionType[] {
  return propositions.map((proposition) => {
    let { price, status, volume, created_at } = proposition;
    status = convertStatus(status);
    created_at = formatRelativeDate(created_at);
    return { price, status, volume, created_at };
  });
}

const SpreadPropositionPage = ({
  propositions,
}: SpreadPropositionPageProps) => {
  return (
    <div>
      <DataTable
        columns={Columns(["price", "status", "volume", "created_at"])}
        data={simplifyPropositions(propositions)}
      />
    </div>
  );
};

export default SpreadPropositionPage;
