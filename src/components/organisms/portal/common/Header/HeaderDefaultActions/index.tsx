import { ButtonLink, IconButton, MenuLink } from "@portal/ui/atoms";
import { Lovely, SearchNormal } from "@portal/ui/icons";

interface HeaderDefaultActionsProps {
  prefixHref: string;
}

const HeaderDefaultActions = ({ prefixHref }: HeaderDefaultActionsProps) => (
  <div className="max-tablet:hidden ml-auto flex items-center justify-center large-desktop:gap-8 gap-4">
    <div className="max-desktop:hidden mr-px flex items-center justify-center gap-6">
      <IconButton
        Icon={SearchNormal}
        strokeWidth={1.3}
        className="large-desktop:h-7 large-desktop:w-7 h-6 w-6"
      />
      <IconButton
        Icon={Lovely}
        strokeWidth={1.3}
        className="large-desktop:h-7 large-desktop:w-7 h-6 w-6"
      />
    </div>
    <MenuLink href={`${prefixHref}/sign-up`}>Sign Up</MenuLink>
    <ButtonLink
      href={`${prefixHref}/login`}
      variant="primary"
      className="desktop:btn-small btn-mini"
    >
      Log In
    </ButtonLink>
  </div>
);

export default HeaderDefaultActions;
