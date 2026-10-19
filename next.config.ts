import type { NextConfig } from 'next';

/**
 * Exportação estática: `next build` gera HTML/CSS/JS em `out/`, que sobe em
 * qualquer hospedagem (Vercel, Netlify, S3, servidor próprio). O site não tem
 * banco, API nem área autenticada — tudo o que ele mostra está no repositório.
 */
const nextConfig: NextConfig = {
  output: 'export',
  // O otimizador de imagens do Next exige servidor; as imagens já estão em
  // WebP, nos tamanhos certos, com srcset escrito à mão no herói.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
