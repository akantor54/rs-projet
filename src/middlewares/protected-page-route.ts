import { getSession } from "next-auth/react";

export default async function ProtectedPageRoute(
  context: any,
  redirectTo: any,
  getProps: any
) {
  const userIsAuthenticated = getSession(context); // TODO: check if user is authenticated
  if (!userIsAuthenticated) {
    return {
      redirect: {
        destination: redirectTo ?? "/signin",
        permanent: false,
      },
    };
  }

  if (getProps) {
    return {
      props: getProps(),
    };
  }

  return {
    props: {},
  };
}
