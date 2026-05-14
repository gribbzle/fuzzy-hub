import { CircleButton } from "@portal/ui/atoms";
import { Facebook2 as FacebookIcon } from "@portal/ui/icons";

const FacebookButton = () => {
  return (
    <CircleButton size="large" variant="primary">
      <FacebookIcon width={24} height={24} />
    </CircleButton>
  );
};

export default FacebookButton;
