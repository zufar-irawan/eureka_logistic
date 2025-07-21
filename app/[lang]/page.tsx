import LangPageWrapper from './LangPageWrapper';

export default function Page({ params }: { params: { lang: string } }) {
  return <LangPageWrapper lang={params.lang} />;
}
