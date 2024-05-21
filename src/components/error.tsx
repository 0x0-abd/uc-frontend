import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error : any = useRouteError();
  console.error(error);

  return (
    <div className="w-full text-center py-72 lg:py-56">
      <h1 className="text-4xl">Oops!</h1>
      <p className=" pt-8 pb-4">Error 404: Page Not Found.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}