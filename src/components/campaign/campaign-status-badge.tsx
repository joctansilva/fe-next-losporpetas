import { Badge } from '@/components/ui/badge';
import { campaignStatusLabel, type CampaignDisplayStatus } from '@/domain/campaign';

const TONE: Record<CampaignDisplayStatus, 'primary' | 'ink' | 'muted' | 'mustard'> = {
  active: 'ink',
  ending_today: 'primary', // urgência ganha a cor da marca
  scheduled: 'mustard',
  ended: 'muted',
  cancelled: 'muted',
};

/**
 * Selo de status da campanha.
 *
 * O rótulo vem de `campaignStatusLabel`, e o status de `computeDisplayStatus` —
 * que já resolve "termina hoje" no fuso do Brasil e trata como encerrada a
 * campanha vencida cujo cron ainda não rodou.
 */
export function CampaignStatusBadge({ status }: { status: CampaignDisplayStatus }) {
  return <Badge tone={TONE[status]}>{campaignStatusLabel(status)}</Badge>;
}
