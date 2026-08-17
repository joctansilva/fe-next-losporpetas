import type { NextConfig } from 'next';

/**
 * Ambiente de deploy.
 *
 * `VERCEL_ENV` vale 'production', 'preview' ou 'development'. Fora da Vercel a
 * variável não existe — e aí tratamos como não-produção, que é o padrão seguro:
 * na dúvida, não indexar.
 */
const isProduction = process.env.VERCEL_ENV === 'production';

const nextConfig: NextConfig = {
  async headers() {
    // ⚠️ Todo ambiente que não é produção sai com `noindex`.
    //
    // Sem isto, cada deploy de preview da Vercel vira um site inteiro
    // indexável num domínio diferente — conteúdo duplicado do portal real,
    // competindo com ele no Google (risco R16). O header vale para tudo,
    // inclusive imagens e rotas, e não depende de o HTML ser renderizado.
    if (isProduction) return [];

    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
