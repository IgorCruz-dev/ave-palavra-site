import type { SiteContent, SiteTheme } from './types';

/**
 * Conteúdo do site. É a única fonte da verdade — não há banco nem CMS: para
 * mudar um texto, uma foto ou um depoimento, edita-se este arquivo e publica-se.
 *
 * `{years}` é expandido em tempo de renderização a partir de `hero.founded_year`
 * (ver helpers.ts), para o "há N anos" nunca envelhecer sozinho.
 *
 * O que estiver marcado com `is_example: true` é ILUSTRATIVO e aparece no site
 * com o selo "Exemplo ilustrativo". Não remova o selo de um dado que não seja
 * um resultado real e autorizado.
 */

/** Dados da escola usados em links e metadados. */
export const ESCOLA = {
  nome: 'Ave, Palavra!',
  razaoSocial: 'Ave, Palavra! Cursos e Treinamentos',
  url: 'https://avepalavraecia.com.br',
  /** Portal do aluno, que segue na StudyTrack. */
  loginUrl: 'https://studytrack.com.br/partners/ave-palavra/login',
  registroUrl: 'https://studytrack.com.br/partners/ave-palavra/register',
} as const;

export const CONTEUDO: SiteContent = {
    nav: {
      links: [
        {
          label: 'Resultados',
          anchor: 'resultados',
        },
        {
          label: 'Método',
          anchor: 'metodo',
        },
        {
          label: 'Por dentro',
          anchor: 'por-dentro',
        },
        {
          label: 'Matrículas',
          anchor: 'matriculas',
        },
      ],
      visible: true,
      cta_label: 'Matricule-se',
      login_label: 'Entrar',
      logo_dark_url: '/img/logo-navy.webp',
      show_whatsapp: true,
      logo_light_url: '/img/logo-white.webp',
      whatsapp_number: '5516999866530',
    },
    hero: {
      proof: [
        {
          label: 'fundada por três\nprofessoras',
          value: '2010',
        },
        {
          label: 'tutorias com\ncada aluno',
          value: '1:1',
        },
        {
          label: 'Vila Nicácio,\nSão Paulo',
          value: 'Franca',
        },
      ],
      person: {
        alt: 'Professora Carla Bastianini, à frente da Ave, Palavra!, sorrindo, com a camiseta da escola',
        name: 'Profa. Carla Bastianini',
        role: 'À frente da Ave, Palavra!',
        image_url: '/img/carla-hero-1200.webp',
        image_sources: [
          {
            url: '/img/carla-hero-480.webp',
            width: 480,
          },
          {
            url: '/img/carla-hero-800.webp',
            width: 800,
          },
          {
            url: '/img/carla-hero-1200.webp',
            width: 1200,
          },
        ],
      },
      eyebrow: 'Redação · Português · Repertório',
      visible: true,
      checklist: {
        items: [
          {
            done: true,
            text: 'Tese clara',
          },
          {
            done: true,
            text: 'Repertório produtivo',
          },
          {
            done: true,
            text: 'Coesão entre parágrafos',
          },
          {
            done: false,
            text: 'Proposta de intervenção',
          },
        ],
        title: 'Checklist da sua redação',
      },
      lead_html: 'Aulas coletivas para aprender, tutorias individuais para evoluir. Uma escola que ensina com <strong>presença, sensibilidade e propósito</strong>, há {years} anos em Franca.',
      primary_cta: {
        type: 'anchor',
        label: 'Quero melhorar minha redação',
        value: '#matriculas',
        message: null,
      },
      sheet_label: 'Proposta de redação',
      title_lines: [
        'Toda aprovação',
        'começa pela',
      ],
      founded_year: 2010,
      sheet_number: 'Nº 07',
      secondary_cta: {
        type: 'anchor',
        label: 'Conheça nosso método',
        value: '#metodo',
        message: null,
      },
      title_highlight: 'palavra certa.',
      title_highlight_inline: false,
    },
    brand: {
      symbol_url: '/img/ave.webp',
    },
    enroll: {
      perks: [
        'Aulas presenciais coletivas',
        'Tutorias individuais 1:1',
        'Metodologia ativa e próxima',
        '{years} anos de história em Franca',
      ],
      contact: {
        hours: 'Seg. a sex. · 9h às 18h',
        address: 'R. Torquato Caleiro, 725 · Franca/SP',
        phone_number: '5516999866530',
        phone_display: '(16) 99986-6530',
      },
      eyebrow: 'Matrículas abertas',
      visible: true,
      photo_alt: 'Professora Carla Bastianini na biblioteca da escola',
      photo_url: '/img/carla-biblioteca.webp',
      primary_cta: {
        type: 'whatsapp',
        label: 'Quero garantir minha vaga',
        value: '5516999866530',
        message: 'Olá! Gostaria de saber mais sobre as aulas de redação da Ave, Palavra!',
      },
      title_lines: [
        'A próxima história',
        'de aprovação pode',
        'ser',
      ],
      secondary_cta: {
        type: 'whatsapp',
        label: 'Conversar com a equipe',
        value: '5516981813535',
        message: null,
      },
      contact_kicker: 'Fale com a gente',
      title_highlight: 'a sua.',
      title_highlight_inline: true,
    },
    footer: {
      about: 'Cursos livres de português, redação e humanidades, e formação para empresas. Desde julho de 2010.',
      email: 'atendimento@avepalavraecia.com',
      hours: 'Seg. a sex. · 9h às 18h',
      phones: [
        '(16) 99986-6530',
        '(16) 98181-3535',
        '(16) 3025-6530',
      ],
      socials: [
        {
          url: 'https://www.instagram.com/ave_palavra/',
          label: 'Instagram · @ave_palavra',
        },
        {
          url: 'https://www.facebook.com/AvePalavraFranca/',
          label: 'Facebook · AvePalavraFranca',
        },
        {
          url: 'https://avepalavraecia.com.br/',
          label: 'Português Empresarial',
        },
      ],
      visible: true,
      terms_url: 'https://studytrack.com.br/termos-de-uso',
      legal_name: 'Ave, Palavra! Cursos e Treinamentos',
      privacy_url: null,
      address_lines: [
        'R. Torquato Caleiro, 725',
        'Vila Nicácio · Franca/SP',
      ],
      show_powered_by: true,
    },
    inside: {
      lead: 'Aulões, bastidores e quem faz a escola acontecer. E, aqui, a voz dos alunos que escreveram as próprias conquistas.',
      reels: [
        {
          alt: 'Reel: dica de organização da redação',
          title: 'Organize sua redação',
          subtitle: '',
          cover_url: '/img/carla-reel-organize.webp',
          video_url: null,
          external_url: 'https://www.instagram.com/ave_palavra/',
        },
        {
          alt: 'Reel: convite com convidados especiais',
          title: 'Convidados especiais',
          subtitle: '',
          cover_url: '/img/carla-reel-porta.webp',
          video_url: null,
          external_url: 'https://www.instagram.com/ave_palavra/',
        },
      ],
      title: 'Por dentro da',
      eyebrow: 'Histórias reais',
      visible: true,
      main_video: {
        alt: 'Frame de um reel da Ave, Palavra! com a professora Carla anunciando o aulão',
        title: 'Nosso aulão pré-prova',
        subtitle: 'com a Profa. Carla · Reels @ave_palavra',
        cover_url: '/img/carla-reel-aulao.webp',
        video_url: null,
        external_url: 'https://www.instagram.com/ave_palavra/',
      },
      testimonials: [
        {
          name: '',
          text: 'Gostaria de expressar minha sincera gratidão pela excelência do Curso de Redação oferecido. Minha filha, Beatriz, não apenas aprimorou suas técnicas de escrita, mas também desenvolveu uma maior confiança em expressar suas ideias. O conteúdo programático e a metodologia de ensino demonstram o alto nível de profissionalismo e dedicação da equipe. O impacto deste curso será inestimável para sua trajetória acadêmica e profissional.',
          detail: '',
          photo_url: null,
          video_url: null,
        },
        {
          name: '',
          text: 'Quero agradecer muito essa oportunidade que tive de aprender no Ave Palavra. Eu melhorei muito nas redações e na interpretação de textos, aprendi muito sobre livros, escritores e atualidades. Por tudo isso, agradeço a você e aos professores e toda a equipe do Ave Palavra. Muito obrigada! ❤️',
          detail: '',
          photo_url: null,
          video_url: null,
        },
      ],
      title_highlight: 'Ave, Palavra!',
      title_highlight_inline: false,
    },
    method: {
      steps: [
        {
          n: '01',
          text: 'Aulas presenciais coletivas com metodologia ativa: estrutura, argumentação e repertório construídos em conjunto.',
          title: 'Aprender',
          accent: false,
        },
        {
          n: '02',
          text: 'Produção frequente de textos, com propostas no formato das provas que você vai enfrentar.',
          title: 'Praticar',
          accent: false,
        },
        {
          n: '03',
          text: 'Tutorias individuais: momentos 1:1 para revisar sua redação, entender cada correção e traçar o próximo passo.',
          title: 'Evoluir',
          accent: true,
        },
      ],
      title: 'Aprender junto.\nEvoluir',
      eyebrow: 'Nosso método',
      visible: true,
      correction_demo: {
        theme: 'os desafios da leitura na era digital',
        scores: [
          {
            key: 'C1',
            label: 'Norma culta',
            score: 160,
            max_score: 200,
          },
          {
            key: 'C2',
            label: 'Tema e repertório',
            score: 200,
            max_score: 200,
          },
          {
            key: 'C3',
            label: 'Argumentação',
            score: 180,
            max_score: 200,
          },
          {
            key: 'C4',
            label: 'Coesão',
            score: 200,
            max_score: 200,
          },
          {
            key: 'C5',
            label: 'Intervenção',
            score: 180,
            max_score: 200,
          },
        ],
        circled: 'tem',
        visible: true,
        total_max: 1000,
        highlights: [
          {
            id: 'n1',
            kind: 'teal',
            text: 'Segundo o sociólogo Zygmunt Bauman, vivemos uma modernidade líquida',
          },
          {
            id: 'n2',
            kind: 'sun',
            text: 'o excesso de estímulos digitais',
          },
          {
            id: 'n3',
            kind: 'red',
            text: 'a escola, a família e o poder público',
          },
        ],
        is_example: true,
        paragraphs: [
          'Segundo o sociólogo Zygmunt Bauman, vivemos uma modernidade líquida, em que as relações se tornam frágeis e passageiras. Essa lógica alcança também a leitura: o excesso de estímulos digitais fragmenta a atenção e transforma o livro em uma experiência cada vez mais rara entre os jovens.',
          'Nesse contexto, a escola, a família e o poder público tem papéis complementares. Mais do que oferecer acesso, é preciso formar leitores capazes de permanecer em um texto, interpretar e argumentar com autonomia...',
        ],
        total_score: 920,
        margin_notes: [
          {
            id: 'n1',
            red: false,
            text: 'e bem articulado à tese.',
            title: 'Repertório legitimado',
          },
          {
            id: 'n2',
            red: false,
            text: 'Boa delimitação do problema!',
            title: '',
          },
          {
            id: 'n3',
            red: true,
            text: 'Concordância: “têm”, com acento.',
            title: '',
          },
        ],
        next_tutoring: 'Revisão da C1 e plano para a proposta de intervenção',
        show_platform_label: true,
      },
      title_highlight: 'do seu jeito.',
      title_highlight_inline: true,
    },
    results: {
      lead: 'Notas, aprovações e histórias de alunos da Ave, Palavra!, apresentadas com dados reais e autorização de quem viveu cada conquista.',
      facts: [
        {
          text: 'Ano de fundação, em julho, pelas professoras Edna, Lucileida e Carla',
          value: '2010',
        },
        {
          text: 'Aulas presenciais coletivas e tutorias individuais com cada aluno',
          value: '2 formatos',
        },
        {
          text: 'Metodologia com participação significativa de quem aprende',
          value: 'Ativa',
        },
        {
          text: 'Redação, humanidades, português e formação para empresas',
          value: 'Português e Cia',
        },
      ],
      title: 'Cada redação conta\numa',
      eyebrow: 'Resultados',
      visible: true,
      approvals: {
        items: [],
        title: 'Quem escreveu aqui, foi longe.',
        kicker: 'Mural de aprovações',
        visible: true,
        // Sem aprovações confirmadas em `items`, o mural inteiro some. Mostrar
        // os chips de exemplo num site público leria como se fossem aprovações
        // reais; basta preencher `items` para o bloco voltar.
        placeholder_when_empty: false,
      },
      evolution: {
        title: 'De 560 a 960 em 5 redações',
        kicker: 'Evolução de um aluno',
        points: [
          560,
          680,
          760,
          880,
          960,
        ],
        visible: true,
        is_example: true,
      },
      featured_essay: {
        score: 960,
        theme: 'Modelo ENEM · 30 linhas',
        excerpt: 'A democratização do acesso à leitura no Brasil esbarra em um paradoxo: nunca se produziu tanto texto, e nunca foi tão difícil sustentar a atenção sobre um único livro...',
        visible: true,
        comments: [
          'Excelente repertório!',
          'Ótima articulação ✓',
        ],
        max_score: 1000,
        is_example: true,
      },
      title_highlight: 'evolução.',
      title_highlight_inline: true,
    },
  };

/** Tokens de design da marca. */
export const TEMA: SiteTheme = {
    ink: '#0d1a4a',
    red: '#e0484f',
    sky: '#d8f5fa',
    sun: '#f6d44a',
    mist: '#eef4fb',
    navy: '#1c306e',
    teal: '#2bc4d8',
    text: '#14204a',
    muted: '#5b6788',
    night: '#070f2e',
    paper: '#fbfaf6',
    'navy-2': '#24409a',
    'teal-2': '#1497b8',
  };

export const SEO = {
    title: 'Ave, Palavra! — Português e Cia · Redação em Franca/SP',
    description: 'Redação, português e repertório com quem ensina com presença, sensibilidade e propósito. Desde 2010 em Franca/SP.',
    og_image_url: '/img/og-1200x630.jpg',
  };
