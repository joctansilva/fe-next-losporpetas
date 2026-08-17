/**
 * Mapa de ícones do produto.
 *
 * Os layouts do Stitch usam a fonte Material Symbols Outlined. Carregar uma
 * fonte de ~200 KB para exibir ~25 ícones é desperdício num produto cuja
 * performance no mobile é requisito (risco R6), então cada símbolo vira um
 * SVG individual do lucide-react, tree-shakeable.
 *
 * Este arquivo é o ÚNICO lugar que conhece a biblioteca de ícones. Componentes
 * importam daqui, nunca de 'lucide-react' — trocar de biblioteca depois é
 * mexer só neste módulo.
 */

import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  createLucideIcon,
  Croissant,
  ExternalLink,
  Fish,
  Map,
  MapPin,
  Martini,
  Menu,
  Navigation,
  Phone,
  Pizza,
  Plus,
  Sandwich,
  Search,
  Store,
  Ticket,
  UtensilsCrossed,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';

export type { LucideIcon };

/**
 * Instagram.
 *
 * O lucide-react 1.x removeu os ícones de marca do pacote (questão de marca
 * registrada), mas o Instagram é o principal canal de aquisição do produto e
 * aparece em toda página de restaurante e de sorteio. Recriado aqui com
 * `createLucideIcon` para manter o mesmo tipo, o mesmo traço (2px) e o mesmo
 * comportamento de `size`/`color` dos demais.
 */
const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'frame' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'lens' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'flash' }],
]);

/**
 * Ícones de interface, nomeados pelo papel que cumprem — não pelo desenho.
 * O comentário à direita é o Material Symbol equivalente no layout do Stitch.
 */
export const Icons = {
  search: Search, // search
  menu: Menu, // menu
  close: X, // close
  add: Plus, // add
  check: Check, // check
  arrowRight: ArrowRight, // arrow_forward
  chevronLeft: ChevronLeft, // chevron_left
  chevronRight: ChevronRight, // chevron_right
  chevronDown: ChevronDown, // expand_more
  location: MapPin, // location_on
  directions: Navigation, // directions
  map: Map, // map
  schedule: Clock, // schedule
  price: Wallet, // payments
  phone: Phone, // phone
  photo: Camera, // photo_camera
  externalLink: ExternalLink, // open_in_new
  store: Store, // store
  campaign: Ticket, // local_activity
  instagram: Instagram, // (sem equivalente no Stitch)
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof Icons;

/**
 * Ícones de categoria de restaurante.
 *
 * A chave é o valor gravado em `categories.icon` no banco (ver
 * documentation/03-MODELO-DE-DADOS.md §3.1), mantido no vocabulário dos
 * Material Symbols para não divergir do que o schema documenta.
 *
 * Categoria nova cadastrada no admin sem ícone conhecido cai no fallback —
 * a página não quebra por causa de um dado.
 */
export const CATEGORY_ICONS = {
  lunch_dining: Sandwich, // hamburgueria
  local_pizza: Pizza, // pizza
  set_meal: Fish, // japonês
  tapas: Martini, // bares
  bakery_dining: Croissant, // cafés / padarias
  restaurant: UtensilsCrossed, // fallback genérico
} as const satisfies Record<string, LucideIcon>;

export type CategoryIconName = keyof typeof CATEGORY_ICONS;

const FALLBACK_CATEGORY_ICON: LucideIcon = UtensilsCrossed;

/** Resolve o ícone de uma categoria a partir do valor vindo do banco. */
export function getCategoryIcon(icon: string | null | undefined): LucideIcon {
  if (!icon) return FALLBACK_CATEGORY_ICON;
  return CATEGORY_ICONS[icon as CategoryIconName] ?? FALLBACK_CATEGORY_ICON;
}

/**
 * Tamanhos padronizados, para não haver ícone de 17px espalhado pelo código.
 * Alvo de toque mínimo continua sendo responsabilidade do botão (44×44px),
 * não do ícone.
 */
export const ICON_SIZE = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  display: 48,
} as const;
