# fe-next-losporpetas

Aplicação do **LOSPORPETAS** — portal local de descoberta gastronômica com curadoria
editorial. O usuário chega com uma pergunta: *"onde eu vou comer hoje?"*

Não é site institucional, landing page de influencer, blog nem catálogo estático: é um guia
onde o LOSPORPETAS funciona como curador e selo de confiança.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 · TypeScript · Tailwind CSS v4 |
| Dados | Supabase (Postgres + Auth + Storage + RLS) |
| Hospedagem | Vercel |
| Pacotes | pnpm |

Backend **dentro** do próprio Next: Server Components para leitura, Server Actions para
escrita, Route Handlers apenas para webhook, cron e sitemap. Sem API separada, sem ORM extra,
sem microservices.

---

## Rodando localmente

**Pré-requisitos:** Node 22 LTS · pnpm 10+ · Docker (para o Supabase local)

```bash
pnpm install

# 1. Sobe o Postgres local (primeira vez baixa ~2 GB de imagens Docker)
pnpm db:start

# 2. Copie as chaves impressas pelo comando acima para o .env.local
cp .env.example .env.local
pnpm db:status          # imprime API URL, anon key e service_role key

# 3. Roda a aplicação
pnpm dev
```

> ⚠️ **Portas fora do padrão.** Este projeto usa a faixa `544xx` em vez da padrão `543xx`
> porque outro projeto Supabase (`fe-next-syndos`) já ocupa a faixa padrão na máquina de
> desenvolvimento. Definido em `supabase/config.toml` — os dois rodam ao mesmo tempo.

| Serviço local | Endereço |
|---|---|
| Aplicação | http://localhost:3000 |
| Supabase Studio | http://127.0.0.1:54423 |
| API (PostgREST) | http://127.0.0.1:54421 |
| Postgres | `postgresql://postgres:postgres@127.0.0.1:54422/postgres` |
| Mailpit (e-mails de teste) | http://127.0.0.1:54424 |

### Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento (Turbopack) |
| `pnpm build` | Build de produção |
| `pnpm start` | Servir o build de produção |
| `pnpm check` | **Gate local:** typecheck + lint + format |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm db:start` / `pnpm db:stop` | Sobe/derruba o Supabase local |
| `pnpm db:status` | Mostra URLs e chaves locais |
| `pnpm db:reset` | Recria o banco do zero (migrations + seed) |
| `pnpm db:types` | Regenera `src/server/supabase/database.types.ts` |

> ⚠️ Rode `pnpm db:types` **toda vez** que criar ou alterar uma migration — os tipos
> gerados são commitados e o `pnpm typecheck` depende deles.

### Os três clientes Supabase

Escolher o cliente errado é como um vazamento de dados acontece. A regra:

| Cliente | Chave | RLS | Usar em |
|---|---|---|---|
| `createAnonClient()` | anon | ✅ respeita | Páginas públicas (home, diretório, restaurante) |
| `createServerClient()` | anon + sessão | ✅ respeita | `/admin`, com usuário logado |
| `createServiceClient()` | service-role | ❌ **ignora** | Cron e operações administrativas — só em `src/server/` |

O ESLint impede importar `createServiceClient` fora de `src/server/`.

---

## Estrutura pretendida

```
src/
├─ app/           rotas, layouts, metadata, server actions
├─ components/    ui · layout · restaurant · campaign · forms
├─ domain/        tipos e regras de negócio puras (sem React, sem Supabase)
├─ server/        repositórios, serviços e clientes Supabase (server-only)
└─ lib/           seo · analytics · validation · rate-limit · images
```

**Regras de fronteira:** `domain/` é puro; componentes nunca importam de `server/`;
regra de negócio não mora dentro de componente React.

---

## Regras inegociáveis

1. **Editorial ≠ comercial.** Aprovação editorial e parceria comercial são dimensões
   separadas. Ser parceiro pagante **nunca** produz o carimbo "APROVADO PELO LOSPORPETAS".
2. **Nada hardcoded que deveria ser administrável.** Cadastrar restaurante não pode exigir deploy.
3. **RLS ligada em todas as tabelas.** Público lê só o que está publicado.
4. **Nada enviado por usuário é publicado automaticamente.** Passa por moderação.
5. **Server Component por padrão.** `"use client"` só com estado, evento ou API de browser.
6. **Slug imutável após publicar** (com 301 no histórico) — link de post do Instagram não pode morrer.
7. **`next/image` sempre, `alt` sempre.** O portal é feito de fotos.
8. **Mobile primeiro.** O tráfego vem do Instagram.

---

## Documentação

A documentação técnica completa (arquitetura, modelo de dados, mapa de páginas, design
system, plano de implementação) fica **fora deste repositório**, na pasta `documentation/`
do diretório pai — mantida localmente por decisão do time.

Se você está com o repositório completo em máquina, comece por `../documentation/README.md`
e retome o trabalho pelo `../documentation/IMPLEMENTATION-PLAN.md`.

---

## Status

**Fase 0.4 concluída** — projeto, gate de qualidade, design system e Supabase local no ar.
Próximo: Fase 0.5 (componentes base: `Button`, `Badge`, `Card`, `Modal`, `Input`…).
