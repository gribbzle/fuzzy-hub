import { CircleButton } from "@portal/ui/atoms";
import { ArrowLeft, ArrowRight } from "@portal/ui/icons";

interface PaginatorProps {
  onNextBtnClick?: () => void;
  onPrevBtnClick?: () => void;
}

export const Paginator = ({
  onNextBtnClick,
  onPrevBtnClick,
}: PaginatorProps) => (
  <div className="flex items-center justify-center gap-4">
    <CircleButton variant="secondary" onClick={onPrevBtnClick}>
      <ArrowLeft />
    </CircleButton>
    <CircleButton variant="secondary" onClick={onNextBtnClick}>
      <ArrowRight />
    </CircleButton>
  </div>
);
