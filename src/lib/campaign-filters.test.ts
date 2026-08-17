import { describe, expect, it } from 'vitest';
import { CAMPAIGN_TYPE } from '@/domain/enums';
import {
  buildCampaignsHref,
  campaignTypeFromSlug,
  campaignTypeSlug,
  parseCampaignFilters,
} from './campaign-filters';

describe('tradução de tipo', () => {
  it('usa português na URL, não o valor do enum', () => {
    expect(campaignTypeSlug('giveaway')).toBe('sorteio');
    expect(campaignTypeSlug('promotion')).toBe('promocao');
  });

  it('faz ida e volta para todos os tipos — nenhum fica sem tradução', () => {
    for (const type of CAMPAIGN_TYPE) {
      expect(campaignTypeFromSlug(campaignTypeSlug(type))).toBe(type);
    }
  });

  it('devolve null para slug desconhecido', () => {
    expect(campaignTypeFromSlug('inexistente')).toBeNull();
    expect(campaignTypeFromSlug(null)).toBeNull();
  });
});

describe('parseCampaignFilters', () => {
  it('lê o tipo da URL', () => {
    expect(parseCampaignFilters({ tipo: 'sorteio' })).toEqual({ tipo: 'giveaway' });
  });

  it('tipo inválido vira "todos" em vez de erro', () => {
    expect(parseCampaignFilters({ tipo: 'xpto' })).toEqual({ tipo: null });
    expect(parseCampaignFilters({})).toEqual({ tipo: null });
  });

  it('usa o primeiro valor quando o parâmetro vem repetido', () => {
    expect(parseCampaignFilters({ tipo: ['cupom', 'sorteio'] })).toEqual({ tipo: 'coupon' });
  });
});

describe('buildCampaignsHref', () => {
  it('sem filtro devolve a URL limpa', () => {
    expect(buildCampaignsHref({ tipo: null })).toBe('/sorteios');
  });

  it('com filtro usa o slug em português', () => {
    expect(buildCampaignsHref({ tipo: 'experience' })).toBe('/sorteios?tipo=experiencia');
  });
});
