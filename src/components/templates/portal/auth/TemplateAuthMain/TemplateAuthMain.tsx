import { PropsWithChildren } from "react";

import { ArtDirectionImage, ArtDirectionImageSrc } from "@portal/ui/atoms";

interface TemplateAuthContentProps extends PropsWithChildren {
  backgroundImage: ArtDirectionImageSrc;
}

export const TemplateAuthMain = ({
  children,
  backgroundImage,
}: TemplateAuthContentProps) => (
  <main className="max-desktop:flex-col flex min-h-screen w-full bg-white font-sans">
    <div className="desktop:w-2/5 max-desktop:h-50 max-tablet:h-20 relative w-full overflow-hidden">
      <ArtDirectionImage src={backgroundImage} />
    </div>
    <div className="desktop:w-3/5 desktop:items-center flex flex-col flex-1 justify-center">
      {children}
    </div>
  </main>
);
