import { FolderCodeIcon, GraduationCap, ListCheck } from "lucide-react";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function AddProgram() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GraduationCap size={18} />
        </EmptyMedia>
        <EmptyTitle>Belum Ada Program</EmptyTitle>
        <EmptyDescription>
          Anda belum membuat program. mulai dengan membuat program pertama anda.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Buat Program</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
