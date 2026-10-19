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
          label: 'Cursos',
          anchor: 'cursos',
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
    travessia: {
      visible: true,
      eyebrow: 'Tempo de Travessia · Redação e Humanidades',
      title: 'Preparar para a prova\ne para o que vem',
      title_highlight: 'depois dela.',
      title_highlight_inline: false,
      lead: 'O curso de Redação e Humanidades é um espaço de aprendizado e reflexão para quem está vivendo o intenso momento da travessia do vestibular. Com uma abordagem humana e criativa, o curso guia o desenvolvimento da escrita, do pensamento crítico e da expressão pessoal.',
      epigraph: {
        text: 'Digo: o real não está na saída nem na chegada: ele se dispõe para a gente é no meio da travessia.',
        author: 'Guimarães Rosa',
      },
      // Arte da campanha de 2026, extraída dos PDFs institucionais a 600 dpi e
      // recolorida em navy para fundo claro.
      bridge_image_url: '/img/ponte-travessia.webp',
      bridge_alt: '',
      // Recortada de dentro do post de setembro/2026 — a arte de feed não entra
      // no site, mas a fotografia dela, sim.
      photo: {
        image_url: '/img/aula.webp',
        alt: 'Turma de redação em aula, escrevendo, diante da parede com os nomes de Machado de Assis, Guimarães Rosa, Manoel de Barros e Jorge Amado',
        kicker: 'Escrita em aula',
        text: 'Toda semana, o texto nasce em sala, com o professor por perto.',
      },
      timeline: {
        kicker: 'Dinâmica da aula',
        title: 'Três horas, três tempos',
        blocks: [
          { minutes: 55, label: 'Humanidades', kind: 'aula' },
          { minutes: 5, label: 'Intervalo', kind: 'intervalo' },
          { minutes: 45, label: 'Escrita em aula', kind: 'aula' },
          { minutes: 15, label: 'Intervalo', kind: 'intervalo' },
          { minutes: 60, label: 'Técnica de redação', kind: 'aula' },
        ],
        note: 'Uma vez por semana, com intervalos planejados para o descanso.',
      },
      pillars: [
        {
          title: 'Humanidades',
          text: 'Dois professores em sala, com metodologia ativa: história, filosofia, sociologia, atualidades e geopolítica.',
        },
        {
          title: 'Escrita em aula',
          text: 'Momento prático de elaboração do projeto de texto e do rascunho, com o professor por perto.',
        },
        {
          title: 'Técnica de redação',
          text: 'Aspectos estruturais, estratégias argumentativas, perfis das bancas e exercícios de argumentação.',
        },
        {
          title: 'Correções semanais',
          text: 'Feitas por especialistas, em formato escrito ou em áudio, toda semana.',
        },
        {
          title: 'Tutorias individuais',
          text: 'Aulas de trinta minutos, um a um, dedicadas à correção da sua redação.',
        },
        {
          title: 'Material autoral',
          text: 'Recursos pedagógicos próprios, que reforçam o repertório e a técnica de escrita.',
        },
      ],
      genres: {
        kicker: 'Gêneros textuais',
        title: 'O que se escreve durante o curso',
        items: [
          'Artigo de opinião',
          'Carta argumentativa',
          'Conto',
          'Crônica',
          'Depoimento',
          'Dissertação-argumentativa',
          'Resumo ou síntese',
          'Discurso',
          'Manifesto',
          'Abaixo-assinado',
        ],
      },
      boards: {
        kicker: 'Bancas estudadas',
        title: 'Os perfis de prova que o curso estuda',
        items: [
          'EDITORIAL',
          'ENEM',
          'FDF',
          'FUVEST',
          'UEMG',
          'UFU',
          'UFMG',
          'UNICAMP',
          'UNI-FACEF',
          'UNIFRAN',
          'VUNESP',
        ],
        // Deixa inequívoco: é conteúdo de estudo, nunca relação de aprovações.
        note: 'Esta é a relação de bancas cujos perfis, propostas e critérios são trabalhados em aula. Não se trata de relação de aprovações.',
      },
      classes: {
        kicker: 'Turmas',
        title: 'Horários de 2026',
        items: [
          { day: 'Quartas-feiras', time: 'das 14h às 17h' },
          { day: 'Quintas-feiras', time: 'das 15h às 18h' },
        ],
        // MANUTENÇÃO ANUAL: turmas e horários mudam a cada ano letivo.
        note: 'Turmas do ano letivo de 2026. Os horários são revistos a cada ano.',
      },
      general: {
        kicker: 'Aspecto geral',
        items: [
          'Uma vez por semana',
          'Três horas de permanência',
          'Turmas reduzidas',
          'Correções semanais',
          'Simulados quinzenais',
          'Intervalos planejados para o descanso',
          'Aulas verticais',
          'Foco no eixo temático da semana',
        ],
      },
      primary_cta: {
        type: 'whatsapp',
        label: 'Quero conhecer o curso',
        value: '5516999866530',
        message: 'Olá! Gostaria de saber mais sobre o curso de Redação e Humanidades da Ave, Palavra!',
      },
    },
    miguilim: {
      visible: true,
      eyebrow: 'Curso Miguilim',
      title: 'O mundo não mudou.\nMudou o',
      title_highlight: 'jeito de olhar.',
      title_highlight_inline: false,
      // DIVERGÊNCIA A CONFIRMAR: o PDF institucional diz 7º e 8º ano; o áudio
      // do founder diz "sexto, sétimo, oitavo". Vale o PDF até confirmarem.
      audience: '7º e 8º ano',
      story_html: 'Você conhece a história do Miguilim? Ele é um personagem de um conto de Guimarães Rosa. Era um menino do sertão que via o mundo meio embaçado e confuso. Até o dia em que colocou óculos pela primeira vez e descobriu que as árvores, os pássaros e as pessoas tinham <strong>contornos definidos, cores vivas e detalhes incríveis</strong>.',
      pull_quote: 'O Curso Miguilim é exatamente esse par de óculos.',
      lens_phrase: 'contornos definidos, cores vivas e detalhes incríveis',
      groups: [
        {
          name: 'Turma Alfa',
          subtitle: 'Cultura e Classes Gramaticais',
          schedule: 'Segundas-feiras, das 14h às 15h30',
          items: [
            {
              title: 'Bússola',
              text: 'Textos, músicas e vídeos oferecidos e compreendidos ao longo do curso. É o acesso à cultura.',
            },
            {
              title: 'Ferramentas de Navegação',
              text: 'Teoria, identificação, classificação e análise das dez classes gramaticais.',
            },
          ],
        },
        {
          name: 'Turma Beta',
          subtitle: 'Compreensão, Interpretação e Redação',
          schedule: 'Quartas-feiras, das 15h30 às 17h',
          items: [
            {
              title: 'Desmontar para entender',
              text: 'Frases, músicas e textos desmontados como peças de Lego, para compreender como cada parte se encaixa.',
            },
            {
              title: 'O Laboratório da Língua',
              text: 'Momentos quinzenais de estruturação e planejamento de textos.',
            },
          ],
        },
      ],
      general: {
        kicker: 'Aspecto geral',
        items: [
          'Uma vez por semana',
          'Uma hora e meia de aula',
          'Material autoral',
          'Aspecto teórico e prático',
          'Ludicidade e muita cultura',
          'Intervalos planejados para o descanso',
          'Interação constante entre aluno e conteúdo',
        ],
      },
      signature: 'Absolutamente satisfatório, interativo, ave.',
      primary_cta: {
        type: 'whatsapp',
        label: 'Quero conhecer o Miguilim',
        value: '5516999866530',
        message: 'Olá! Gostaria de saber mais sobre o Curso Miguilim da Ave, Palavra!',
      },
    },
    services: {
      visible: true,
      eyebrow: 'Outros serviços',
      title: 'A escola também atende',
      title_highlight: 'empresas e equipes.',
      title_highlight_inline: true,
      lead: 'A mesma metodologia ativa, aplicada fora da sala de aula regular.',
      featured: [
        {
          title: 'Português empresarial',
          lead: 'O português correto é peça fundamental para todo negócio que deseja ter uma comunicação de qualidade e eficiente.',
          blocks: [
            {
              title: 'O que é',
              text: 'A capacitação atende necessidades de lideranças e funcionários, estruturando a base da Língua Portuguesa, corrigindo vícios da oralidade, otimizando a comunicação no ambiente de trabalho e melhorando a produção de textos empresariais.',
            },
            {
              title: 'Para quem',
              text: 'Profissionais de todas as áreas e níveis hierárquicos da empresa que necessitem aprimorar a comunicação oral e escrita para transmitir ideias e mensagens importantes.',
            },
            {
              title: 'Como funciona',
              text: 'Abordagem ativa, com participação significativa dos alunos, em dois segmentos: aulas presenciais coletivas e tutorias individuais com cada participante.',
            },
            {
              title: 'O que muda',
              text: 'Treinamentos que ampliam a experiência profissional, aumentam a produtividade e potencializam os níveis de serviço.',
            },
          ],
        },
        {
          title: 'SIPAT\u2019s',
          lead: 'Programação própria para a semana interna de prevenção de acidentes, em três frentes.',
          blocks: [
            {
              title: 'Interpessoal',
              text: 'Contação de histórias sobre diversidade, respeito, trabalho em equipe, assédio e comunicação; caça ao tesouro empresarial personalizada; gincana empresarial.',
            },
            {
              title: 'Sustentabilidade',
              text: 'Práticas ESG, palestras e oficinas sobre responsabilidade ambiental e comunitária.',
            },
            {
              title: 'Saúde',
              text: 'Segurança e medicina do trabalho, exercícios laborais e bem-estar: nutrição, saúde mental e lazer.',
            },
          ],
        },
      ],
      // Esta lista aceita itens novos sem redesenho — eventos culturais e o que
      // mais vier entram aqui.
      others: {
        kicker: 'Também oferecemos',
        items: [
          'Acompanhamento escolar',
          'Acompanhamento profissional',
          'Aula particular',
          'Contação de histórias',
          'Eventos culturais',
          'Formações docentes',
          'Palestras',
          'Treinamentos',
        ],
      },
      primary_cta: {
        type: 'whatsapp',
        label: 'Falar sobre treinamentos',
        value: '5516999866530',
        message: 'Olá! Gostaria de saber mais sobre os treinamentos e o português empresarial da Ave, Palavra!',
      },
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
      // Única foto do lugar físico que temos, recortada de dentro do post de
      // Instagram (a arte não entra; a foto, sim).
      place: {
        image_url: '/img/fachada.webp',
        alt: 'Fachada da Ave, Palavra! na Rua Torquato Caleiro: muro azul, letreiro turquesa com o logotipo da escola e calçada de pedras portuguesas',
        kicker: 'A escola',
        text: 'R. Torquato Caleiro, 725 — Vila Nicácio, Franca/SP. Aulas presenciais, em sala, desde 2010.',
      },
      title_highlight: 'a sua.',
      title_highlight_inline: true,
    },
    footer: {
      about: 'Redação, português e humanidades para quem está atravessando o vestibular, e formação para empresas. Desde julho de 2010, em Franca.',
      email: 'atendimento@avepalavraecia.com.br',
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
          url: '#servicos',
          label: 'Português empresarial e SIPAT\u2019s',
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
      // A grade só aparece quando `members` tiver gente. Enquanto os nomes e as
      // disciplinas não chegarem do founder, ela fica fora do ar: publicar foto
      // de professor sem nome é pior do que não publicar, e nome inventado
      // não é opção. As cinco fotos já estão tratadas em /img/professores/.
      team: {
        visible: true,
        kicker: 'Quem ensina',
        title: 'Os professores da casa',
        lead: 'Humanidades com dois professores em sala, correções por especialistas e tutorias um a um.',
        members: [],
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
      // Copy do post de setembro/2026, reescrita na tipografia do site em vez
      // de entrar como arte de feed colada.
      opening: {
        quote: 'Não ensinamos redação como fórmula pronta.',
        text_html: 'Estrutura importa. Mas aprender a escrever também é aprender a <strong>escolher, relacionar, argumentar</strong> e construir um <strong>texto próprio</strong>.',
      },
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
      cycle: {
        kicker: 'O ciclo da semana',
        title: 'Por aqui, o processo passa por',
        steps: [
          { label: 'Aula', text: 'Humanidades, escrita e técnica, no mesmo encontro.' },
          { label: 'Produção', text: 'Texto escrito em sala, no formato da prova.' },
          { label: 'Correção', text: 'Semanal, por especialistas, escrita ou em áudio.' },
          { label: 'Repertório', text: 'Guia cultural e material autoral da escola.' },
          { label: 'Acompanhamento', text: 'Tutoria individual para o próximo passo.' },
        ],
        note: 'Tudo isso respeitando o caminho de cada aluno.',
      },
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
      // DESLIGADA em out/2026. Com o 87% real no ar, dois blocos ilustrativos
      // ao lado de um dado real competiam entre si e enfraqueciam o real. O
      // conteúdo fica aqui: basta `visible: true` para o gráfico voltar.
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
        visible: false,
        is_example: true,
      },
      // Primeiro dado REAL e numérico do site — por isso sem selo de exemplo.
      // TODO (founder): confirmar o recorte (qual turma, qual período, medido
      // como) e reescrever `source` com ele. Número grande sem recorte
      // envelhece mal.
      real_stat: {
        visible: true,
        kicker: 'Resultado do curso',
        value: '87%',
        label: 'dos alunos com nota maior que 800',
        source: 'Dado divulgado pela escola no material institucional do curso de Redação e Humanidades de 2026.',
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
