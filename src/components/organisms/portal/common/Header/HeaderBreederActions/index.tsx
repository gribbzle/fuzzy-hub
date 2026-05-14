import { Avatar, IconButton } from "@portal/ui/atoms";
import { ArrowDown, Message, SearchNormal } from "@portal/ui/icons";

interface HeaderBreederActionsProps {
  avatar?: string | null;
}

const HeaderBreederActions = ({ avatar }: HeaderBreederActionsProps) => (
  <div className="max-tablet:hidden ml-auto flex items-center justify-center large-desktop:gap-8 only-tablet:gap-6 gap-4">
    <div className="max-tablet:hidden flex items-center justify-center gap-6">
      <IconButton Icon={SearchNormal} strokeWidth={1.3} className="h-7 w-7" />
      <IconButton Icon={Message} strokeWidth={1.2} className="h-7 w-7" />
    </div>
    <button className="flex gap-2.5 justify-center items-center">
      <Avatar className="max-desktop:w-8 max-desktop:h-8" src={avatar} />
      <ArrowDown
        width={16}
        height={16}
        strokeWidth={2}
        className="text-text-default max-desktop:hidden"
      />
    </button>
  </div>
);

export default HeaderBreederActions;
