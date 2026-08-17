import 'server-only';

/**
 * Leitura das variáveis de ambiente do Supabase.
 *
 * Lidas sob demanda (não no escopo do módulo) para que a ausência de uma
 * variável falhe no momento do uso, com mensagem clara, em vez de quebrar o
 * build inteiro com um "supabaseUrl is required" sem contexto.
 *
 * ⚠️ `SUPABASE_SERVICE_ROLE_KEY` não tem — e nunca pode ter — o prefixo
 * `NEXT_PUBLIC_`. Prefixo público significa que o Next embute o valor no
 * bundle do navegador, e essa chave ignora RLS.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `Variável de ambiente ausente: ${name}. ` +
        `Copie .env.example para .env.local e preencha (veja README).`,
    );
  }
  return value;
}

/** URL do projeto Supabase. Pública: aparece em toda requisição. */
export function getSupabaseUrl(): string {
  return required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
}

/** Chave anônima. Pública por design — quem protege os dados é a RLS. */
export function getSupabaseAnonKey(): string {
  return required('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Chave service-role. SEGREDO: ignora RLS, só existe no servidor. */
export function getSupabaseServiceRoleKey(): string {
  return required('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY);
}
