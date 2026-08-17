import 'server-only';
import { createServerClient as createSSRClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './database.types';
import { getSupabaseAnonKey, getSupabaseUrl } from './env';

/**
 * Cliente COM SESSÃO — usuário autenticado (admin/editor).
 *
 * Usa a chave `anon` mas lê a sessão dos cookies, então as policies avaliam
 * `auth.uid()` e o usuário enxerga o que o papel dele permite. **Respeita RLS.**
 *
 * É o cliente do `/admin`. Nunca use em página pública: ler cookies torna a
 * rota dinâmica e mata o cache.
 *
 * ⚠️ Autorização de verdade acontece em três camadas — middleware (UX),
 * `requireAdmin()` dentro da Server Action (a que realmente autoriza) e RLS no
 * banco (a rede de segurança). Este cliente sozinho não autoriza nada.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSSRClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components não podem escrever cookies. Quando a renovação
          // do token acontece aqui, o middleware é quem persiste o cookie —
          // por isso o erro é ignorado de propósito.
        }
      },
    },
  });
}
