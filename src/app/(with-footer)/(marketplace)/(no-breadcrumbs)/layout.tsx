import { ReactNode } from "react";

import { getProfilesAction } from "@portal/actions";

import { Header } from "@portal/ui/organisms";

const NoBreadcrumbsLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { data } = await getProfilesAction();

  return (
    <>
      <Header userProfile={data?.items[0]} />
      {children}
    </>
  );
};

export default NoBreadcrumbsLayout;
