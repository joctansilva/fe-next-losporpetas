import { describe, expect, it } from 'vitest';
import type { CampaignDisplayStatusInput } from './campaign';
import {
  campaignStatusLabel,
  computeDisplayStatus,
  formatCents,
  formatShortDate,
  isCampaignOpen,
  requiresGiveawayDisclaimer,
  sortedMechanics,
} from './campaign';

/** 16/08/2026, 12h de Brasília. */
const NOW = new Date('2026-08-16T12:00:00-03:00');

const base: CampaignDisplayStatusInput = {
  status: 'active',
  startsAt: '2026-08-01T00:00:00-03:00',
  endsAt: '2026-08-20T23:59:00-03:00',
};

describe('computeDisplayStatus', () => {
  it('mostra "active" durante a vigência', () => {
    expect(computeDisplayStatus(base, NOW)).toBe('active');
  });

  it('mostra "scheduled" antes de começar', () => {
    expect(computeDisplayStatus({ ...base, startsAt: '2026-09-01T00:00:00-03:00' }, NOW)).toBe(
      'scheduled',
    );
  });

  it('mostra "ended" depois de encerrar', () => {
    expect(computeDisplayStatus({ ...base, endsAt: '2026-08-10T23:59:00-03:00' }, NOW)).toBe(
      'ended',
    );
  });

  it('mostra "ending_today" quando encerra hoje — a urgência do layout', () => {
    expect(computeDisplayStatus({ ...base, endsAt: '2026-08-16T23:59:00-03:00' }, NOW)).toBe(
      'ending_today',
    );
  });

  /**
   * 🔒 Protege contra o pior cenário de sorteio: o site convidando a participar
   * de algo que já acabou.
   */
  it('a data manda sobre o status gravado: "active" vencida aparece como encerrada', () => {
    const vencidaMasMarcadaAtiva: CampaignDisplayStatusInput = {
      status: 'active', // o cron ainda não rodou
      startsAt: '2026-07-01T00:00:00-03:00',
      endsAt: '2026-08-01T23:59:00-03:00', // já passou
    };

    expect(computeDisplayStatus(vencidaMasMarcadaAtiva, NOW)).toBe('ended');
    expect(isCampaignOpen(computeDisplayStatus(vencidaMasMarcadaAtiva, NOW))).toBe(false);
  });

  it('respeita "cancelled" acima de qualquer data', () => {
    expect(computeDisplayStatus({ ...base, status: 'cancelled' }, NOW)).toBe('cancelled');
  });

  it('trata rascunho como não publicado', () => {
    expect(computeDisplayStatus({ ...base, status: 'draft' }, NOW)).toBe('scheduled');
  });

  it('considera ativa a campanha sem data de fim', () => {
    expect(computeDisplayStatus({ ...base, endsAt: null }, NOW)).toBe('active');
  });

  /**
   * ⚠️ O servidor roda em UTC. Uma campanha que encerra às 21h de Brasília é
   * 00h do dia seguinte em UTC — comparar sem fuso anunciaria o dia errado.
   */
  it('calcula "termina hoje" no fuso do Brasil, não em UTC', () => {
    const encerraHojeAs21 = { ...base, endsAt: '2026-08-16T21:00:00-03:00' };
    // Mesmo instante visto de UTC: 2026-08-17T00:00:00Z (já é "amanhã" lá).
    expect(computeDisplayStatus(encerraHojeAs21, NOW)).toBe('ending_today');
  });
});

describe('isCampaignOpen', () => {
  it('só aceita participação em campanha rolando', () => {
    expect(isCampaignOpen('active')).toBe(true);
    expect(isCampaignOpen('ending_today')).toBe(true);
    expect(isCampaignOpen('ended')).toBe(false);
    expect(isCampaignOpen('scheduled')).toBe(false);
    expect(isCampaignOpen('cancelled')).toBe(false);
  });
});

describe('requiresGiveawayDisclaimer', () => {
  it('exige o aviso legal em sorteio', () => {
    expect(requiresGiveawayDisclaimer('giveaway')).toBe(true);
  });

  it('não exige nos demais tipos', () => {
    expect(requiresGiveawayDisclaimer('promotion')).toBe(false);
    expect(requiresGiveawayDisclaimer('coupon')).toBe(false);
  });
});

describe('formatação', () => {
  it('formata a data curta no fuso do Brasil', () => {
    expect(formatShortDate('2026-08-20T23:59:00-03:00')).toBe('20/08');
  });

  it('devolve null para data ausente ou inválida', () => {
    expect(formatShortDate(null)).toBeNull();
    expect(formatShortDate('não é data')).toBeNull();
  });

  it('formata centavos em real', () => {
    // O separador do pt-BR é espaço não separável — comparo pelas partes.
    const formatted = formatCents(35000);
    expect(formatted).toContain('R$');
    expect(formatted).toContain('350,00');
  });

  it('devolve null quando não há valor estimado', () => {
    expect(formatCents(null)).toBeNull();
  });

  it('traduz o status para o rótulo do layout', () => {
    expect(campaignStatusLabel('ending_today')).toBe('Termina hoje');
    expect(campaignStatusLabel('ended')).toBe('Encerrado');
  });

  it('ordena os passos do "como participar"', () => {
    const result = sortedMechanics([
      { step: 3, text: 'c' },
      { step: 1, text: 'a' },
      { step: 2, text: 'b' },
    ]);

    expect(result.map((s) => s.text)).toEqual(['a', 'b', 'c']);
  });

  it('não muta o array recebido', () => {
    const input = [
      { step: 2, text: 'b' },
      { step: 1, text: 'a' },
    ];
    sortedMechanics(input);
    expect(input[0]?.step).toBe(2);
  });
});
