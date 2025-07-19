import HomeClient from "./HomeClient";

export default async function Page({ params }: { params: { lang: string } }) {
  return <HomeClient lang={params.lang} />;
}