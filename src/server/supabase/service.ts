import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { getSupabaseServiceRoleKey, getSupabaseUrl } from './env';

/**
 * Cliente SERVICE-ROLE — ⚠️ IGNORA RLS COMPLETAMENTE.
 *
 * Enxerga e escreve tudo: rascunhos, leads, sugestões, dados pessoais. É a
 * chave que, vazada, entrega o banco inteiro.
 *
 * **Uso permitido apenas em:**
 * - jobs de cron (encerrar campanha por data);
 * - operações administrativas que precisam atravessar RLS de propósito;
 * - geração de signed URL para upload de mídia.
 *
 * **Nunca use para:** responder a requisição de página pública, nem em
 * qualquer caminho onde o dado retornado chegue ao navegador sem filtro
 * explícito. Se a resposta certa for "mas seria mais simples", a resposta é
 * corrigir a policy de RLS, não usar esta chave.
 *
 * O ESLint impede importar `createServiceClient` fora de `src/server/`
 * (ver eslint.config.mjs). Isso é uma trava, não uma sugestão.
 */
export function createServiceClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
