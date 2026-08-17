import { buttonClassName } from '@/components/ui/button';
import {
  campaignStatusLabel,
  isCampaignOpen,
  requiresGiveawayDisclaimer,
  type CampaignDetail,
  type CampaignDisplayStatus,
} from '@/domain/campaign';
import { cn } from '@/lib/cn';
import { Icons, ICON_SIZE } from '@/lib/icons';

type CampaignCtaProps = {
  campaign: CampaignDetail;
  status: CampaignDisplayStatus;
  className?: string;
};

/**
 * CTA "QUERO PARTICIPAR".
 *
 * ⚠️ **Fora do período, o botão vira estado desabilitado — nunca um link que
 * parece funcionar e não funciona.** Convidar alguém a participar de um sorteio
 * encerrado é o pior erro possível nesta tela: a pessoa clica, chega num post
 * antigo e conclui que o portal está quebrado (ou que o sorteio era mentira).
 *
 * Como a participação acontece no Instagram, o botão é um `<a>` para o post
 * oficial — não um formulário. Ver risco R17: enquanto a mecânica roda lá fora,
 * operada pelo restaurante parceiro, o portal é vitrine.
 *
 * Na Fase 4 o clique passa a registrar `campaign_interests` antes de abrir.
 */
export function CampaignCta({ campaign, status, className }: CampaignCtaProps) {
  const open = isCampaignOpen(status);
  const href = campaign.externalEntryUrl ?? campaign.officialPostUrl;

  return (
    <div className={cn('flex flex-col gap-xs', className)}>
      {open && href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName({ variant: 'primary', size: 'lg', fullWidth: true })}
        >
          Quero participar
          <Icons.externalLink size={ICON_SIZE.sm} aria-hidden="true" />
        </a>
      ) : (
        <button
          type="button"
          disabled
          className={buttonClassName({ variant: 'secondary', size: 'lg', fullWidth: true })}
        >
          {status === 'scheduled' ? 'Ainda não começou' : campaignStatusLabel(status)}
        </button>
      )}

      {requiresGiveawayDisclaimer(campaign.type) && (
        <p className="text-center font-mono text-meta-mono text-on-surface-variant uppercase">
          Sorteio realizado via Instagram oficial
        </p>
      )}
    </div>
  );
}
