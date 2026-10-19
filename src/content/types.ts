/**
 * Formato do conteúdo do site.
 *
 * Herdado do template `premium_v1`, originalmente multi-inquilino dentro da
 * StudyTrack. Aqui o site é de uma escola só, então sumiram os campos de
 * consentimento (a curadoria é feita ao editar `site.ts`, não em runtime) e a
 * noção de "org" virou as constantes de ESCOLA, mais abaixo.
 */

export type CtaType = 'anchor' | 'whatsapp' | 'register' | 'login' | 'url';

export interface Cta {
  label: string;
  type: CtaType;
  value: string;
  message?: string | null;
}

export interface Testimonial {
  name: string;
  detail: string;
  text: string;
  photo_url: string | null;
  video_url: string | null;
}

export interface Approval {
  name: string;
  detail: string;
  text: string;
  photo_url: string | null;
  video_url: string | null;
  course: string;
  institution: string;
  year: number | null;
}

export interface NavSection {
  visible: boolean;
  links: { label: string; anchor: string }[];
  /**
   * A nav é transparente sobre o herói escuro e sólida depois de rolar, então
   * o template precisa de duas versões do logo. Vazias → cai no `logo_url` da
   * org nas duas situações.
   */
  logo_light_url: string | null;
  logo_dark_url: string | null;
  cta_label: string;
  show_whatsapp: boolean;
  whatsapp_number: string;
  login_label: string;
}

export interface HeroSection {
  visible: boolean;
  eyebrow: string;
  title_lines: string[];
  title_highlight: string;
  title_highlight_inline: boolean;
  lead_html: string;
  founded_year: number | null;
  primary_cta: Cta | null;
  secondary_cta: Cta | null;
  proof: { value: string; label: string }[];
  person: {
    image_url: string | null;
    /** Variantes para srcset — a foto do herói costuma ser o LCP da página. */
    image_sources: { url: string; width: number }[];
    name: string;
    role: string;
    alt: string;
  } | null;
  checklist: { title: string; items: { text: string; done: boolean }[] } | null;
  sheet_label: string;
  sheet_number: string;
}

export interface FeaturedEssay {
  visible: boolean;
  score: number | null;
  max_score: number;
  theme: string;
  excerpt: string;
  comments: string[];
  is_example: boolean;
}

export interface Evolution {
  visible: boolean;
  kicker: string;
  title: string;
  points: number[];
  is_example: boolean;
}

export interface Approvals {
  visible: boolean;
  kicker: string;
  title: string;
  items: Approval[];
  placeholder_when_empty: boolean;
}

export interface ResultsSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha, como no protótipo. */
  title: string;
  title_highlight: string;
  /**
   * true = o destaque continua na MESMA linha do fim do título
   * ("Cada redação conta / uma *evolução.*"); false = linha própria
   * ("Por dentro da / *Ave, Palavra!*").
   */
  title_highlight_inline: boolean;
  lead: string;
  featured_essay: FeaturedEssay | null;
  evolution: Evolution | null;
  /**
   * Dado REAL (sem selo), ao lado dos ilustrativos. Com um número real no ar,
   * dois ilustrativos ao lado dele competem e enfraquecem o real — por isso
   * `evolution` está desligada em site.ts.
   */
  real_stat: RealStat | null;
  approvals: Approvals | null;
  facts: { value: string; text: string }[];
}

export interface Highlight {
  id: string;
  text: string;
  kind: 'teal' | 'sun' | 'red';
}

export interface MarginNote {
  id: string;
  title: string;
  text: string;
  red: boolean;
}

export interface CompetencyScore {
  key: string;
  label: string;
  score: number;
  max_score: number;
}

export interface CorrectionDemo {
  visible: boolean;
  theme: string;
  paragraphs: string[];
  highlights: Highlight[];
  margin_notes: MarginNote[];
  circled: string;
  scores: CompetencyScore[];
  total_score: number | null;
  total_max: number;
  next_tutoring: string;
  is_example: boolean;
  show_platform_label: boolean;
}

export interface MethodSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha, como no protótipo. */
  title: string;
  title_highlight: string;
  /**
   * true = o destaque continua na MESMA linha do fim do título
   * ("Cada redação conta / uma *evolução.*"); false = linha própria
   * ("Por dentro da / *Ave, Palavra!*").
   */
  title_highlight_inline: boolean;
  /** Abertura: a posição da escola sobre ensinar redação. */
  opening: { quote: string; text_html: string } | null;
  steps: { n: string; title: string; text: string; accent: boolean }[];
  /** O ciclo que se repete a cada semana, abaixo das três etapas. */
  cycle: MethodCycle | null;
  correction_demo: CorrectionDemo | null;
}

