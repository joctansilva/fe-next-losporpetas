import { describe, expect, it } from 'vitest';
import type { Partnership } from './restaurant';
import {
  canShowApprovalStamp,
  directionsUrl,
  formatOpeningHours,
  instagramUrl,
  isPartner,
  isPartnershipActive,
  isPubliclyVisible,
  priceDescription,
  priceLabel,
} from './restaurant';

const activePartnership: Partnership = {
  id: 'p1',
  tier: 'featured',
  status: 'active',
  startsAt: '2026-01-01',
  endsAt: '2027-01-01',
};

const NOW = new Date('2026-08-16T12:00:00-03:00');

/* ========================================================================== *
 * A regra mais importante do produto.
 * ========================================================================== */

describe('canShowApprovalStamp', () => {
  it('mostra o carimbo quando o restaurante foi aprovado editorialmente', () => {
    expect(canShowApprovalStamp({ curationStatus: 'approved' })).toBe(true);
  });

  it.each(['registered', 'suggested', 'visited', 'rejected'] as const)(
    'não mostra o carimbo quando a curadoria está em "%s"',
    (curationStatus) => {
      expect(canShowApprovalStamp({ curationStatus })).toBe(false);
    },
  );

  /**
   * 🔒 ESTE É O TESTE QUE PROTEGE O PRODUTO.
   *
   * Se ele falhar, significa que alguém ligou parceria comercial ao carimbo
   * editorial — o risco R1. Não "conserte" o teste: conserte a função.
   */
  it('NÃO mostra o carimbo para parceiro comercial que não passou pela curadoria', () => {
    const parceiroNaoAprovado = {
      curationStatus: 'registered' as const,
      partnerships: [activePartnership],
    };

    expect(isPartner(parceiroNaoAprovado, NOW)).toBe(true);
    expect(canShowApprovalStamp(parceiroNaoAprovado)).toBe(false);
  });

  it('mostra o carimbo para restaurante aprovado SEM nenhuma parceria', () => {
    const aprovadoOrganico = {
      curationStatus: 'approved' as const,
      partnerships: [],
    };

    expect(isPartner(aprovadoOrganico, NOW)).toBe(false);
    expect(canShowApprovalStamp(aprovadoOrganico)).toBe(true);
  });

  it('as duas dimensões são independentes: aprovado E parceiro é combinação válida', () => {
    const aprovadoEParceiro = {
      curationStatus: 'approved' as const,
      partnerships: [activePartnership],
    };

    expect(canShowApprovalStamp(aprovadoEParceiro)).toBe(true);
    expect(isPartner(aprovadoEParceiro, NOW)).toBe(true);
  });
});

describe('isPartnershipActive', () => {
  it('aceita parceria vigente', () => {
    expect(isPartnershipActive(activePartnership, NOW)).toBe(true);
  });

  it.each(['negotiating', 'paused', 'ended'] as const)('rejeita status "%s"', (status) => {
    expect(isPartnershipActive({ ...activePartnership, status }, NOW)).toBe(false);
  });

  it('rejeita parceria que ainda não começou', () => {
    expect(isPartnershipActive({ ...activePartnership, startsAt: '2026-12-01' }, NOW)).toBe(false);
  });

  it('rejeita parceria expirada — vigência não se renova sozinha', () => {
    expect(isPartnershipActive({ ...activePartnership, endsAt: '2026-08-15' }, NOW)).toBe(false);
  });

  it('aceita parceria sem datas definidas', () => {
    expect(isPartnershipActive({ ...activePartnership, startsAt: null, endsAt: null }, NOW)).toBe(
      true,
    );
  });

  it('aceita parceria que termina exatamente hoje', () => {
    expect(isPartnershipActive({ ...activePartnership, endsAt: '2026-08-16' }, NOW)).toBe(true);
  });
});

