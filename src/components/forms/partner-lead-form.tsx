import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Icons, ICON_SIZE } from '@/lib/icons';
import { SOCIAL_LINKS } from '@/lib/site';

const INTEREST_OPTIONS = [
  { value: 'indicacao', label: 'Indicação (curadoria)' },
  { value: 'destaque', label: 'Destaque comercial' },
  { value: 'sorteio', label: 'Sorteio / experiência' },
  { value: 'outro', label: 'Ainda não sei — quero conversar' },
];

/**
 * Formulário de interesse em parceria.
 *
 * ⚠️ **Fase 1: renderizado, mas sem envio.** A Server Action, a validação com
 * Zod, o anti-spam e a persistência em `partner_leads` entram na Fase 3.3 —
 * que por sua vez depende de `/privacidade` com texto real (LGPD).
 *
 * Como a página pode ir ao ar antes disso, o botão fica desabilitado **com
 * explicação e com um caminho alternativo que funciona**. Um formulário que
 * aceita o envio e joga o dado fora é pior do que um formulário desligado: o
 * restaurante acha que falou com a gente e fica esperando resposta.
 */
export function PartnerLeadForm() {
  const instagram = SOCIAL_LINKS.find((link) => link.label === 'Instagram');

  return (
    <div className="ink-border relative bg-surface p-md md:p-lg">
      {/* Fita adesiva decorativa do layout. */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-6 w-32 -translate-x-1/2 -rotate-2 border border-on-surface-variant bg-surface-variant opacity-80"
      />

      <form className="relative z-0 flex flex-col gap-md">
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <Input id="lead-nome" name="nome" label="Nome do responsável" required disabled />
          <Input
            id="lead-restaurante"
            name="restaurante"
            label="Nome do restaurante"
            required
            disabled
          />
        </div>

        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <Input
            id="lead-whatsapp"
            name="whatsapp"
            label="WhatsApp"
            type="tel"
            inputMode="tel"
            placeholder="(11) 91234-5678"
            required
            disabled
          />
          <Input
            id="lead-instagram"
            name="instagram"
            label="Instagram"
            placeholder="@seurestaurante"
            disabled
          />
        </div>

        <Select
          id="lead-tipo"
          name="tipo"
          label="Tipo de parceria de interesse"
          placeholder="Selecione uma opção..."
          options={INTEREST_OPTIONS}
          disabled
        />

        <Textarea
          id="lead-mensagem"
          name="mensagem"
          label="Mensagem"
          hint="Opcional. Conte um pouco sobre o lugar."
          rows={4}
          disabled
        />

        <div className="ink-border flex flex-col gap-sm bg-tertiary-fixed-dim p-md">
          <p className="font-display text-headline-md leading-none">Envio ainda não liberado</p>
          <p className="text-body-md">
            Este formulário entra no ar junto com a política de privacidade definitiva. Enquanto
            isso, o caminho mais rápido é o direct.
          </p>
          {instagram && (
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-max items-center gap-xs font-mono text-label-mono font-bold uppercase underline underline-offset-4"
            >
              Falar no Instagram
              <Icons.externalLink size={ICON_SIZE.sm} aria-hidden="true" />
            </a>
          )}
        </div>

        <Button type="submit" size="lg" disabled className="self-start md:self-end">
          Quero ser parceiro
        </Button>
      </form>
    </div>
  );
}
