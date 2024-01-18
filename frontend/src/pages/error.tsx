import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center">
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Упс!</h4>
        <p className="">Извините, произошла непредвиденная ошибка.</p>
      </div>
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {error.statusText || error.message}
      </code>
    </div>
  );
}
