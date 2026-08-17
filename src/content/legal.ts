/**
 * Textos legais — ⚠️ PROVISÓRIOS.
 *
 * 🔴 **BLOQUEIA A FASE 3.** Estes textos são um esqueleto genérico, escrito
 * para que as páginas existam e o rodapé não aponte para o vazio. **Não foram
 * revisados juridicamente e não descrevem com precisão o tratamento de dados
 * do produto.**
 *
 * Antes de qualquer formulário público entrar no ar (Fase 3), este conteúdo
 * precisa ser substituído por texto real, revisado, cobrindo no mínimo:
 *
 * - quais dados são coletados em cada formulário (sugestão, lead, newsletter);
 * - finalidade e base legal de cada tratamento (LGPD, art. 7º);
 * - prazo de retenção — hoje o plano prevê expurgo de `ip_hash` em 90 dias;
 * - com quem os dados são compartilhados (Supabase, Resend, Vercel);
 * - como exercer os direitos do titular e por qual canal;
 * - identificação do controlador (razão social, CNPJ, endereço).
 *
 * Enquanto estiverem provisórios, as páginas saem com `noindex` e exibem aviso
 * visível. Ver documentation/05-INTEGRACOES-E-RISCOS.md — risco R18.
 */

export const LEGAL_IS_PROVISIONAL = true;

/** Atualizar junto com o texto real. */
export const LEGAL_UPDATED_AT = '2026-08-17';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: 'O que é o LOSPORPETAS',
    paragraphs: [
      'O LOSPORPETAS é um guia gastronômico local: um portal de descoberta que reúne restaurantes visitados e avaliados pela nossa curadoria, além de ações e sorteios realizados com estabelecimentos parceiros.',
      'O acesso ao conteúdo é livre e não exige cadastro.',
    ],
  },
  {
    heading: 'Sobre o conteúdo editorial',
    paragraphs: [
      'As indicações publicadas refletem a opinião da nossa curadoria a partir de visitas presenciais. São impressões pessoais sobre a experiência em determinado momento, e não uma avaliação técnica, sanitária ou definitiva do estabelecimento.',
      'Informações como endereço, horário de funcionamento, faixa de preço e cardápio podem mudar sem aviso. Recomendamos confirmar diretamente com o restaurante antes de se deslocar.',
      'O selo de aprovação editorial é concedido exclusivamente pela nossa curadoria e não pode ser adquirido. Conteúdo comercial é sempre identificado como tal.',
    ],
  },
  {
    heading: 'Conteúdo enviado por usuários',
    paragraphs: [
      'Ao sugerir um estabelecimento, você declara que as informações enviadas são verdadeiras e que possui os direitos necessários sobre qualquer conteúdo compartilhado.',
      'Toda sugestão passa por análise da nossa curadoria antes de qualquer publicação. Não há publicação automática, e não nos comprometemos a publicar ou responder a todas as sugestões recebidas.',
      'Reservamo-nos o direito de recusar ou remover conteúdo considerado ofensivo, enganoso, publicitário ou que viole direitos de terceiros.',
    ],
  },
  {
    heading: 'Ações e sorteios',
    paragraphs: [
      'As ações e sorteios divulgados no portal são realizados e operados nos canais oficiais indicados em cada publicação, geralmente o perfil do LOSPORPETAS no Instagram, em conjunto com o estabelecimento parceiro.',
      'O portal funciona como vitrine informativa. As regras, o prazo e a apuração de cada ação constam no respectivo regulamento e na publicação oficial, que prevalecem sobre qualquer resumo exibido aqui.',
    ],
  },
  {
    heading: 'Parcerias comerciais',
    paragraphs: [
      'Podemos manter relações comerciais com estabelecimentos, incluindo destaque patrocinado e ações conjuntas. Esses casos são sempre sinalizados de forma visível.',
      'Parceria comercial não influencia a avaliação editorial nem concede o selo de aprovação.',
    ],
  },
  {
    heading: 'Propriedade intelectual',
    paragraphs: [
      'Textos, fotografias, marca e identidade visual do portal pertencem ao LOSPORPETAS ou são utilizados mediante autorização. A reprodução sem crédito e autorização prévia não é permitida.',
    ],
  },
  {
    heading: 'Alterações destes termos',
    paragraphs: [
      'Estes termos podem ser atualizados a qualquer momento. A data da última atualização é sempre indicada no topo desta página.',
    ],
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: 'Navegação sem cadastro',
    paragraphs: [
      'Navegar pelo portal, consultar restaurantes e acompanhar ações não exige conta nem cadastro, e não coletamos dados pessoais para essa finalidade.',
    ],
  },
  {
    heading: 'Dados que coletamos',
    paragraphs: [
      'Coletamos dados pessoais apenas quando você os fornece voluntariamente, por meio dos formulários do portal:',
      'Sugestão de restaurante: nome do estabelecimento, bairro, motivo da indicação e, opcionalmente, seu contato para eventual retorno.',
      'Interesse em parceria: nome do responsável, nome do restaurante, WhatsApp e, opcionalmente, e-mail e perfil no Instagram.',
      'Newsletter: endereço de e-mail, com confirmação por link enviado ao próprio endereço.',
    ],
  },
  {
    heading: 'Para que usamos',
    paragraphs: [
      'Os dados são usados exclusivamente para avaliar sugestões, retornar contatos comerciais e enviar as comunicações que você solicitou. Não vendemos e não cedemos dados pessoais a terceiros para fins publicitários.',
    ],
  },
  {
    heading: 'Proteção contra abuso',
    paragraphs: [
      'Para conter envios automatizados e spam, registramos uma versão embaralhada (hash) do endereço IP de quem envia formulários. Esse registro não permite identificar a pessoa e é descartado periodicamente.',
    ],
  },
  {
    heading: 'Com quem compartilhamos',
    paragraphs: [
      'Utilizamos fornecedores de infraestrutura para operar o portal, como serviços de hospedagem, banco de dados e envio de e-mail. Esses fornecedores tratam os dados apenas para prestar o serviço contratado.',
    ],
  },
  {
    heading: 'Seus direitos',
    paragraphs: [
      'Você pode solicitar a qualquer momento o acesso, a correção ou a exclusão dos seus dados, bem como o descadastramento das nossas comunicações. Todo e-mail que enviamos traz link de descadastro.',
      'Para exercer esses direitos, entre em contato pelos canais indicados na página de contato.',
    ],
  },
  {
    heading: 'Cookies e medição de audiência',
    paragraphs: [
      'Utilizamos medição de audiência para entender quais conteúdos são mais acessados. Essas métricas são agregadas e não são usadas para identificar pessoas individualmente.',
    ],
  },
];
