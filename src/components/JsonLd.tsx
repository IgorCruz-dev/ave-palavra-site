import { CONTEUDO, ESCOLA, SEO } from '@/content/site';

/**
 * JSON-LD da escola: EducationalOrganization + LocalBusiness, montado a partir
 * do mesmo conteúdo que a página mostra, para não divergir com o tempo.
 */
export function JsonLd({ baseUrl }: { baseUrl: string }) {
  const footer = CONTEUDO.footer;
  const enroll = CONTEUDO.enroll;

  // "R. Torquato Caleiro, 725" + "Vila Nicácio · Franca/SP" → rua, cidade e UF.
  const linhas = footer?.address_lines ?? [];
  const cidade = (linhas[1] ?? '').match(/([^·]+)·\s*([^/]+)\/\s*([A-Z]{2})/);

  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: footer?.legal_name || ESCOLA.razaoSocial,
    alternateName: ESCOLA.nome,
    url: baseUrl,
    ...(SEO.description ? { description: SEO.description } : {}),
    ...(SEO.og_image_url ? { image: `${baseUrl}${SEO.og_image_url}` } : {}),
    ...(footer?.email ? { email: footer.email } : {}),
    ...(footer?.phones?.length ? { telephone: footer.phones[0] } : {}),
    ...(CONTEUDO.hero?.founded_year ? { foundingDate: String(CONTEUDO.hero.founded_year) } : {}),
    ...(footer?.socials?.length ? { sameAs: footer.socials.map((s) => s.url) } : {}),
    ...(footer?.hours ? { openingHours: footer.hours } : {}),
  };

  if (linhas.length > 0) {
    dados.address = {
      '@type': 'PostalAddress',
      streetAddress: linhas[0],
      addressCountry: 'BR',
      ...(cidade ? { addressLocality: cidade[2].trim(), addressRegion: cidade[3].trim() } : {}),
    };
  } else if (enroll?.contact?.address) {
    dados.address = { '@type': 'PostalAddress', streetAddress: enroll.contact.address, addressCountry: 'BR' };
  }

  return (
    <script
      type="application/ld+json"
      // Conteúdo próprio; o escape de "<" impede que um valor feche o <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  );
}