export interface VideoItem {
  cover_url: string | null;
  video_url: string | null;
  external_url: string | null;
  title: string;
  subtitle: string;
  alt: string;
}

export interface InsideSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha, como no protótipo. */
  title: string;
  title_highlight: string;
  /**
   * true = o destaque continua na MESMA linha do fim do título
   * ("Cada redação conta / uma *evolução.*"); false = linha própria
   * ("Por dentro da / *Ave, Palavra!*").
   */
  title_highlight_inline: boolean;
  lead: string;
  main_video: VideoItem | null;
  reels: VideoItem[];
  /** Grade de professores. Sem `members`, não é renderizada. */
  team: TeamBlock | null;
  testimonials: Testimonial[];
}

export interface EnrollSection {
  visible: boolean;
  eyebrow: string;
  title_lines: string[];
  title_highlight: string;
  title_highlight_inline: boolean;
  perks: string[];
  primary_cta: Cta | null;
  secondary_cta: Cta | null;
  photo_url: string | null;
  photo_alt: string;
  contact: {
    phone_display: string;
    phone_number: string;
    hours: string;
    address: string;
  } | null;
  contact_kicker: string;
  /** Faixa com a fachada da escola, acima do painel. */
  place: PlaceBand | null;
}

export interface FooterSection {
  visible: boolean;
  about: string;
  phones: string[];
  email: string;
  address_lines: string[];
  hours: string;
  socials: { label: string; url: string }[];
  legal_name: string;
  privacy_url: string | null;
  terms_url: string | null;
  show_powered_by: boolean;
}

/**
 * Símbolo decorativo da marca, reusado em várias seções: a silhueta gigante
 * atrás da pessoa no herói, o ícone da folha de redação, o avatar da pílula, o
 * selo da tutoria e a marca d'água do painel de matrículas. É o SÍMBOLO (sem a
 * assinatura tipográfica), não o `logo_url` da org — é o que funciona ampliado.
 */
export interface BrandSection {
  symbol_url: string | null;
}

export interface SiteContent {
  brand?: BrandSection;
  nav?: NavSection;
  hero?: HeroSection;
  results?: ResultsSection;
  method?: MethodSection;
  travessia?: TravessiaSection;
  miguilim?: MiguilimSection;
  inside?: InsideSection;
  services?: ServicesSection;
  enroll?: EnrollSection;
  footer?: FooterSection;
}

export interface SiteSeo {
  title?: string;
  description?: string;
  og_image_url?: string | null;
}

/**
 * Links e nome da escola, passados às seções que precisam deles (nav, CTAs de
 * login/registro). No multi-inquilino isso vinha da org; aqui vem de `ESCOLA`,
 * em site.ts.
 */
export interface SiteLinks {
  nome: string;
  loginUrl: string;
  registerUrl: string;
}

/** Tokens de design finais, injetados como custom properties no wrapper. */
export type SiteTheme = Record<string, string>;

/* ===========================================================================
 * Material de 2026: "Tempo de Travessia", os dois cursos e os outros serviços.
 *
 * Tudo abaixo nasceu dos PDFs institucionais de 2026 e do site atual da escola.
 * Os campos são opcionais no `SiteContent`: o que não estiver preenchido não é
 * renderizado, e o ritmo de fundos se mantém.
 * ======================================================================== */

/** Um bloco da aula na linha do tempo das 3h de permanência. */
export interface ClassBlock {
  /** Duração em minutos — define a largura do bloco na barra. */
  minutes: number;
  label: string;
  /** Intervalos são pintados em cinza e não recebem rótulo longo. */
  kind: 'aula' | 'intervalo';
}

/** Dia e horário de uma turma. Muda todo ano: ver nota em site.ts. */
export interface CourseSchedule {
  day: string;
  time: string;
}

/**
 * Seção "Tempo de Travessia" — a assinatura de 2026 e o curso de Redação e
 * Humanidades, que é a vitrine da escola.
 */