describe('isPubliclyVisible', () => {
  it('exige publicação E aprovação — espelha a constraint do banco', () => {
    expect(isPubliclyVisible({ status: 'published', curationStatus: 'approved' })).toBe(true);
    expect(isPubliclyVisible({ status: 'published', curationStatus: 'visited' })).toBe(false);
    expect(isPubliclyVisible({ status: 'draft', curationStatus: 'approved' })).toBe(false);
  });
});

/* ========================================================================== *
 * Apresentação
 * ========================================================================== */

describe('priceLabel', () => {
  it('converte a faixa em cifrões', () => {
    expect(priceLabel('1')).toBe('$');
    expect(priceLabel('2')).toBe('$$');
    expect(priceLabel('4')).toBe('$$$$');
  });

  it('devolve null quando não há faixa', () => {
    expect(priceLabel(null)).toBeNull();
    expect(priceLabel(undefined)).toBeNull();
  });

  it('tem descrição acessível — cifrão sozinho não diz nada em leitor de tela', () => {
    expect(priceDescription('2')).toContain('R$');
    expect(priceDescription(null)).toBeNull();
  });
});

describe('formatOpeningHours', () => {
  it('agrupa dias consecutivos com "a"', () => {
    const result = formatOpeningHours({
      periods: [{ days: [0, 1, 2, 3, 4], open: '12:00', close: '23:00' }],
    });

    expect(result).toEqual([{ days: 'Dom a Qui', hours: '12h às 23h' }]);
  });

  it('usa "e" para dois dias', () => {
    const result = formatOpeningHours({
      periods: [{ days: [5, 6], open: '12:00', close: '00:00' }],
    });

    expect(result).toEqual([{ days: 'Sex e Sáb', hours: '12h às 00h' }]);
  });

  it('mantém os minutos quando não são zero', () => {
    const result = formatOpeningHours({
      periods: [{ days: [1], open: '11:30', close: '15:45' }],
    });

    expect(result).toEqual([{ days: 'Seg', hours: '11h30 às 15h45' }]);
  });

  it('lista dias não consecutivos separados por vírgula', () => {
    const result = formatOpeningHours({
      periods: [{ days: [1, 3, 5], open: '18:00', close: '23:00' }],
    });

    expect(result[0]?.days).toBe('Seg, Qua, Sex');
  });

  it('devolve lista vazia quando não há horário — a seção some da página', () => {
    expect(formatOpeningHours(null)).toEqual([]);
    expect(formatOpeningHours({ periods: [] })).toEqual([]);
  });
});

describe('directionsUrl', () => {
  const base = {
    name: 'Z Deli',
    addressLine: 'Rua Francisco Leitão, 16',
    city: 'São Paulo',
    state: 'SP',
  };

  it('prefere coordenadas quando existem', () => {
    const url = directionsUrl({ ...base, latitude: -23.56, longitude: -46.68 });
    expect(url).toBe('https://www.google.com/maps/dir/?api=1&destination=-23.56,-46.68');
  });

  it('cai para busca por endereço quando não há geocoding', () => {
    const url = directionsUrl({ ...base, latitude: null, longitude: null });
    expect(url).toContain('/maps/search/');
    expect(url).toContain(encodeURIComponent('Z Deli'));
  });

  it('devolve null quando não há nem coordenada nem endereço — o botão some', () => {
    expect(
      directionsUrl({ ...base, addressLine: null, latitude: null, longitude: null }),
    ).toBeNull();
  });
});

describe('instagramUrl', () => {
  it('monta a URL a partir do handle', () => {
    expect(instagramUrl('losporpetas')).toBe('https://www.instagram.com/losporpetas');
  });

  it('tolera o @ que alguém vai digitar no admin mais cedo ou mais tarde', () => {
    expect(instagramUrl('@losporpetas')).toBe('https://www.instagram.com/losporpetas');
  });

  it('devolve null sem handle — o botão some', () => {
    expect(instagramUrl(null)).toBeNull();
  });
});
