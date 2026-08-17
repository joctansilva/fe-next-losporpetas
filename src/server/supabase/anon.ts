import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { getSupabaseAnonKey, getSupabaseUrl } from './env';

/**
 * Cliente ANÔNIMO — leitura pública.
 *
 * Usa a chave `anon`, então **respeita RLS**: só enxerga o que as policies
 * liberam para o papel `anon`, na prática as linhas com `status = 'published'`.
 *
 * É o cliente das páginas públicas (home, diretório, restaurante, sorteios).
 * Não carrega sessão nem lê cookies — o que o torna cacheável e adequado a
 * Server Components e geração estática.
 *
 * Ver documentation/03-MODELO-DE-DADOS.md §5 (Row Level Security).
 */
export function createAnonClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      // Não há usuário: nada de persistir ou renovar sessão.
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