export interface TravessiaSection {
  visible: boolean;
  eyebrow: string;
  /** Pode conter "\n" para quebrar linha. */
  title: string;
  title_highlight: string;
  title_highlight_inline: boolean;
  lead: string;
  /** Epígrafe de Guimarães Rosa que abre o material de 2026. */
  epigraph: { text: string; author: string } | null;
  /** Arte de campanha (ponte + ampulheta + despertador), extraída dos PDFs. */
  bridge_image_url: string | null;
  bridge_alt: string;
  /** Foto de uma aula real, logo abaixo da linha do tempo. Reusa `.place`. */
  photo: PlaceBand | null;
  /** Linha do tempo das 3h: 55' humanidades, 45' escrita, 60' técnica. */
  timeline: { kicker: string; title: string; blocks: ClassBlock[]; note: string } | null;
  /** O que cada parte do curso é, em detalhe. */
  pillars: { title: string; text: string }[];
  /**
   * Gêneros e bancas TRABALHADOS no curso. A copy precisa deixar inequívoco
   * que são conteúdos de estudo, nunca aprovações.
   */
  genres: { kicker: string; title: string; items: string[] } | null;
  boards: { kicker: string; title: string; items: string[]; note: string } | null;
  /** Turmas e horários. Reais, mas mudam todo ano — exigem manutenção anual. */
  classes: { kicker: string; title: string; items: CourseSchedule[]; note: string } | null;
  /** Características gerais (1x/semana, turmas reduzidas, simulados…). */
  general: { kicker: string; items: string[] } | null;
  primary_cta: Cta | null;
}

/**
 * Seção do Curso Miguilim, para 7º e 8º ano.
 *
 * Única seção com fundo quente. A paleta é derivada do `--sun` do site mais um
 * rosado local, declarado no escopo da seção — não entra no `TEMA`.
 */
export interface MiguilimSection {
  visible: boolean;
  eyebrow: string;
  title: string;
  title_highlight: string;
  title_highlight_inline: boolean;
  /** "7º e 8º ano" — o PDF. O áudio dizia 6º, 7º e 8º: confirmar. */
  audience: string;
  /** A história do menino do sertão e dos óculos. Aceita <strong>. */
  story_html: string;
  /** A frase que resume tudo, em destaque. */
  pull_quote: string;
  /**
   * Frase que entra em foco sob a lente dos óculos — o efeito é CSS puro
   * (filter: blur + clip-path), e a lente só se move com JS e sem
   * prefers-reduced-motion.
   */
  lens_phrase: string;
  /** Turmas Alfa e Beta, cada uma com seus dois eixos. */
  groups: {
    name: string;
    subtitle: string;
    schedule: string;
    items: { title: string; text: string }[];
  }[];
  general: { kicker: string; items: string[] } | null;
  /** "Absolutamente satisfatório, interativo, ave." */
  signature: string;
  primary_cta: Cta | null;
}

/** Um serviço com corpo próprio (hoje: português empresarial e SIPAT's). */
export interface ServiceCard {
  title: string;
  lead: string;
  blocks: { title: string; text: string }[];
}

/**
 * "Outros serviços" — presente e encontrável, sem competir com a redação.
 * Faixa compacta: o empresarial tem mais corpo porque tem conteúdo próprio;
 * o resto são chips, e a lista aceita itens novos sem redesenho.
 */
export interface ServicesSection {
  visible: boolean;
  eyebrow: string;
  title: string;
  title_highlight: string;
  title_highlight_inline: boolean;
  lead: string;
  featured: ServiceCard[];
  others: { kicker: string; items: string[] } | null;
  primary_cta: Cta | null;
}

/**
 * Professor da equipe.
 *
 * Nome e foto de pessoa identificável: só publique com o professor ciente.
 * Sem `members`, a grade inteira some — é o estado correto enquanto os nomes
 * não chegarem. NUNCA preencher com nome inventado.
 */
export interface TeamMember {
  name: string;
  role: string;
  photo_url: string | null;
  alt: string;
}

export interface TeamBlock {
  visible: boolean;
  kicker: string;
  title: string;
  lead: string;
  members: TeamMember[];
}

/** Dado real e verificado, sem selo de exemplo. Exige recorte declarado. */
export interface RealStat {
  visible: boolean;
  kicker: string;
  value: string;
  label: string;
  /**
   * De onde o número vem. Número grande sem recorte envelhece mal — e uma
   * professora de português vai questionar.
   */
  source: string;
}

/** O ciclo da semana: aula → produção → correção → repertório → acompanhamento. */
export interface MethodCycle {
  kicker: string;
  title: string;
  steps: { label: string; text: string }[];
  note: string;
}

/** A fachada da escola, junto do endereço, abrindo a seção de matrículas. */
export interface PlaceBand {
  image_url: string | null;
  alt: string;
  kicker: string;
  text: string;
}
