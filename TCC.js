// =============================================================================
//  PLATAFORMA ENEM 2026 — JavaScript Principal
//  Seção "Praticar Agora" expandida e refinada
// =============================================================================

// ── ESTADO GLOBAL ─────────────────────────────────────────────────────────────
const STATE = {
    redacao:      null,
    errosIdentif: [],
    nome:         '',
    historico:    [],
    nivel:        1,
    xp:           0,
    sequencia:    0,
    modoAtivo:    'cacador'   // 'cacador' | 'multipla' | 'digitacao'
};

// ── CONSTANTES DE GAMIFICAÇÃO ──────────────────────────────────────────────────
const XP_POR_ERRO  = 10;
const XP_POR_NIVEL = 100;
const BONUS_PERF   = 50;
const BONUS_RAPIDO = 20; // bônus por finalizar em menos de 60s

const NIVEIS = {
    1: { titulo: '💀 Iniciante',      cor: '#5a0000' },
    2: { titulo: '🩸 Suspeito',       cor: '#8b0000' },
    3: { titulo: '⛓️ Prisioneiro',    cor: '#a05a2c' },
    4: { titulo: '🪚 Sobrevivente',   cor: '#b8a000' },
    5: { titulo: '🎭 Mestre do Jogo', cor: '#c0392b' }
};

// ── TEMAS DE REDAÇÃO ───────────────────────────────────────────────────────────
const TEMAS = {
    educacao: {
        titulo: 'Educação e Tecnologia na Era Digital',
        dificuldade: 'Média', competencia: 'C1, C2, C3',
        introducao: [
            'A educação brasileira enfrenta grandes desafios na era digital',
            'A tecnologia tem transformado profundamente o ensino no Brasil',
            'O acesso à educação de qualidade é fundamental para o desenvolvimento do país',
            'Na sociedade contemporânea, a formação crítica dos jovens depende cada vez mais de recursos digitais'
        ],
        desenvolvimento: [
            'Por um lado, a inclusão digital nas escolas públicas ainda é precária',
            'Ademais, a formação de professores para o uso de tecnologias é insuficiente',
            'Além disso, a desigualdade no acesso à internet prejudica milhões de estudantes',
            'Nesse contexto, programas governamentais têm buscado democratizar o acesso',
            'Outrossim, iniciativas privadas também contribuem para a modernização do ensino',
            'Cabe destacar que a pandemia evidenciou a fragilidade do sistema educacional brasileiro',
            'Em contrapartida, experiências bem-sucedidas de ensino híbrido revelam o potencial da tecnologia'
        ],
        conclusao: [
            'Portanto, é necessário investir em infraestrutura tecnológica nas escolas',
            'Assim, torna-se imprescindível capacitar os educadores para o uso pedagógico da tecnologia',
            'Destarte, políticas públicas devem garantir acesso universal à internet de qualidade',
            'Conclui-se, portanto, que a transformação digital da educação exige ação conjunta do Estado e da sociedade'
        ]
    },
    'meio-ambiente': {
        titulo: 'Preservação Ambiental e Desenvolvimento Sustentável',
        dificuldade: 'Fácil', competencia: 'C1, C3, C5',
        introducao: [
            'A preservação do meio ambiente é uma das maiores preocupações da atualidade',
            'O Brasil possui uma das maiores biodiversidades do planeta',
            'A questão ambiental tem gerado debates intensos na sociedade contemporânea',
            'A crise climática impõe ao Brasil responsabilidades históricas diante do mundo'
        ],
        desenvolvimento: [
            'De um lado, o desmatamento na Amazônia atingiu níveis alarmantes',
            'Além disso, a poluição dos rios e oceanos ameaça a vida marinha',
            'Por outro lado, energias renováveis ganham espaço na matriz energética',
            'Nesse sentido, a consciência ambiental da população tem crescido',
            'Ademais, empresas começam a adotar práticas sustentáveis',
            'Paralelamente, movimentos sociais pressionam por legislações ambientais mais rígidas',
            'É válido notar que o agronegócio e a preservação podem coexistir quando há planejamento responsável'
        ],
        conclusao: [
            'Portanto, o governo deve fiscalizar rigorosamente crimes ambientais',
            'Assim, campanhas de conscientização precisam ser ampliadas',
            'Desse modo, é fundamental investir em tecnologias limpas e sustentáveis',
            'Infere-se, portanto, que a sustentabilidade não é apenas uma escolha, mas uma necessidade civilizatória'
        ]
    },
    'saude-mental': {
        titulo: 'Saúde Mental no Brasil: Desafios e Caminhos',
        dificuldade: 'Média', competencia: 'C1, C2, C4',
        introducao: [
            'A saúde mental tornou-se uma questão de saúde pública no Brasil',
            'Problemas psicológicos afetam milhões de brasileiros atualmente',
            'O cuidado com a mente é tão importante quanto com o corpo',
            'O crescimento dos transtornos mentais revela uma crise silenciosa que atravessa todas as classes sociais'
        ],
        desenvolvimento: [
            'Primeiramente, o estigma social em torno de doenças mentais ainda é muito forte',
            'Além disso, o acesso a tratamento psicológico é limitado no SUS',
            'Por outro lado, campanhas como Janeiro Branco têm conscientizado a população',
            'Nesse contexto, o ambiente de trabalho tem sido fonte de adoecimento',
            'Ademais, as redes sociais intensificam problemas como ansiedade e depressão',
            'Cabe ressaltar que adolescentes e jovens adultos são os mais afetados por esse fenômeno',
            'É importante frisar que a prevenção é mais eficaz e mais econômica do que o tratamento tardio'
        ],
        conclusao: [
            'Portanto, políticas de saúde mental devem ser ampliadas no sistema público',
            'Assim, empresas precisam promover ambientes de trabalho mais saudáveis',
            'Destarte, a sociedade deve combater o preconceito contra doenças psicológicas',
            'Em síntese, cuidar da saúde mental é investir no bem-estar coletivo e na produtividade da nação'
        ]
    },
    desigualdade: {
        titulo: 'Desigualdade Social e Seus Impactos no Brasil',
        dificuldade: 'Difícil', competencia: 'C1, C3, C4, C5',
        introducao: [
            'A desigualdade social é um dos maiores problemas do Brasil',
            'O país figura entre os mais desiguais do mundo',
            'A concentração de renda afeta diretamente a qualidade de vida da população',
            'O abismo social que separa ricos e pobres no Brasil é reflexo de séculos de exclusão estrutural'
        ],
        desenvolvimento: [
            'Em primeiro lugar, o acesso à educação de qualidade é desigual entre classes',
            'Além disso, a saúde pública não atende adequadamente as populações mais pobres',
            'Por outro lado, programas sociais têm ajudado a reduzir a pobreza extrema',
            'Nesse sentido, a reforma tributária é debatida como solução',
            'Ademais, a geração de empregos é fundamental para reduzir desigualdades',
            'Vale destacar que a desigualdade racial aprofunda ainda mais as disparidades socioeconômicas',
            'Sendo assim, sem redistribuição de riqueza, o crescimento econômico não se traduz em bem-estar social'
        ],
        conclusao: [
            'Portanto, investimentos em educação pública são essenciais',
            'Assim, políticas de redistribuição de renda devem ser fortalecidas',
            'Desse modo, oportunidades iguais precisam ser garantidas a todos',
            'Conclui-se que apenas com vontade política e mobilização social será possível construir um Brasil mais justo'
        ]
    },
    violencia: {
        titulo: 'Violência Contra a Mulher no Brasil',
        dificuldade: 'Média', competencia: 'C2, C3, C5',
        introducao: [
            'A violência contra a mulher é um grave problema social no Brasil',
            'Dados mostram que milhares de mulheres sofrem agressões diariamente',
            'A Lei Maria da Penha foi um avanço importante na proteção feminina',
            'O Brasil enfrenta uma epidemia de violência de gênero que exige respostas urgentes do Estado e da sociedade'
        ],
        desenvolvimento: [
            'Primeiramente, a cultura machista ainda perpetua violências de gênero',
            'Além disso, muitas vítimas têm medo de denunciar seus agressores',
            'Por outro lado, delegacias especializadas têm melhorado o atendimento',
            'Nesse contexto, campanhas de conscientização são fundamentais',
            'Ademais, a educação de base precisa trabalhar o respeito e igualdade',
            'Cumpre salientar que o feminicídio ainda cresce em muitas regiões brasileiras',
            'É fundamental reconhecer que a violência doméstica afeta também filhos e toda a família'
        ],
        conclusao: [
            'Portanto, é necessário fortalecer mecanismos de proteção às vítimas',
            'Assim, campanhas educativas devem começar desde a infância',
            'Destarte, punições mais severas podem inibir agressores',
            'Em suma, combater a violência contra a mulher exige transformação cultural profunda e políticas públicas efetivas'
        ]
    },
    internet: {
        titulo: 'Democratização do Acesso à Internet no Brasil',
        dificuldade: 'Fácil', competencia: 'C1, C3, C5',
        introducao: [
            'O acesso à internet tornou-se essencial na sociedade contemporânea',
            'Milhões de brasileiros ainda não têm acesso à rede mundial',
            'A exclusão digital aprofunda desigualdades sociais existentes',
            'Na era da informação, estar desconectado equivale a estar excluído de oportunidades fundamentais'
        ],
        desenvolvimento: [
            'De um lado, a internet é fundamental para educação e trabalho',
            'Além disso, serviços públicos estão cada vez mais digitalizados',
            'Por outro lado, áreas rurais e periféricas carecem de infraestrutura',
            'Nesse sentido, programas governamentais buscam expandir o acesso',
            'Ademais, a internet móvel tem crescido mas ainda é cara para muitos',
            'É relevante apontar que a velocidade da conexão também determina a qualidade do acesso',
            'Paralelamente, a alfabetização digital é tão necessária quanto a disponibilidade técnica de conexão'
        ],
        conclusao: [
            'Portanto, o Estado deve investir em infraestrutura de telecomunicações',
            'Assim, programas de inclusão digital precisam ser ampliados',
            'Desse modo, tarifas populares podem democratizar o acesso à rede',
            'Conclui-se que garantir internet a todos é condição indispensável para uma cidadania plena no século XXI'
        ]
    },
    trabalho: {
        titulo: 'O Futuro do Trabalho na Era da Automação',
        dificuldade: 'Difícil', competencia: 'C1, C2, C3, C5',
        introducao: [
            'A automação e a inteligência artificial estão transformando o mercado de trabalho',
            'A revolução tecnológica impõe novas exigências aos trabalhadores brasileiros',
            'O avanço das máquinas levanta questões sobre o futuro do emprego no Brasil',
            'A Quarta Revolução Industrial redefine profissões e cria novas formas de trabalho'
        ],
        desenvolvimento: [
            'Em primeiro lugar, funções repetitivas e mecânicas são as mais vulneráveis à automação',
            'Além disso, trabalhadores com baixa qualificação enfrentam maior risco de desemprego',
            'Por outro lado, novas profissões emergem na área de tecnologia e dados',
            'Nesse contexto, a educação continuada torna-se indispensável para a adaptação',
            'Ademais, o trabalho remoto e os modelos híbridos ganham cada vez mais espaço',
            'Cabe observar que a transição tecnológica pode aprofundar desigualdades se não houver políticas públicas',
            'Vale ressaltar que criatividade, empatia e pensamento crítico serão habilidades essenciais no futuro'
        ],
        conclusao: [
            'Portanto, é urgente reformular currículos escolares para preparar trabalhadores do futuro',
            'Assim, políticas de requalificação profissional devem ser implementadas com urgência',
            'Destarte, a parceria entre governo, empresas e universidades é fundamental nessa transição',
            'Conclui-se que adaptar-se à automação exige investimento em educação, ciência e proteção social'
        ]
    },
    racismo: {
        titulo: 'Racismo Estrutural e Desigualdade Racial no Brasil',
        dificuldade: 'Difícil', competencia: 'C2, C3, C4, C5',
        introducao: [
            'O racismo estrutural é um dos mais graves problemas da sociedade brasileira',
            'A população negra enfrenta desigualdades históricas que persistem até hoje',
            'A superação do racismo no Brasil exige reconhecer sua dimensão estrutural e não apenas individual',
            'Apesar de avanços legislativos, a discriminação racial permanece presente em diversas esferas da vida social'
        ],
        desenvolvimento: [
            'Primeiramente, negros e pardos são sub-representados em cargos de liderança e instituições de ensino superior',
            'Além disso, a violência policial afeta desproporcionalmente a população negra e periférica',
            'Por outro lado, políticas de cotas universitárias têm ampliado o acesso ao ensino superior',
            'Nesse sentido, a educação para a diversidade é fundamental na construção de uma sociedade mais justa',
            'Ademais, movimentos como o Black Lives Matter influenciaram o debate racial no Brasil',
            'Cabe destacar que a representatividade na mídia e na política contribui para a desconstrução de estereótipos',
            'É imprescindível reconhecer que reparação histórica passa não apenas por leis, mas por mudança cultural'
        ],
        conclusao: [
            'Portanto, políticas públicas de ação afirmativa devem ser ampliadas e fortalecidas',
            'Assim, o combate ao racismo exige comprometimento permanente do Estado e da sociedade civil',
            'Destarte, educar para a igualdade racial desde a infância é o caminho mais eficaz e duradouro',
            'Em suma, erradicar o racismo estrutural é condição essencial para que o Brasil realize seu potencial humano'
        ]
    }
};

// ── BANCO DE ERROS EXPANDIDO ────────────────────────────────────────────────────
// Cada entrada: { correto, errado, explicacao, competencia, tipo }
const ERROS = [
    // --- ACENTUAÇÃO ---
    { correto: 'têm',            errado: 'tem',            tipo: 'acentuacao',    competencia: 'C1', explicacao: 'O verbo "ter" na 3ª pessoa do plural leva acento circunflexo: têm.' },
    { correto: 'vêm',            errado: 'vem',            tipo: 'acentuacao',    competencia: 'C1', explicacao: 'O verbo "vir" na 3ª pessoa do plural leva acento: vêm.' },
    { correto: 'países',         errado: 'paises',         tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Paroxítona terminada em ditongo leva acento: países.' },
    { correto: 'saúde',          errado: 'saude',          tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Hiato tônico com "u" exige acento: saúde.' },
    { correto: 'área',           errado: 'area',           tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Paroxítona terminada em ditongo leva acento: área.' },
    { correto: 'histórico',      errado: 'historico',      tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: histórico.' },
    { correto: 'possível',       errado: 'possivel',       tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Paroxítona terminada em "l" leva acento: possível.' },
    { correto: 'até',            errado: 'ate',            tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Oxítona terminada em "e" leva acento: até.' },
    { correto: 'também',         errado: 'tambem',         tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Oxítona terminada em "em" leva acento: também.' },
    { correto: 'está',           errado: 'esta',           tipo: 'acentuacao',    competencia: 'C1', explicacao: 'O verbo "estar" (está) leva acento para diferenciar do pronome demonstrativo "esta".' },
    { correto: 'públicas',       errado: 'publicas',       tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: públicas.' },
    { correto: 'econômica',      errado: 'economica',      tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: econômica.' },
    { correto: 'científica',     errado: 'cientifica',     tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: científica.' },
    { correto: 'pública',        errado: 'publica',        tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: pública.' },
    { correto: 'índice',         errado: 'indice',         tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: índice.' },
    { correto: 'difícil',        errado: 'dificil',        tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Paroxítona terminada em "l" leva acento: difícil.' },
    { correto: 'número',         errado: 'numero',         tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: número.' },
    { correto: 'própria',        errado: 'propria',        tipo: 'acentuacao',    competencia: 'C1', explicacao: 'Proparoxítona sempre leva acento: própria.' },

    // --- ORTOGRAFIA ---
    { correto: 'exceção',        errado: 'excessão',       tipo: 'ortografia',    competencia: 'C1', explicacao: 'Escreve-se com "ç": exceção (derivado de "exceto").' },
    { correto: 'análise',        errado: 'analise',        tipo: 'ortografia',    competencia: 'C1', explicacao: 'O substantivo "análise" leva acento. O verbo "analise" (subjuntivo) não leva.' },
    { correto: 'imprescindível', errado: 'imprecindível',  tipo: 'ortografia',    competencia: 'C1', explicacao: 'Escreve-se com "sc": imprescindível.' },
    { correto: 'através',        errado: 'atravez',        tipo: 'ortografia',    competencia: 'C1', explicacao: 'Escreve-se com "s" no final: através.' },
    { correto: 'benefício',      errado: 'benefico',       tipo: 'ortografia',    competencia: 'C1', explicacao: 'A palavra "benefício" leva acento no "i" e termina em "o".' },
    { correto: 'privilégio',     errado: 'previlégio',     tipo: 'ortografia',    competencia: 'C1', explicacao: 'Escreve-se com "i" na primeira sílaba: privilégio.' },
    { correto: 'assessoria',     errado: 'acessoria',      tipo: 'ortografia',    competencia: 'C1', explicacao: 'Assessoria leva dois "s" (de "assessor").' },
    { correto: 'ressaltar',      errado: 'resaltar',       tipo: 'ortografia',    competencia: 'C1', explicacao: 'Escreve-se com dois "s": ressaltar.' },
    { correto: 'desigualdade',   errado: 'dezigualdade',   tipo: 'ortografia',    competencia: 'C1', explicacao: 'O prefixo "des-" mantém o "s": desigualdade.' },
    { correto: 'conscientizar',  errado: 'consientizar',   tipo: 'ortografia',    competencia: 'C1', explicacao: 'Escreve-se com "sc": conscientizar (de "consciência").' },

    // --- CONCORDÂNCIA VERBAL ---
    { correto: 'existem',        errado: 'existe',         tipo: 'concordancia',  competencia: 'C1', explicacao: '"Existir" concorda com o sujeito no plural: existem problemas.' },
    { correto: 'fazem',          errado: 'faz',            tipo: 'concordancia',  competencia: 'C1', explicacao: 'Com sujeito plural, o verbo vai para o plural: eles fazem.' },
    { correto: 'foram',          errado: 'foi',            tipo: 'concordancia',  competencia: 'C1', explicacao: 'O verbo deve concordar com o sujeito plural: os dados foram.' },
    { correto: 'precisam',       errado: 'precisa',        tipo: 'concordancia',  competencia: 'C1', explicacao: 'Verbo concorda com sujeito plural: as políticas precisam.' },
    { correto: 'contribuem',     errado: 'contribui',      tipo: 'concordancia',  competencia: 'C1', explicacao: 'Verbo concorda com sujeito plural: as iniciativas contribuem.' },
    { correto: 'afetam',         errado: 'afeta',          tipo: 'concordancia',  competencia: 'C1', explicacao: 'Verbo concorda com sujeito plural: os problemas afetam.' },
    { correto: 'revelam',        errado: 'revela',         tipo: 'concordancia',  competencia: 'C1', explicacao: 'Verbo concorda com sujeito plural: os dados revelam.' },
    { correto: 'permanecem',     errado: 'permanece',      tipo: 'concordancia',  competencia: 'C1', explicacao: 'Verbo concorda com sujeito plural: os desafios permanecem.' },

    // --- CONCORDÂNCIA NOMINAL ---
    { correto: 'necessários',    errado: 'necessário',     tipo: 'concordancia',  competencia: 'C1', explicacao: 'O adjetivo concorda com o substantivo plural: recursos necessários.' },
    { correto: 'urgentes',       errado: 'urgente',        tipo: 'concordancia',  competencia: 'C1', explicacao: 'O adjetivo concorda com o substantivo plural: medidas urgentes.' },

    // --- PONTUAÇÃO / VÍRGULA ---
    { correto: 'Brasil,',        errado: 'Brasil',         tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Falta vírgula após adjunto adverbial de lugar deslocado.' },
    { correto: 'qualidade,',     errado: 'qualidade',      tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Vírgula necessária antes de conectivo explicativo.' },
    { correto: 'atualmente,',    errado: 'atualmente',     tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Adjunto adverbial deslocado para o início da oração deve ser isolado por vírgula.' },
    { correto: 'população,',     errado: 'população',      tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Vírgula necessária para separar orações coordenadas.' },
    { correto: 'portanto,',      errado: 'portanto',       tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Conectivo conclusivo no início da oração deve ser seguido de vírgula.' },
    { correto: 'ademais,',       errado: 'ademais',        tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Conectivo aditivo deslocado exige vírgula após ele.' },
    { correto: 'entretanto,',    errado: 'entretanto',     tipo: 'pontuacao',     competencia: 'C1', explicacao: 'Conectivo adversativo no início da oração deve ser seguido de vírgula.' },

    // --- REGÊNCIA VERBAL ---
    { correto: 'assistir aos',   errado: 'assistir os',    tipo: 'regencia',      competencia: 'C1', explicacao: '"Assistir" no sentido de ver exige preposição "a": assistir aos programas.' },
    { correto: 'ir ao',          errado: 'ir no',          tipo: 'regencia',      competencia: 'C1', explicacao: 'O verbo "ir" exige preposição "a" (ir ao lugar), não "em".' },

    // --- CRASE ---
    { correto: 'às',             errado: 'as',             tipo: 'crase',         competencia: 'C1', explicacao: 'Uso de crase obrigatório antes de substantivo feminino determinado: às vezes.' },
    { correto: 'à',              errado: 'a',              tipo: 'crase',         competencia: 'C1', explicacao: 'Crase obrigatória antes de palavra feminina determinada: à educação.' },
    { correto: 'à medida que',   errado: 'a medida que',   tipo: 'crase',         competencia: 'C1', explicacao: 'A locução "à medida que" sempre exige crase.' },

    // --- TEMPO VERBAL ---
    { correto: 'têm buscado',    errado: 'tem buscado',    tipo: 'tempo_verbal',  competencia: 'C1', explicacao: 'Com sujeito plural, o verbo auxiliar também fica no plural: têm buscado.' },
    { correto: 'é preciso',      errado: 'eram preciso',   tipo: 'tempo_verbal',  competencia: 'C1', explicacao: 'A expressão "é preciso" é impessoal e fica no singular, no presente.' }
];

// ── DICAS CONTEXTUAIS POR TIPO ─────────────────────────────────────────────────
const DICAS = {
    acentuacao: [
        '⚠️ Todas as proparoxítonas levam acento — sem exceção.',
        '⚠️ Verbos "ter" e "vir" na 3ª pessoa do plural levam acento circunflexo: têm, vêm.',
        '⚠️ Oxítonas terminadas em A, E, O (e seus plurais) levam acento.'
    ],
    concordancia: [
        '⚠️ O verbo sempre concorda com o sujeito em número e pessoa.',
        '⚠️ Sujeitos compostos levam o verbo para o plural.',
        '⚠️ "Haver" no sentido de "existir" é impessoal — fica sempre no singular.'
    ],
    crase: [
        '⚠️ Crase = preposição A + artigo A. Só ocorre antes de palavras femininas.',
        '⚠️ Dica: troque por palavra masculina. Se aparecer "AO", use crase.',
        '⚠️ Antes de verbo, pronome pessoal ou palavra masculina — não use crase.'
    ],
    ortografia: [
        '⚠️ Fique atento a palavras com "ss", "sc", "ç" — erros comuns em redações.',
        '⚠️ Derivadas de palavras com "s" tendem a manter o "s": assessor → assessoria.',
        '⚠️ Prefixos como "des-" e "re-" mantêm sua grafia original diante de vogais e consoantes.'
    ],
    pontuacao: [
        '⚠️ Adjuntos adverbiais deslocados para o início da oração exigem vírgula.',
        '⚠️ Conectivos como "portanto", "ademais" e "entretanto" devem ser seguidos de vírgula.',
        '⚠️ A vírgula separa orações coordenadas e elementos intercalados na frase.'
    ],
    regencia: [
        '⚠️ "Assistir" (ver/contemplar) é transitivo indireto: assistir a algo.',
        '⚠️ "Ir" exige a preposição "a", não "em": ir à escola, ir ao mercado.',
        '⚠️ Fique atento à regência dos verbos mais comuns usados em redações.'
    ],
    tempo_verbal: [
        '⚠️ O verbo auxiliar concorda com o sujeito, mesmo em locuções verbais.',
        '⚠️ Expressões impessoais ficam no singular: é preciso, é necessário.',
        '⚠️ Cuide da coerência temporal: não misture passado e presente sem razão.'
    ]
};

// ── TEXTOS PRONTOS (MODO DIGITAÇÃO) ────────────────────────────────────────────
// Pequenos trechos com erros embutidos, para o modo de digitação corretiva
const TEXTOS_DIGITACAO = [
    {
        titulo: 'Trecho: Educação Digital',
        dificuldade: 'Fácil',
        original: 'A educação brasileira enfrenta grandes desafios na era digital. Muitos alunos não tem acesso a computadores nas escolas publicas, o que dificulta a aprendizagem.',
        correto:  'A educação brasileira enfrenta grandes desafios na era digital. Muitos alunos não têm acesso a computadores nas escolas públicas, o que dificulta a aprendizagem.',
        erros_esperados: ['têm', 'públicas']
    },
    {
        titulo: 'Trecho: Meio Ambiente',
        dificuldade: 'Média',
        original: 'O desmatamento na Amazonia atingiu niveis alarmantes. É preciso que o governo fiscalize com rigor os crimes ambientais, pois a preservação do bioma benefica toda a humanidade.',
        correto:  'O desmatamento na Amazônia atingiu níveis alarmantes. É preciso que o governo fiscalize com rigor os crimes ambientais, pois a preservação do bioma beneficia toda a humanidade.',
        erros_esperados: ['Amazônia', 'níveis', 'beneficia']
    },
    {
        titulo: 'Trecho: Saúde Mental',
        dificuldade: 'Média',
        original: 'Os transtornos mentais afeta milhões de brasileiros atualmente. O estigma social ainda é muito forte, e muitas pessoas tem medo de buscar ajuda especializada.',
        correto:  'Os transtornos mentais afetam milhões de brasileiros atualmente. O estigma social ainda é muito forte, e muitas pessoas têm medo de buscar ajuda especializada.',
        erros_esperados: ['afetam', 'têm']
    }
];

// ── QUESTÕES MULTIPLA ESCOLHA ──────────────────────────────────────────────────
const QUESTOES_MULTIPLA = [
    {
        enunciado: 'Qual alternativa preenche corretamente a lacuna: "Os programas sociais ___ contribuído para reduzir a pobreza."',
        opcoes: ['tem', 'têm', 'teem', 'tenho'],
        correta: 1,
        explicacao: 'Com sujeito plural ("os programas"), o verbo "ter" vai para o plural e recebe acento circunflexo: têm.'
    },
    {
        enunciado: 'Identifique o erro de concordância: "A maioria dos estudantes não tem acesso à internet de qualidade."',
        opcoes: [
            'Não há erro; a frase está correta.',
            '"maioria" deveria ser "maioria".',
            'O verbo "tem" deveria ser "têm".',
            '"acesso" deveria ser "acessos".'
        ],
        correta: 0,
        explicacao: 'Com "a maioria de + substantivo plural", o verbo pode ficar no singular concordando com o núcleo "maioria". A frase está correta.'
    },
    {
        enunciado: 'Em qual opção o uso da crase está correto?',
        opcoes: [
            'Ele foi à pé para a escola.',
            'Ela se referiu à mesa.',
            'O texto alude à um fato histórico.',
            'Isso é devido à ele.'
        ],
        correta: 1,
        explicacao: '"Referiu-se a + a mesa = à mesa." Não se usa crase antes de palavras masculinas, verbos ou pronomes pessoais.'
    },
    {
        enunciado: 'Qual frase apresenta erro de acentuação?',
        opcoes: [
            'A saúde pública precisa de mais recursos.',
            'Os países emergentes crescem rapidamente.',
            'O número de desempregados aumentou.',
            'A analise foi realizada com cuidado.'
        ],
        correta: 3,
        explicacao: '"Analise" (substantivo) deve ser escrito com acento: "análise". Sem acento, "analise" é verbo (3ª pessoa do subjuntivo).'
    },
    {
        enunciado: 'Assinale a alternativa em que a pontuação está correta.',
        opcoes: [
            'Portanto é necessário investir em educação.',
            'Portanto, é necessário investir em educação.',
            'Portanto é necessário, investir em educação.',
            'Portanto é, necessário investir em educação.'
        ],
        correta: 1,
        explicacao: 'Conectivos conclusivos como "portanto" deslocados para o início da oração devem ser seguidos de vírgula.'
    },
    {
        enunciado: 'Qual verbo preenche corretamente a frase: "Os dados ___ que o problema persiste."',
        opcoes: ['revela', 'revelam', 'revelava', 'revelar'],
        correta: 1,
        explicacao: 'O verbo concorda com o sujeito "os dados" (plural, 3ª pessoa): revelam.'
    },
    {
        enunciado: 'Assinale a grafia correta:',
        opcoes: ['excessão', 'exceção', 'execeção', 'exeção'],
        correta: 1,
        explicacao: '"Exceção" deriva de "exceto" e se escreve com "ç", sem duplo "s".'
    },
    {
        enunciado: 'Em qual frase o uso de "há" está correto?',
        opcoes: [
            'Há dois anos atrás, o índice era menor.',
            'Há muitos problemas a serem resolvidos.',
            'Trabalho aqui há dois anos atrás.',
            'Há muito tempo que não a vejo há dias.'
        ],
        correta: 1,
        explicacao: '"Há" é usado para indicar existência ou tempo passado. "Há muitos problemas" = existem muitos problemas. "Há dois anos atrás" é redundante (o correto seria apenas "há dois anos").'
    },
    {
        enunciado: 'Qual das opções preenche corretamente: "É imprescindível ___ cidadania plena."',
        opcoes: ['garantir a', 'garantir à', 'garantir as', 'garantir às'],
        correta: 0,
        explicacao: 'Não se usa crase antes de substantivo feminino sem artigo definido. O correto é "garantir a cidadania" (sem crase, pois "cidadania" aqui não tem artigo).'
    },
    {
        enunciado: 'Qual frase apresenta erro de ortografia?',
        opcoes: [
            'A conscientização é fundamental.',
            'O privilégio de poucos gera desigualdade.',
            'O governo deve ressaltar as conquistas sociais.',
            'A dezigualdade persiste em todo o país.'
        ],
        correta: 3,
        explicacao: 'O correto é "desigualdade", com "s" — o prefixo "des-" mantém essa grafia diante de vogal.'
    }
];

// ── UTILITÁRIOS ────────────────────────────────────────────────────────────────
const rand  = (arr, excluir = []) => {
    const pool = arr.filter(i => !excluir.includes(i));
    return pool[Math.floor(Math.random() * pool.length)];
};
const el    = id  => document.getElementById(id);
const hide  = id  => el(id)?.classList.add('hidden');
const show  = id  => el(id)?.classList.remove('hidden');
const setText = (id, val) => { const e = el(id); if (e) e.textContent = val; };

// ── PERSISTÊNCIA ──────────────────────────────────────────────────────────────
function salvar() {
    try {
        localStorage.setItem('sawEnem2026', JSON.stringify({
            historico: STATE.historico,
            nivel:     STATE.nivel,
            xp:        STATE.xp,
            sequencia: STATE.sequencia
        }));
    } catch(e) { /* storage indisponível */ }
}

function carregar() {
    try {
        const raw = localStorage.getItem('sawEnem2026');
        if (!raw) return;
        const d = JSON.parse(raw);
        STATE.historico = d.historico || [];
        STATE.nivel     = Math.min(d.nivel || 1, 5);
        STATE.xp        = d.xp        || 0;
        STATE.sequencia = d.sequencia  || 0;
        atualizarUI();
    } catch(e) { /* dados corrompidos */ }
}

// ── NOTIFICAÇÕES ───────────────────────────────────────────────────────────────
function notificar(msg, tipo = 'info') {
    const container = el('notificacoes-container');
    if (!container) return;
    const tipos = { success: 'sucesso', warning: 'aviso', error: 'erro' };
    const div = document.createElement('div');
    div.className  = `notificacao ${tipos[tipo] || tipo}`;
    div.textContent = msg;
    container.appendChild(div);
    setTimeout(() => {
        div.classList.add('saindo');
        setTimeout(() => div.remove(), 380);
    }, 3200);
}

// ── SISTEMA DE ABAS ────────────────────────────────────────────────────────────
function ativarAba(tabName) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `panel-${tabName}`);
    });
    document.querySelectorAll('.nav-drawer-item').forEach(item => {
        const ativo = item.dataset.tab === tabName;
        item.classList.toggle('active', ativo);
        item.setAttribute('aria-selected', ativo);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window._abaAtiva = tabName;
}

// ── MENU DRAWER ────────────────────────────────────────────────────────────────
function abrirMenu() {
    const drawer  = el('nav-drawer');
    const overlay = el('nav-drawer-overlay');
    const btnMenu = el('btn-open-menu');
    if (!drawer || !overlay) return;
    drawer.classList.add('aberto');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('visivel');
    overlay.setAttribute('aria-hidden', 'false');
    if (btnMenu) btnMenu.setAttribute('aria-expanded', 'true');
    setTimeout(() => drawer.querySelector('.nav-drawer-close')?.focus(), 50);
}

function fecharMenu() {
    const drawer  = el('nav-drawer');
    const overlay = el('nav-drawer-overlay');
    const btnMenu = el('btn-open-menu');
    if (!drawer || !overlay) return;
    drawer.classList.remove('aberto');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('visivel');
    overlay.setAttribute('aria-hidden', 'true');
    if (btnMenu) { btnMenu.setAttribute('aria-expanded', 'false'); btnMenu.focus(); }
}

// ── BUSCA ──────────────────────────────────────────────────────────────────────
const BUSCA_INDEX = [
    { termo: 'início home começo',                                  aba: 'inicio',        label: 'Início' },
    { termo: 'competências c1 c2 c3 c4 c5 gramática norma',         aba: 'competencias',  label: 'Competências' },
    { termo: 'dicas conectivos coesão portanto ademais entretanto',  aba: 'dicas',         label: 'Dicas & Conectivos' },
    { termo: 'temas assuntos educação meio ambiente saúde violência', aba: 'temas',         label: 'Temas' },
    { termo: 'acessibilidade fonte contraste cursor leitor',          aba: 'acessibilidade',label: 'Acessibilidade' },
    { termo: 'praticar exercício redação jogo treinar cacador',       aba: 'pratica',       label: '🌾 Praticar Agora' },
];

function toggleBusca() {
    const bar = el('navbar-search-bar');
    if (!bar) return;
    const abrindo = !bar.classList.contains('aberta');
    bar.classList.toggle('aberta', abrindo);
    bar.setAttribute('aria-hidden', !abrindo);
    if (abrindo) {
        setTimeout(() => el('search-input')?.focus(), 200);
    } else {
        el('search-results').innerHTML = '';
        el('search-input').value = '';
    }
}

function realizarBusca(query) {
    const q = query.toLowerCase().trim();
    const resultsEl = el('search-results');
    if (!resultsEl) return;
    if (!q) { resultsEl.innerHTML = ''; return; }

    const resultados = BUSCA_INDEX.filter(item =>
        item.termo.toLowerCase().includes(q) || item.label.toLowerCase().includes(q)
    );

    if (!resultados.length) {
        resultsEl.innerHTML = `<p class="search-result-item" style="cursor:default;color:#5a8a5a">Nenhum resultado encontrado.</p>`;
        return;
    }

    resultsEl.innerHTML = resultados.map(r => `
        <div class="search-result-item" role="listitem"
             onclick="ativarAba('${r.aba}'); toggleBusca();" tabindex="0">
            <span>${r.label}</span>
            <span class="search-result-tab">${r.aba}</span>
        </div>
    `).join('');
}

// =============================================================================
//  SEÇÃO PRATICAR AGORA — NÚCLEO EXPANDIDO
// =============================================================================

// Controle de tempo para bônus de velocidade
let _tempoInicioPratica = null;

// ── SELEÇÃO DE MODO ────────────────────────────────────────────────────────────
function selecionarModo(modo) {
    STATE.modoAtivo = modo;

    // Atualiza visual dos botões de modo
    document.querySelectorAll('.modo-btn').forEach(btn => {
        btn.classList.toggle('modo-btn-ativo', btn.dataset.modo === modo);
    });

    // Esconde painéis de resultado e redação
    hide('redacao-container');
    hide('resultado-container');
    hide('painel-multipla');
    hide('painel-digitacao');

    // Mostra painel de config se for modo caçador
    const cfgArea = el('area-config-cacador');
    if (cfgArea) cfgArea.style.display = modo === 'cacador' ? '' : 'none';

    // Inicializa o modo selecionado
    if (modo === 'multipla')  iniciarMultipla();
    if (modo === 'digitacao') iniciarDigitacao();
}

// ── MODO CAÇADOR DE ERROS (geração procedural) ─────────────────────────────────
function gerarRedacao() {
    STATE.nome = el('nome-usuario')?.value.trim();
    if (!STATE.nome) {
        notificar('Diga seu nome antes de entrar no jogo.', 'warning');
        return;
    }

    const sel  = el('tema-select')?.value;
    const keys = Object.keys(TEMAS);
    const key  = sel === 'aleatorio' ? rand(keys) : sel;
    const tema = TEMAS[key];
    if (!tema) return;

    // Monta 4 parágrafos: intro, 2 de desenvolvimento, conclusão
    const intro = rand(tema.introducao);
    const d1    = rand(tema.desenvolvimento);
    const d2    = rand(tema.desenvolvimento, [d1]);
    const d3    = rand(tema.desenvolvimento, [d1, d2]);
    const conc  = rand(tema.conclusao);

    // Quantidade de erros por parágrafo (aumenta por dificuldade)
    const qtdErros = tema.dificuldade === 'Difícil' ? 3 : tema.dificuldade === 'Média' ? 2 : 1;

    STATE.redacao = {
        titulo:      tema.titulo,
        dificuldade: tema.dificuldade,
        competencia: tema.competencia,
        paragrafos:  [intro, `${d1} ${d2}`, d3, conc].map(txt => montarParagrafo(txt, qtdErros)),
        erros:       []
    };

    STATE.errosIdentif = [];
    _tempoInicioPratica = Date.now();
    renderizarRedacao();
    show('redacao-container');
    hide('resultado-container');
    notificar(`🎯 Jogo iniciado! Tema: ${tema.titulo}`, 'success');
}

// ── INSERIR ERROS NO TEXTO ─────────────────────────────────────────────────────
function montarParagrafo(texto, qtd) {
    const palavras = texto.split(' ');
    // Embaralha o banco de erros para variedade
    const pool = [...ERROS].sort(() => Math.random() - 0.5);
    const errosInseridos = [];

    for (const erro of pool) {
        if (errosInseridos.length >= qtd) break;
        for (let j = 0; j < palavras.length; j++) {
            // Remove pontuação da palavra para comparar
            const limpa = palavras[j].replace(/[,.:;!?]/g, '');
            const jaUsado = errosInseridos.some(e => e.idx === j);
            if (!jaUsado && limpa.toLowerCase() === erro.correto.toLowerCase()) {
                // Preserva pontuação ao substituir
                const pont = palavras[j].match(/[,.:;!?]+$/);
                palavras[j] = erro.errado + (pont ? pont[0] : '');
                errosInseridos.push({
                    idx:       j,
                    id:        `e${Date.now()}${j}`,
                    correto:   erro.correto,
                    errado:    erro.errado,
                    explicacao: erro.explicacao,
                    competencia: erro.competencia,
                    tipo:      erro.tipo
                });
                break;
            }
        }
    }

    return { palavras, erros: errosInseridos };
}

// ── RENDERIZAR REDAÇÃO ─────────────────────────────────────────────────────────
function renderizarRedacao() {
    const r = STATE.redacao;
    const c = el('texto-redacao');
    if (!c) return;

    r.erros = [];
    let html = '';

    r.paragrafos.forEach((par, pi) => {
        html += '<p class="texto-redacao-paragrafo">';
        par.palavras.forEach((palavra, wi) => {
            const erro = par.erros.find(e => e.idx === wi);
            if (erro) {
                r.erros.push({ ...erro, paragrafo: pi });
                html += `<span class="palavra-erro" id="${erro.id}"
                               role="button" tabindex="0"
                               aria-label="Palavra suspeita: ${palavra}"
                               onclick="marcarPalavra('${erro.id}')"
                               onkeydown="if(event.key==='Enter'||event.key===' ')marcarPalavra('${erro.id}')"
                         >${palavra}</span> `;
            } else {
                html += `<span>${palavra}</span> `;
            }
        });
        html += '</p>';
    });

    const badges = {
        'Fácil':  'badge-success',
        'Média':  'badge-warning',
        'Difícil':'badge-error'
    };

    c.innerHTML = `
        <div class="redacao-meta" style="margin-bottom:1.5rem;">
            <span class="meta-item">📊 Dificuldade: <strong>${r.dificuldade}</strong></span>
            <span class="meta-item">🎯 Competências: <strong>${r.competencia}</strong></span>
            <span class="meta-item">💀 Armadilhas: <strong>${r.erros.length}</strong></span>
        </div>
        ${html}`;
}

// ── MARCAR / DESMARCAR PALAVRA ─────────────────────────────────────────────────
function marcarPalavra(id) {
    const elem = el(id);
    if (!elem || elem.classList.contains('erro-acerto') || elem.classList.contains('erro-perdido')) return;

    if (STATE.errosIdentif.includes(id)) {
        STATE.errosIdentif = STATE.errosIdentif.filter(x => x !== id);
        elem.classList.remove('palavra-clicada');
    } else {
        STATE.errosIdentif.push(id);
        elem.classList.add('palavra-clicada');
    }

    // Feedback visual no contador (se existir)
    const contador = el('marcacoes-contador');
    if (contador) contador.textContent = STATE.errosIdentif.length;
}

// ── FINALIZAR ANÁLISE (MODO CAÇADOR) ──────────────────────────────────────────
function finalizarAnalise() {
    if (!STATE.redacao) return;
    if (!STATE.errosIdentif.length) {
        notificar('Você não marcou nenhuma armadilha. Observe o texto com cuidado.', 'warning');
        return;
    }

    const total    = STATE.redacao.erros.length;
    const acertos  = STATE.errosIdentif.filter(id => STATE.redacao.erros.some(e => e.id === id)).length;
    const perdidos = STATE.redacao.erros.filter(e => !STATE.errosIdentif.includes(e.id));
    const pct      = Math.round((acertos / total) * 100);

    // Calcula XP com possíveis bônus
    let xpGanho = acertos * XP_POR_ERRO;
    const tempoDecorrido = _tempoInicioPratica ? (Date.now() - _tempoInicioPratica) / 1000 : Infinity;

    if (pct === 100) {
        xpGanho += BONUS_PERF;
        STATE.sequencia++;
        notificar('🎭 ANÁLISE PERFEITA! Bônus de 50 XP concedido.', 'success');
        if (tempoDecorrido < 60) {
            xpGanho += BONUS_RAPIDO;
            notificar(`⚡ Resposta rápida! +${BONUS_RAPIDO} XP extra.`, 'success');
        }
    } else {
        STATE.sequencia = 0;
    }
    STATE.xp += xpGanho;

    // Subida de nível
    while (STATE.xp >= XP_POR_NIVEL * STATE.nivel && STATE.nivel < 5) {
        STATE.nivel++;
        notificar(`⛓️ NÍVEL ${STATE.nivel}: ${NIVEIS[STATE.nivel].titulo}`, 'success');
    }

    // Registra no histórico
    STATE.historico.push({
        data:    new Date().toLocaleDateString('pt-BR'),
        tema:    STATE.redacao.titulo,
        modo:    'Caçador',
        acertos, total, pct, xpGanho
    });

    salvar();
    atualizarUI();
    destacarErros(
        STATE.errosIdentif.filter(id => STATE.redacao.erros.some(e => e.id === id)),
        perdidos
    );
    exibirResultado(acertos, total, pct, perdidos, xpGanho);
    el('resultado-container')?.scrollIntoView({ behavior: 'smooth' });
}

// ── DESTACAR ERROS NO TEXTO APÓS FINALIZAR ─────────────────────────────────────
function destacarErros(corretos, perdidos) {
    corretos.forEach(id => {
        const elem = el(id);
        if (elem) { elem.classList.remove('palavra-erro', 'palavra-clicada'); elem.classList.add('erro-acerto'); }
    });
    perdidos.forEach(e => {
        const elem = el(e.id);
        if (elem) { elem.classList.remove('palavra-erro'); elem.classList.add('erro-perdido'); }
    });
}

// ── EXIBIR RESULTADO (MODO CAÇADOR) ───────────────────────────────────────────
function exibirResultado(acertos, total, pct, perdidos, xpGanho) {
    const msgs = [
        [90, '🎭 Quase me impressionou.'],
        [70, '⛓️ Sobreviveu, por enquanto.'],
        [50, '🩸 Não é suficiente para viver.'],
        [ 0, '💀 Você falhou no teste.']
    ];
    const [, frase] = msgs.find(([min]) => pct >= min);

    el('resultado-pontuacao').innerHTML = `
        <div class="pontuacao-valor">${pct}%</div>
        <p class="pontuacao-mensagem">${frase}</p>
        <p class="pontuacao-detalhes">${acertos} de ${total} armadilhas encontradas — ${STATE.nome}</p>
        <p class="pontuacao-xp">+${xpGanho} XP absorvidos</p>
        ${STATE.sequencia > 1 ? `<p class="pontuacao-bonus">🔥 Sequência perfeita: ${STATE.sequencia}x</p>` : ''}
    `;

    let html = '';

    // Detalhamento dos acertos
    if (acertos > 0) {
        html += '<div class="secao-detalhes"><h5>✅ Armadilhas Identificadas</h5>';
        STATE.redacao.erros
            .filter(e => STATE.errosIdentif.includes(e.id))
            .forEach(e => {
                html += `
                    <div class="erro-item">
                        <p class="erro-titulo">
                            <s>${e.errado}</s> → <strong>${e.correto}</strong>
                            <span class="badge badge-success">${e.competencia}</span>
                            <span class="badge badge-tipo">${_nomeTipoErro(e.tipo)}</span>
                        </p>
                        <p class="erro-explicacao">${e.explicacao}</p>
                    </div>`;
            });
        html += '</div>';
    }

    // Detalhamento dos erros perdidos
    if (perdidos.length > 0) {
        html += '<div class="secao-detalhes"><h5>💀 Armadilhas Que Você Não Viu</h5>';
        perdidos.forEach(e => {
            html += `
                <div class="erro-item">
                    <p class="erro-titulo">
                        <s>${e.errado}</s> → <strong>${e.correto}</strong>
                        <span class="badge badge-pending">${e.competencia}</span>
                        <span class="badge badge-tipo">${_nomeTipoErro(e.tipo)}</span>
                    </p>
                    <p class="erro-explicacao">${e.explicacao}</p>
                </div>`;
        });
        html += '</div>';

        // Dica contextual baseada no tipo de erro mais frequente
        const tipoFrequente = _tipoMaisFrequente(perdidos);
        if (DICAS[tipoFrequente]) {
            html += `<div class="alert alert-warning"><span>${rand(DICAS[tipoFrequente])}</span></div>`;
        }
    }

    el('resultado-detalhes').innerHTML = html;
    show('resultado-container');
}

// ── MODO MÚLTIPLA ESCOLHA ──────────────────────────────────────────────────────
let _questaoAtual   = 0;
let _questoesRodada = [];
let _acertosMultipla = 0;

function iniciarMultipla() {
    show('painel-multipla');
    hide('redacao-container');
    hide('resultado-container');

    // Embaralha e seleciona 5 questões aleatórias
    _questoesRodada = [...QUESTOES_MULTIPLA].sort(() => Math.random() - 0.5).slice(0, 5);
    _questaoAtual   = 0;
    _acertosMultipla = 0;
    _tempoInicioPratica = Date.now();

    renderizarQuestao();
}

function renderizarQuestao() {
    const painel = el('painel-multipla');
    if (!painel) return;

    if (_questaoAtual >= _questoesRodada.length) {
        encerrarMultipla();
        return;
    }

    const q    = _questoesRodada[_questaoAtual];
    const prog = `${_questaoAtual + 1} / ${_questoesRodada.length}`;

    painel.innerHTML = `
        <div class="multipla-header">
            <span class="multipla-progresso">Questão ${prog}</span>
            <div class="multipla-barra-prog">
                <div class="multipla-barra-fill" style="width:${((_questaoAtual) / _questoesRodada.length) * 100}%"></div>
            </div>
        </div>
        <div class="multipla-card">
            <p class="multipla-enunciado">${q.enunciado}</p>
            <div class="multipla-opcoes" id="opcoes-container">
                ${q.opcoes.map((op, i) => `
                    <button class="multipla-opcao" onclick="responderMultipla(${i})" id="opcao-${i}">
                        <span class="opcao-letra">${String.fromCharCode(65 + i)}</span>
                        <span class="opcao-texto">${op}</span>
                    </button>
                `).join('')}
            </div>
            <div id="feedback-multipla" class="multipla-feedback hidden"></div>
        </div>
    `;
}

function responderMultipla(indice) {
    const q = _questoesRodada[_questaoAtual];
    const correta = q.correta;
    const feedback = el('feedback-multipla');

    // Desabilita todos os botões
    document.querySelectorAll('.multipla-opcao').forEach((btn, i) => {
        btn.disabled = true;
        if (i === correta) btn.classList.add('opcao-correta');
        if (i === indice && i !== correta) btn.classList.add('opcao-errada');
    });

    const acertou = indice === correta;
    if (acertou) _acertosMultipla++;

    if (feedback) {
        feedback.classList.remove('hidden');
        feedback.className = `multipla-feedback ${acertou ? 'feedback-correto' : 'feedback-errado'}`;
        feedback.innerHTML = `
            <strong>${acertou ? '✅ Correto!' : '❌ Incorreto.'}</strong>
            <span>${q.explicacao}</span>
        `;
    }

    // Avança automaticamente após 2.5s
    setTimeout(() => {
        _questaoAtual++;
        renderizarQuestao();
    }, 2600);
}

function encerrarMultipla() {
    const total  = _questoesRodada.length;
    const pct    = Math.round((_acertosMultipla / total) * 100);
    const xp     = _acertosMultipla * XP_POR_ERRO;

    STATE.xp += xp;
    while (STATE.xp >= XP_POR_NIVEL * STATE.nivel && STATE.nivel < 5) {
        STATE.nivel++;
        notificar(`⛓️ NÍVEL ${STATE.nivel}: ${NIVEIS[STATE.nivel].titulo}`, 'success');
    }

    STATE.historico.push({
        data:    new Date().toLocaleDateString('pt-BR'),
        tema:    'Múltipla Escolha',
        modo:    'Múltipla',
        acertos: _acertosMultipla,
        total, pct, xpGanho: xp
    });
    salvar();
    atualizarUI();

    const painel = el('painel-multipla');
    if (painel) {
        const msgs = [
            [90, '🎭 Conhecimento exemplar.'],
            [70, '⚔️ Desempenho aceitável.'],
            [50, '🩸 Precisa revisar mais.'],
            [ 0, '💀 Retorne aos estudos.']
        ];
        const [, frase] = msgs.find(([min]) => pct >= min);
        painel.innerHTML = `
            <div class="multipla-resultado">
                <div class="pontuacao-valor">${pct}%</div>
                <p class="pontuacao-mensagem">${frase}</p>
                <p class="pontuacao-detalhes">${_acertosMultipla} de ${total} questões corretas — +${xp} XP</p>
                <button class="btn btn-primary" onclick="iniciarMultipla()" style="margin-top:1.5rem;">
                    🔄 Nova Rodada
                </button>
            </div>
        `;
    }
}

// ── MODO DIGITAÇÃO CORRETIVA ───────────────────────────────────────────────────
let _textoDigitacaoAtual = null;

function iniciarDigitacao() {
    show('painel-digitacao');
    hide('redacao-container');
    hide('resultado-container');

    _textoDigitacaoAtual = _questoesRodada = rand(TEXTOS_DIGITACAO);
    _tempoInicioPratica  = Date.now();
    renderizarDigitacao();
}

function renderizarDigitacao() {
    const painel = el('painel-digitacao');
    if (!painel || !_textoDigitacaoAtual) return;

    const t = _textoDigitacaoAtual;

    painel.innerHTML = `
        <div class="digitacao-card">
            <div class="digitacao-header">
                <h4 class="digitacao-titulo">${t.titulo}</h4>
                <span class="badge badge-warning">${t.dificuldade}</span>
            </div>
            <p class="digitacao-instrucao">
                📝 O trecho abaixo contém erros gramaticais. Reescreva-o corretamente no campo abaixo.
            </p>
            <div class="digitacao-original">
                <span class="digitacao-label">Texto com erros:</span>
                <p>${t.original}</p>
            </div>
            <div class="form-group">
                <label class="form-label" for="campo-digitacao">Sua versão corrigida:</label>
                <textarea id="campo-digitacao" class="form-input" rows="4"
                    placeholder="Reescreva o trecho acima, corrigindo os erros que encontrar..."
                    style="resize:vertical; font-size:1rem; line-height:1.7;"
                ></textarea>
            </div>
            <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="verificarDigitacao()">✅ Verificar Correção</button>
                <button class="btn btn-secondary" onclick="iniciarDigitacao()">🔄 Outro Texto</button>
            </div>
            <div id="feedback-digitacao" class="hidden" style="margin-top:1.5rem;"></div>
        </div>
    `;
}

function verificarDigitacao() {
    const campo = el('campo-digitacao');
    const feedback = el('feedback-digitacao');
    if (!campo || !feedback || !_textoDigitacaoAtual) return;

    const resposta = campo.value.trim();
    if (!resposta) { notificar('Digite sua versão corrigida antes de verificar.', 'warning'); return; }

    const t = _textoDigitacaoAtual;
    // Verifica quais palavras-chave corretas aparecem na resposta do usuário
    const acertos = t.erros_esperados.filter(palavra =>
        resposta.toLowerCase().includes(palavra.toLowerCase())
    );
    const total    = t.erros_esperados.length;
    const pct      = Math.round((acertos.length / total) * 100);
    const xp       = acertos.length * XP_POR_ERRO;

    STATE.xp += xp;
    while (STATE.xp >= XP_POR_NIVEL * STATE.nivel && STATE.nivel < 5) {
        STATE.nivel++;
        notificar(`⛓️ NÍVEL ${STATE.nivel}: ${NIVEIS[STATE.nivel].titulo}`, 'success');
    }
    STATE.historico.push({
        data:    new Date().toLocaleDateString('pt-BR'),
        tema:    t.titulo,
        modo:    'Digitação',
        acertos: acertos.length,
        total, pct, xpGanho: xp
    });
    salvar();
    atualizarUI();

    feedback.classList.remove('hidden');
    feedback.innerHTML = `
        <div class="resultado-pontuacao" style="padding:1.5rem;">
            <div class="pontuacao-valor" style="font-size:2.5rem;">${pct}%</div>
            <p class="pontuacao-detalhes">${acertos.length} de ${total} correções aplicadas</p>
            <p class="pontuacao-xp">+${xp} XP</p>
        </div>
        <div class="secao-detalhes" style="margin-top:1rem;">
            <h5>📋 Gabarito</h5>
            <div class="digitacao-gabarito">
                <span class="digitacao-label">Versão correta:</span>
                <p style="color:var(--text-main);line-height:1.7;">${_destacarCorrecoes(t.correto, t.erros_esperados)}</p>
            </div>
            <div style="margin-top:1rem;">
                ${t.erros_esperados.map(p => {
                    const acertou = acertos.includes(p);
                    return `<span class="badge ${acertou ? 'badge-success' : 'badge-pending'}" style="margin:0.25rem;">
                        ${acertou ? '✅' : '❌'} ${p}
                    </span>`;
                }).join('')}
            </div>
        </div>
        <button class="btn btn-secondary" onclick="iniciarDigitacao()" style="margin-top:1rem;">🔄 Próximo Texto</button>
    `;
    campo.disabled = true;
}

// Destaca as palavras corrigidas no gabarito
function _destacarCorrecoes(texto, palavras) {
    let resultado = texto;
    palavras.forEach(p => {
        const regex = new RegExp(`(${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        resultado = resultado.replace(regex, `<mark style="background:rgba(16,185,129,0.2);color:#34d399;border-radius:3px;padding:0 2px;">$1</mark>`);
    });
    return resultado;
}

// ── DICA RÁPIDA ────────────────────────────────────────────────────────────────
function mostrarDica() {
    if (!STATE.redacao) return;
    const qtd  = STATE.redacao.erros.length;
    const tipos = [...new Set(STATE.redacao.erros.map(e => e.tipo))];
    const tipoStr = tipos.map(_nomeTipoErro).join(', ');
    notificar(`🎭 ${qtd} armadilha${qtd !== 1 ? 's' : ''} escondida${qtd !== 1 ? 's' : ''}. Tipos: ${tipoStr}.`, 'info');
}

// ── REINICIAR PRÁTICA ──────────────────────────────────────────────────────────
function reiniciarPratica() {
    STATE.redacao      = null;
    STATE.errosIdentif = [];
    hide('redacao-container');
    hide('resultado-container');
    el('area-pratica')?.scrollIntoView({ behavior: 'smooth' });
}

// ── HELPERS DE TIPO ────────────────────────────────────────────────────────────
function _nomeTipoErro(tipo) {
    const nomes = {
        acentuacao:   'Acentuação',
        ortografia:   'Ortografia',
        concordancia: 'Concordância',
        pontuacao:    'Pontuação',
        regencia:     'Regência',
        crase:        'Crase',
        tempo_verbal: 'Tempo Verbal'
    };
    return nomes[tipo] || tipo || '?';
}

function _tipoMaisFrequente(erros) {
    if (!erros.length) return null;
    const contagem = {};
    erros.forEach(e => { contagem[e.tipo] = (contagem[e.tipo] || 0) + 1; });
    return Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0];
}

// ── UI: NÍVEL & BARRA DE XP ────────────────────────────────────────────────────
function atualizarUI() {
    const nivel     = NIVEIS[STATE.nivel];
    const xpNivel   = XP_POR_NIVEL * STATE.nivel;
    const xpParcial = STATE.xp % xpNivel;
    const progresso = Math.round((xpParcial / xpNivel) * 100);

    setText('nivel-numero',    STATE.nivel);
    setText('nivel-titulo',    nivel.titulo);
    setText('xp-atual',        STATE.xp);
    setText('xp-total',        xpNivel);
    setText('sequencia-atual', STATE.sequencia);

    const barra = el('xp-barra');
    if (barra) barra.style.width = `${progresso}%`;

    atualizarHistoricoUI();
}

function atualizarHistoricoUI() {
    const cont = el('historico-container');
    if (!cont || !STATE.historico.length) return;

    const rows = STATE.historico.slice(-5).reverse().map(p => `
        <tr>
            <td>${p.data}</td>
            <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.tema}</td>
            <td>${p.modo || '—'}</td>
            <td>${p.acertos}/${p.total}</td>
            <td><strong>${p.pct}%</strong></td>
            <td>+${p.xpGanho}</td>
        </tr>`).join('');

    cont.innerHTML = `
        <div class="table-responsive">
            <table class="table-cronograma">
                <thead>
                    <tr><th>Data</th><th>Tema</th><th>Modo</th><th>Acertos</th><th>%</th><th>XP</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <p class="historico-total">${STATE.historico.length} práticas realizadas</p>`;
}

// =============================================================================
//  EFEITOS VISUAIS
// =============================================================================
function iniciarGotasDeSangue() {
    const container = document.createElement('div');
    container.id = 'gotas-container';
    container.setAttribute('aria-hidden', 'true');
    Object.assign(container.style, {
        position: 'fixed', top: '0', left: '0',
        width: '100%', height: '100vh',
        pointerEvents: 'none', zIndex: '1', overflow: 'hidden'
    });
    document.body.appendChild(container);

    const gotas   = ['💀', '🩸', '⛓️'];
    const criarGota = () => {
        const g    = document.createElement('span');
        g.textContent = gotas[Math.floor(Math.random() * gotas.length)];
        const size = 12 + Math.random() * 14;
        const dur  =  7 + Math.random() * 6;
        Object.assign(g.style, {
            position:       'absolute',
            top:            '-40px',
            left:           Math.random() * 100 + '%',
            fontSize:       size + 'px',
            opacity:        (0.05 + Math.random() * 0.08).toFixed(2),
            animation:      `quedaGota ${dur}s linear forwards`,
            animationDelay: (Math.random() * 2) + 's',
            pointerEvents:  'none'
        });
        container.appendChild(g);
        setTimeout(() => g.remove(), (dur + 3) * 1000);
    };

    for (let i = 0; i < 12; i++) setTimeout(criarGota, i * 700);
    setInterval(criarGota, 4000);
}

function injetarKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quedaGota {
            0%   { transform: translateY(0) rotate(0deg);       opacity: inherit; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .modo-btn-ativo {
            border-color: var(--primary) !important;
            color: var(--primary) !important;
            background: rgba(99,102,241,0.1) !important;
        }
        .multipla-header { margin-bottom: 1.5rem; }
        .multipla-progresso { font-size: 0.875rem; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 0.5rem; }
        .multipla-barra-prog { width: 100%; height: 5px; background: var(--bg-base); border-radius: 999px; overflow: hidden; }
        .multipla-barra-fill { height: 100%; background: var(--primary); border-radius: 999px; transition: width 0.4s ease; }
        .multipla-card { background: var(--bg-base); border: 1px solid var(--border-light); border-radius: var(--r-lg); padding: 2rem; }
        .multipla-enunciado { font-size: 1.0625rem; color: var(--text-main); margin-bottom: 1.5rem; line-height: 1.7; }
        .multipla-opcoes { display: flex; flex-direction: column; gap: 0.75rem; }
        .multipla-opcao {
            display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.25rem;
            background: var(--bg-surface); border: 1.5px solid var(--border-light);
            border-radius: var(--r-md); cursor: pointer; text-align: left;
            color: var(--text-main); font-family: var(--font-sans); font-size: 0.9375rem;
            transition: all 160ms cubic-bezier(0.16,1,0.3,1);
        }
        .multipla-opcao:not(:disabled):hover { border-color: var(--primary); background: rgba(99,102,241,0.06); }
        .multipla-opcao:disabled { cursor: default; }
        .opcao-letra { font-family: var(--font-display); font-weight: 700; color: var(--primary); min-width: 1.5rem; }
        .opcao-texto { flex: 1; line-height: 1.5; }
        .opcao-correta { border-color: var(--accent) !important; background: rgba(16,185,129,0.1) !important; }
        .opcao-errada  { border-color: var(--error)  !important; background: rgba(239,68,68,0.1)  !important; }
        .multipla-feedback { padding: 1rem 1.25rem; border-radius: var(--r-md); margin-top: 1rem; font-size: 0.9375rem; display: flex; gap: 0.75rem; align-items: flex-start; }
        .feedback-correto { background: rgba(16,185,129,0.1); border-left: 3px solid var(--accent); color: var(--text-main); }
        .feedback-errado  { background: rgba(239,68,68,0.1);  border-left: 3px solid var(--error);  color: var(--text-main); }
        .multipla-resultado { text-align: center; padding: 2rem; }
        .digitacao-card { background: var(--bg-base); border: 1px solid var(--border-light); border-radius: var(--r-lg); padding: 2rem; }
        .digitacao-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .digitacao-titulo { margin: 0; font-size: 1.125rem; }
        .digitacao-instrucao { color: var(--text-muted); margin-bottom: 1.5rem; }
        .digitacao-original { background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--r-md); padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; }
        .digitacao-original p { color: var(--text-main); margin: 0; line-height: 1.75; }
        .digitacao-label { font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.07em; display: block; margin-bottom: 0.5rem; }
        .digitacao-gabarito { background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--r-md); padding: 1.25rem 1.5rem; }
        .badge-tipo { background: rgba(59,130,246,0.1); color: #93c5fd; border: 1px solid rgba(59,130,246,0.2); border-radius: 999px; font-size: 0.75rem; padding: 0.2rem 0.6rem; font-weight: 600; }
        .secao-detalhes { margin-bottom: 1.5rem; }
        .secao-detalhes h5 { font-size: 1rem; margin-bottom: 1rem; color: var(--text-main); }
    `;
    document.head.appendChild(style);
}

// =============================================================================
//  MÓDULO DE ACESSIBILIDADE
// =============================================================================
const ACESS_KEY = 'enem2026_acess';

const ACESS_STATE = {
    tema:             'padrao',
    interfaceTema:    'sistema',
    fonteNivel:       0,
    semAnimacoes:     false,
    espacamento:      false,
    cursorAmpliado:   false,
    realcarFoco:      false,
    leitorVelocidade: 1.0,
    leitorTom:        1.0
};

const FONTE_PASSOS  = [-30, -20, -10, 0, 10, 20, 30, 40, 50];
const FONTE_BASE_PX = 16;

function salvarAcess() {
    try { localStorage.setItem(ACESS_KEY, JSON.stringify(ACESS_STATE)); } catch(e) {}
}
function carregarAcess() {
    try {
        const raw = localStorage.getItem(ACESS_KEY);
        if (!raw) return;
        Object.assign(ACESS_STATE, JSON.parse(raw));
        aplicarEstadoAcess();
    } catch(e) {}
}
function aplicarEstadoAcess() {
    aplicarTema(ACESS_STATE.tema, true);
    aplicarInterfaceTema(ACESS_STATE.interfaceTema, true);
    aplicarFonte(true);
    if (ACESS_STATE.semAnimacoes)   _setToggle('toggle-animacoes',   true);
    if (ACESS_STATE.espacamento)    _setToggle('toggle-espacamento', true);
    if (ACESS_STATE.cursorAmpliado) _setToggle('toggle-cursor',      true);
    if (ACESS_STATE.realcarFoco)    _setToggle('toggle-foco',        true);
    _syncAnimacoes(); _syncEspacamento(); _syncCursor(); _syncFoco();
    const sv = el('leitor-velocidade');
    const st = el('leitor-tom');
    if (sv) { sv.value = ACESS_STATE.leitorVelocidade; setText('val-velocidade', ACESS_STATE.leitorVelocidade.toFixed(1) + 'x'); }
    if (st) { st.value = ACESS_STATE.leitorTom;        setText('val-tom',        ACESS_STATE.leitorTom.toFixed(1)); }
}
function alterarFonte(direcao) {
    const novoNivel = ACESS_STATE.fonteNivel + direcao;
    if (novoNivel < -3 || novoNivel > 5) return;
    ACESS_STATE.fonteNivel = novoNivel;
    aplicarFonte();
    salvarAcess();
}
function resetarFonte() {
    ACESS_STATE.fonteNivel = 0;
    aplicarFonte();
    salvarAcess();
}
function aplicarFonte(silencioso = false) {
    const idx = ACESS_STATE.fonteNivel + 3;
    const pct = 100 + (FONTE_PASSOS[Math.min(idx, FONTE_PASSOS.length - 1)] || 0);
    const px  = (FONTE_BASE_PX * pct / 100).toFixed(1);
    document.documentElement.style.fontSize = px + 'px';
    setText('display-fonte', pct + '%');
    if (!silencioso) notificar(`Fonte ajustada para ${pct}%`, 'info');
}
function aplicarTema(nome, silencioso = false) {
    const temas = ['padrao','alto-contraste','alto-contraste-simples','sepia','protanopia','deuteranopia'];
    const html  = document.documentElement;
    temas.forEach(t => { if (t !== 'padrao') html.classList.remove(`tema-${t}`); });
    if (nome !== 'padrao') html.classList.add(`tema-${nome}`);
    ACESS_STATE.tema = nome;
    document.querySelectorAll('.acess-tema-card').forEach(c => {
        const ativo = c.id === `tema-${nome}`;
        c.classList.toggle('acess-tema-ativo', ativo);
        c.setAttribute('aria-pressed', ativo);
    });
    if (!silencioso) notificar(`Tema alterado: ${_nomeTema(nome)}`, 'info');
    salvarAcess();
}
function _nomeTema(k) {
    const nomes = {
        padrao: 'Padrão', 'alto-contraste': 'Alto Contraste',
        'alto-contraste-simples': 'Alto Contraste Simples',
        sepia: 'Sépia', protanopia: 'Protanopia', deuteranopia: 'Deuteranopia'
    };
    return nomes[k] || k;
}
function aplicarInterfaceTema(nome, silencioso = false) {
    const opcoes = ['claro', 'escuro', 'sistema'];
    const html   = document.documentElement;
    opcoes.forEach(o => html.classList.remove(`interface-${o}`));
    if (opcoes.includes(nome)) html.classList.add(`interface-${nome}`);
    ACESS_STATE.interfaceTema = nome;
    document.querySelectorAll('[id^="interface-"]').forEach(c => {
        const ativo = c.id === `interface-${nome}`;
        c.classList.toggle('acess-tema-ativo', ativo);
        c.setAttribute('aria-pressed', ativo);
    });
    if (!silencioso) {
        const nomes = { claro: 'Claro', escuro: 'Escuro', sistema: 'De acordo com o sistema' };
        notificar(`Tema da interface: ${nomes[nome] || nome}`, 'info');
    }
    salvarAcess();
}
function _setToggle(id, estado) { el(id)?.setAttribute('aria-checked', estado); }
function _syncAnimacoes()  { document.documentElement.classList.toggle('sem-animacoes',          ACESS_STATE.semAnimacoes); }
function _syncEspacamento(){ document.documentElement.classList.toggle('espacamento-ampliado',   ACESS_STATE.espacamento); }
function _syncCursor()     { document.documentElement.classList.toggle('cursor-ampliado',         ACESS_STATE.cursorAmpliado); }
function _syncFoco()       { document.documentElement.classList.toggle('realcar-foco',            ACESS_STATE.realcarFoco); }

function toggleAnimacoes() {
    ACESS_STATE.semAnimacoes = !ACESS_STATE.semAnimacoes;
    _setToggle('toggle-animacoes', ACESS_STATE.semAnimacoes);
    _syncAnimacoes();
    notificar(ACESS_STATE.semAnimacoes ? '🚫 Animações desativadas' : '✨ Animações reativadas', 'info');
    salvarAcess();
}
function toggleEspacamento() {
    ACESS_STATE.espacamento = !ACESS_STATE.espacamento;
    _setToggle('toggle-espacamento', ACESS_STATE.espacamento);
    _syncEspacamento();
    notificar(ACESS_STATE.espacamento ? '📏 Espaçamento ampliado ativado' : '📏 Espaçamento padrão restaurado', 'info');
    salvarAcess();
}
function toggleCursor() {
    ACESS_STATE.cursorAmpliado = !ACESS_STATE.cursorAmpliado;
    _setToggle('toggle-cursor', ACESS_STATE.cursorAmpliado);
    _syncCursor();
    notificar(ACESS_STATE.cursorAmpliado ? '🖱️ Cursor ampliado ativado' : '🖱️ Cursor padrão restaurado', 'info');
    salvarAcess();
}
function toggleFoco() {
    ACESS_STATE.realcarFoco = !ACESS_STATE.realcarFoco;
    _setToggle('toggle-foco', ACESS_STATE.realcarFoco);
    _syncFoco();
    notificar(ACESS_STATE.realcarFoco ? '🔍 Realce de foco ativado' : '🔍 Realce de foco desativado', 'info');
    salvarAcess();
}

let _utterance   = null;
let _lendoAtivo  = false;

function atualizarVelocidade(val) {
    ACESS_STATE.leitorVelocidade = parseFloat(val);
    setText('val-velocidade', parseFloat(val).toFixed(1) + 'x');
    salvarAcess();
}
function atualizarTom(val) {
    ACESS_STATE.leitorTom = parseFloat(val);
    setText('val-tom', parseFloat(val).toFixed(1));
    salvarAcess();
}
function _setStatusLeitor(msg, cls) {
    const s = el('leitor-status');
    if (!s) return;
    s.textContent = msg;
    s.className   = `acess-leitor-status ${cls || ''}`.trim();
}
function _setBotoesLeitor(lendo) {
    const btnLer    = el('btn-ler');
    const btnPausar = el('btn-pausar');
    const btnParar  = el('btn-parar');
    if (btnLer)    btnLer.disabled    = lendo;
    if (btnPausar) btnPausar.disabled = !lendo;
    if (btnParar)  btnParar.disabled  = !lendo;
}
function lerTexto() {
    if (!('speechSynthesis' in window)) {
        _setStatusLeitor('⚠️ Seu navegador não suporta síntese de voz.', '');
        return;
    }
    const texto = el('leitor-input')?.value.trim();
    if (!texto) { notificar('Cole ou digite um texto antes de iniciar a leitura.', 'warning'); return; }

    window.speechSynthesis.cancel();
    _utterance          = new SpeechSynthesisUtterance(texto);
    _utterance.lang     = 'pt-BR';
    _utterance.rate     = ACESS_STATE.leitorVelocidade;
    _utterance.pitch    = ACESS_STATE.leitorTom;
    const vozes    = window.speechSynthesis.getVoices();
    const vozPtBR  = vozes.find(v => v.lang === 'pt-BR') || vozes.find(v => v.lang.startsWith('pt'));
    if (vozPtBR) _utterance.voice = vozPtBR;

    _utterance.onstart = () => { _lendoAtivo = true;  _setBotoesLeitor(true);  _setStatusLeitor('🔊 Lendo em voz alta...', 'lendo'); };
    _utterance.onend   = () => { _lendoAtivo = false; _setBotoesLeitor(false); _setStatusLeitor('✅ Leitura concluída!', 'concluido'); setTimeout(() => _setStatusLeitor('', ''), 3000); };
    _utterance.onerror = (e) => { _lendoAtivo = false; _setBotoesLeitor(false); if (e.error !== 'interrupted') _setStatusLeitor('⚠️ Erro na leitura. Tente novamente.', ''); };

    window.speechSynthesis.speak(_utterance);
}
function pausarLeitura() {
    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        _setStatusLeitor('🔊 Lendo em voz alta...', 'lendo');
        el('btn-pausar').querySelector('.acess-btn-icon').textContent  = '⏸';
        el('btn-pausar').querySelector('.acess-btn-label').textContent = 'Pausar';
    } else {
        window.speechSynthesis.pause();
        _setStatusLeitor('⏸ Pausado', 'pausado');
        el('btn-pausar').querySelector('.acess-btn-icon').textContent  = '▶';
        el('btn-pausar').querySelector('.acess-btn-label').textContent = 'Continuar';
    }
}
function pararLeitura() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    _lendoAtivo = false;
    _setBotoesLeitor(false);
    _setStatusLeitor('', '');
    const btnPausar = el('btn-pausar');
    if (btnPausar) {
        btnPausar.querySelector('.acess-btn-icon').textContent  = '⏸';
        btnPausar.querySelector('.acess-btn-label').textContent = 'Pausar';
    }
}
function resetarTudo() {
    pararLeitura();
    Object.assign(ACESS_STATE, {
        tema: 'padrao', interfaceTema: 'sistema', fonteNivel: 0,
        semAnimacoes: false, espacamento: false,
        cursorAmpliado: false, realcarFoco: false,
        leitorVelocidade: 1.0, leitorTom: 1.0
    });
    aplicarEstadoAcess();
    salvarAcess();
    notificar('♿ Todas as configurações de acessibilidade foram restauradas.', 'info');
}

// =============================================================================
//  INICIALIZAÇÃO
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    carregar();
    carregarAcess();
    injetarKeyframes();
    iniciarGotasDeSangue();

    const searchInput = el('search-input');
    if (searchInput) {
        searchInput.addEventListener('input',   e => realizarBusca(e.target.value));
        searchInput.addEventListener('keydown', e => { if (e.key === 'Escape') toggleBusca(); });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const drawer = el('nav-drawer');
            if (drawer?.classList.contains('aberto')) fecharMenu();
        }
    });

    // Navbar hide-on-scroll
    let _scrollAnterior = 0;
    let _scrollTimer    = null;
    const navbar        = el('main-navbar');
    const LIMIAR        = 80;

    window.addEventListener('scroll', () => {
        const scrollAtual = window.scrollY;
        if (el('nav-drawer')?.classList.contains('aberto'))        { _scrollAnterior = scrollAtual; return; }
        if (el('navbar-search-bar')?.classList.contains('aberta')) { _scrollAnterior = scrollAtual; return; }

        if (scrollAtual > LIMIAR && scrollAtual > _scrollAnterior) {
            navbar?.classList.add('navbar-oculta');
        } else {
            navbar?.classList.remove('navbar-oculta');
        }
        _scrollAnterior = scrollAtual;
        clearTimeout(_scrollTimer);
        _scrollTimer = setTimeout(() => navbar?.classList.remove('navbar-oculta'), 1200);
    }, { passive: true });

    console.log('%c🌾 ENEM 2026 — Seek souls. Larger, more powerful souls.', 'color:#888;font-weight:bold;font-size:14px;');
});

// =============================================================================
//  MÓDULO PERFIL & DESEMPENHO + AUTH COMPLETO — integrado ao TCC.js
// =============================================================================

// ── CONFIGURAÇÃO DOS PROVEDORES ───────────────────────────────────────────────
const PROVEDORES_CONFIG = {
    'google.com': {
        nome: 'Google',       statusId: 'status-google',
        btnId: 'btn-google',  itemId: 'metodo-google',
        getProvider: () => new window._GoogleAuthProvider()
    },
    'password': {
        nome: 'E-mail e Senha', statusId: 'status-password',
        btnId: 'btn-password',  itemId: 'metodo-password',
        getProvider: null
    },
    'apple.com': {
        nome: 'Apple ID',     statusId: 'status-apple',
        btnId: 'btn-apple',   itemId: 'metodo-apple',
        getProvider: () => new window._OAuthProvider('apple.com')
    },
    'github.com': {
        nome: 'GitHub',       statusId: 'status-github',
        btnId: 'btn-github',  itemId: 'metodo-github',
        getProvider: () => new window._GithubAuthProvider()
    }
};

// ── UTILITÁRIOS ───────────────────────────────────────────────────────────────
function _setTxt(id, val) {
    const e = document.getElementById(id);
    if (e) e.textContent = val;
}
function _formatarData(data) {
    if (!data) return '—';
    const d = (data instanceof Date) ? data : new Date(data);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
function _formatarRelativa(data) {
    if (!data) return '—';
    const d    = (data instanceof Date) ? data : new Date(data);
    const diff = Date.now() - d.getTime();
    if (isNaN(diff)) return '—';
    const min  = Math.floor(diff / 60000);
    const h    = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    if (min < 1)    return 'Agora mesmo';
    if (min < 60)   return `há ${min} minuto${min > 1 ? 's' : ''}`;
    if (h < 24)     return `há ${h} hora${h > 1 ? 's' : ''}`;
    if (dias === 1) return 'ontem';
    if (dias < 7)   return `há ${dias} dias`;
    return _formatarData(d);
}
function _iniciais(nome) {
    if (!nome) return '?';
    const p = nome.trim().split(/\s+/);
    return p.length === 1
        ? p[0][0].toUpperCase()
        : (p[0][0] + p[p.length - 1][0]).toUpperCase();
}
function _mostrarAlertaModal(msg) {
    const el = document.getElementById('modal-alerta');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
}
function _limparAlertaModal() {
    const el = document.getElementById('modal-alerta');
    if (el) { el.textContent = ''; el.classList.add('hidden'); }
}
function _setBtnLoading(id, loading, textoOriginal) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled    = loading;
    btn.textContent = loading ? 'Aguarde...' : textoOriginal;
}

// ── MODAL: ABRIR / FECHAR ─────────────────────────────────────────────────────
function toggleModalPerfil() {
    const modal   = document.getElementById('perfil-modal');
    const overlay = document.getElementById('perfil-modal-overlay');
    if (!modal) return;
    const estaOculto = modal.classList.contains('hidden');
    if (estaOculto) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        const auth = window._firebaseAuth;
        if (auth?.currentUser) _atualizarMiniPerfil(auth.currentUser);
    } else {
        fecharModalPerfil();
    }
}
function fecharModalPerfil() {
    const overlay = document.getElementById('perfil-modal-overlay');
    const modal   = document.getElementById('perfil-modal');
    overlay?.classList.add('hidden');
    modal?.classList.add('hidden');
    modal?.setAttribute('aria-hidden', 'true');
    _limparAlertaModal();
}
// Fecha com ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModalPerfil();
});
// Fecha ao clicar fora do modal
document.addEventListener('click', e => {
    const overlay = document.getElementById('perfil-modal-overlay');
    const modal   = document.getElementById('perfil-modal');
    const btnNav  = document.getElementById('btn-perfil-nav');
    if (!overlay || overlay.classList.contains('hidden')) return;
    if (modal && !modal.contains(e.target) && btnNav && !btnNav.contains(e.target)) {
        fecharModalPerfil();
    }
});

// ── MODAL: NAVEGAÇÃO ENTRE FORMULÁRIOS ───────────────────────────────────────
function mostrarLogin() {
    document.getElementById('modal-form-email')?.classList.remove('hidden');
    document.getElementById('modal-form-cadastro')?.classList.add('hidden');
    document.getElementById('modal-form-esqueci')?.classList.add('hidden');
    _limparAlertaModal();
    const titulo = document.getElementById('modal-titulo');
    if (titulo) titulo.textContent = 'Entrar na plataforma';
}
function mostrarCadastro() {
    document.getElementById('modal-form-email')?.classList.add('hidden');
    document.getElementById('modal-form-cadastro')?.classList.remove('hidden');
    document.getElementById('modal-form-esqueci')?.classList.add('hidden');
    _limparAlertaModal();
    const titulo = document.getElementById('modal-titulo');
    if (titulo) titulo.textContent = 'Criar conta';
}
function mostrarEsqueciSenha() {
    document.getElementById('modal-form-email')?.classList.add('hidden');
    document.getElementById('modal-form-cadastro')?.classList.add('hidden');
    document.getElementById('modal-form-esqueci')?.classList.remove('hidden');
    _limparAlertaModal();
    const titulo = document.getElementById('modal-titulo');
    if (titulo) titulo.textContent = 'Recuperar senha';
}

// ── MODAL: TOGGLE SENHA VISÍVEL ───────────────────────────────────────────────
function toggleSenhaVisivel() {
    const campo = document.getElementById('modal-senha');
    if (!campo) return;
    campo.type = campo.type === 'password' ? 'text' : 'password';
}

// ── MENSAGENS DE ERRO FIREBASE ────────────────────────────────────────────────
const _errosFirebase = {
    'auth/user-not-found':          'Nenhuma conta encontrada com este e-mail.',
    'auth/wrong-password':          'Senha incorreta. Verifique e tente novamente.',
    'auth/invalid-email':           'E-mail inválido. Verifique o formato.',
    'auth/email-already-in-use':    'Este e-mail já está cadastrado.',
    'auth/weak-password':           'Senha fraca. Use pelo menos 6 caracteres.',
    'auth/popup-closed-by-user':    'Login cancelado. Feche a janela e tente novamente.',
    'auth/popup-blocked':           'Pop-up bloqueado. Permita pop-ups para este site.',
    'auth/too-many-requests':       'Muitas tentativas. Aguarde alguns minutos.',
    'auth/network-request-failed':  'Erro de rede. Verifique sua conexão.',
    'auth/invalid-credential':      'Credenciais inválidas. Verifique e-mail e senha.',
    'auth/requires-recent-login':   'Por segurança, faça login novamente.',
};
function _mensagemErro(err) {
    return _errosFirebase[err.code] || `Erro inesperado: ${err.message}`;
}

// ── AÇÕES DE AUTH ─────────────────────────────────────────────────────────────

// Login com Google
async function loginComGoogle() {
    const auth = window._firebaseAuth;
    if (!auth) return;
    const btn = document.getElementById('btn-login-google');
    if (btn) { btn.disabled = true; btn.textContent = 'Aguarde...'; }
    _limparAlertaModal();
    try {
        const provider = new window._GoogleAuthProvider();
        await window._firebaseSignInWithPopup(auth, provider);
        fecharModalPerfil();
        notificar('✅ Login com Google realizado com sucesso!', 'success');
    } catch (err) {
        _mostrarAlertaModal(_mensagemErro(err));
    } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Continuar com Google`; }
    }
}

// Login com E-mail e Senha
async function loginComEmail() {
    const auth   = window._firebaseAuth;
    const email  = document.getElementById('modal-email')?.value?.trim();
    const senha  = document.getElementById('modal-senha')?.value;
    if (!email || !senha) { _mostrarAlertaModal('Preencha e-mail e senha.'); return; }
    _limparAlertaModal();
    _setBtnLoading('btn-login-email', true, 'Entrar');
    try {
        await window._firebaseSignInEmail(auth, email, senha);
        fecharModalPerfil();
        notificar('✅ Login realizado com sucesso!', 'success');
    } catch (err) {
        _mostrarAlertaModal(_mensagemErro(err));
    } finally {
        _setBtnLoading('btn-login-email', false, 'Entrar');
    }
}

// Cadastro com E-mail e Senha
async function cadastrarEmail() {
    const auth  = window._firebaseAuth;
    const nome  = document.getElementById('modal-nome')?.value?.trim();
    const email = document.getElementById('modal-email-cad')?.value?.trim();
    const senha = document.getElementById('modal-senha-cad')?.value;
    if (!nome || !email || !senha) { _mostrarAlertaModal('Preencha todos os campos.'); return; }
    if (senha.length < 6) { _mostrarAlertaModal('A senha deve ter pelo menos 6 caracteres.'); return; }
    _limparAlertaModal();
    _setBtnLoading('btn-cadastrar', true, 'Criar Conta');
    try {
        const cred = await window._firebaseCreateUser(auth, email, senha);
        await window._firebaseUpdateProfile(cred.user, { displayName: nome });
        fecharModalPerfil();
        notificar(`🎉 Bem-vindo, ${nome}! Conta criada com sucesso!`, 'success');
    } catch (err) {
        _mostrarAlertaModal(_mensagemErro(err));
    } finally {
        _setBtnLoading('btn-cadastrar', false, 'Criar Conta');
    }
}

// Recuperação de senha
async function enviarResetSenha() {
    const auth  = window._firebaseAuth;
    const email = document.getElementById('modal-email-reset')?.value?.trim();
    if (!email) { _mostrarAlertaModal('Informe seu e-mail.'); return; }
    _limparAlertaModal();
    try {
        await window._firebaseSendPasswordReset(auth, email);
        notificar('📧 E-mail de recuperação enviado! Verifique sua caixa.', 'success');
        mostrarLogin();
        fecharModalPerfil();
    } catch (err) {
        _mostrarAlertaModal(_mensagemErro(err));
    }
}

// Logout
async function fazerLogout() {
    const auth = window._firebaseAuth;
    if (!auth) return;
    try {
        await window._firebaseSignOut(auth);
        fecharModalPerfil();
        notificar('👋 Você saiu da sua conta.', 'info');
    } catch (err) {
        notificar('Erro ao sair: ' + err.message, 'error');
    }
}

// ── NAVBAR: ATUALIZA AVATAR ───────────────────────────────────────────────────
function _atualizarNavbarAvatar(user) {
    const iconEl  = document.getElementById('navbar-avatar-icon');
    const fotoEl  = document.getElementById('navbar-avatar-foto');
    const dotEl   = document.getElementById('navbar-perfil-dot');
    if (!iconEl || !fotoEl || !dotEl) return;

    if (user?.photoURL) {
        fotoEl.src = user.photoURL;
        fotoEl.classList.remove('hidden');
        iconEl.style.display = 'none';
    } else if (user) {
        // Sem foto: ícone colorido
        fotoEl.classList.add('hidden');
        iconEl.style.display = '';
        iconEl.style.color   = 'var(--primary)';
    } else {
        // Deslogado: ícone padrão muted
        fotoEl.classList.add('hidden');
        iconEl.style.display = '';
        iconEl.style.color   = '';
    }

    // Ponto verde de "online"
    if (user) dotEl.classList.remove('hidden');
    else       dotEl.classList.add('hidden');
}

// ── MINI-PERFIL NO MODAL (painel logado) ─────────────────────────────────────
function _atualizarMiniPerfil(user) {
    if (!user) return;
    const nome = user.displayName || 'Usuário';

    // Avatar
    const avatarEl = document.getElementById('modal-mini-avatar');
    const fotoEl   = document.getElementById('modal-mini-foto');
    const inEl     = document.getElementById('modal-mini-iniciais');
    if (avatarEl) {
        if (user.photoURL && fotoEl) {
            fotoEl.src = user.photoURL;
            fotoEl.classList.remove('hidden');
            if (inEl) inEl.textContent = '';
        } else if (inEl) {
            inEl.textContent = _iniciais(nome);
            if (fotoEl) fotoEl.classList.add('hidden');
        }
    }

    _setTxt('modal-mini-nome', nome);
    _setTxt('modal-mini-email', user.email || '—');

    const nivel    = STATE.nivel ?? 1;
    const nivelInf = NIVEIS[nivel];
    _setTxt('modal-mini-nivel', nivelInf ? nivelInf.titulo : `Nível ${nivel}`);

    // Stats rápidos
    const xpNivel = typeof XP_POR_NIVEL !== 'undefined' ? XP_POR_NIVEL : 100;
    const xpAcum  = ((nivel - 1) * xpNivel) + (STATE.xp ?? 0);
    _setTxt('mstat-xp',        xpAcum.toLocaleString('pt-BR'));
    _setTxt('mstat-redacoes',  (STATE.historico?.length ?? 0).toLocaleString('pt-BR'));
    _setTxt('mstat-sequencia', (STATE.sequencia ?? 0).toLocaleString('pt-BR'));
}

// ── RENDERIZAÇÃO PAINEL PERFIL COMPLETO ───────────────────────────────────────
function renderizarPerfilUsuario(user) {
    const skeleton  = document.getElementById('perfil-skeleton');
    const conteudo  = document.getElementById('perfil-usuario-conteudo');
    const naoLogado = document.getElementById('perfil-nao-logado');
    if (!conteudo) return;

    if (!user) {
        skeleton?.classList.add('hidden');
        conteudo.classList.add('hidden');
        naoLogado?.classList.remove('hidden');
        return;
    }
    const foto     = document.getElementById('perfil-foto');
    const iniciais = document.getElementById('perfil-iniciais');
    const nome     = user.displayName || 'Usuário';

    if (user.photoURL && foto) {
        foto.src = user.photoURL; foto.alt = `Foto de ${nome}`;
        foto.classList.remove('hidden');
        iniciais?.classList.add('hidden');
    } else if (iniciais) {
        iniciais.textContent = _iniciais(nome);
        iniciais.classList.remove('hidden');
        foto?.classList.add('hidden');
    }

    _setTxt('perfil-nome', nome);
    _setTxt('perfil-email', user.email || 'Sem e-mail');
    _setTxt('perfil-criacao', _formatarData(user.metadata?.creationTime));
    _setTxt('perfil-ultimo-acesso', _formatarRelativa(user.metadata?.lastSignInTime));

    const nivel    = STATE.nivel ?? 1;
    const nivelInf = NIVEIS[nivel];
    _setTxt('perfil-titulo-nivel', nivelInf ? nivelInf.titulo : `Nível ${nivel}`);
    _setTxt('perfil-nivel-badge',  String(nivel));

    skeleton?.classList.add('hidden');
    naoLogado?.classList.add('hidden');
    conteudo.classList.remove('hidden');
}

// ── RENDERIZAÇÃO MÉTODOS DE LOGIN ─────────────────────────────────────────────
function renderizarMetodosLogin(user) {
    const vinc = user ? user.providerData.map(p => p.providerId) : [];
    Object.entries(PROVEDORES_CONFIG).forEach(([pid, cfg]) => {
        const ok     = vinc.includes(pid);
        const itemEl = document.getElementById(cfg.itemId);
        const stEl   = document.getElementById(cfg.statusId);
        const btnEl  = document.getElementById(cfg.btnId);
        if (!itemEl || !stEl || !btnEl) return;
        if (ok) {
            itemEl.classList.add('conectado');
            stEl.textContent  = '✓ Conectado';
            stEl.className    = 'login-metodo-status status-on';
            btnEl.textContent = 'Desconectar';
            btnEl.className   = 'login-metodo-btn btn-desconectar';
        } else {
            itemEl.classList.remove('conectado');
            stEl.textContent  = 'Não conectado';
            stEl.className    = 'login-metodo-status status-off';
            btnEl.textContent = 'Conectar';
            btnEl.className   = 'login-metodo-btn btn-conectar';
        }
        btnEl.disabled = pid === 'password' || !user;
        if (pid === 'password') btnEl.title = 'Gerencie e-mail e senha nas configurações da conta';
    });
}

// ── CONECTAR / DESCONECTAR PROVEDOR ──────────────────────────────────────────
async function alternarProvedorLogin(providerId) {
    const auth = window._firebaseAuth;
    if (!auth?.currentUser) { notificar('Você precisa estar logado.', 'warning'); return; }
    const user = auth.currentUser;
    const cfg  = PROVEDORES_CONFIG[providerId];
    if (!cfg?.getProvider) return;
    const vinc  = user.providerData.map(p => p.providerId);
    const ok    = vinc.includes(providerId);
    const btnEl = document.getElementById(cfg.btnId);
    if (btnEl) { btnEl.disabled = true; btnEl.textContent = '...'; }
    try {
        if (ok) {
            if (vinc.length <= 1) { notificar('Mantenha ao menos um método ativo.', 'error'); return; }
            await window._firebaseUnlink(user, providerId);
            notificar(`${cfg.nome} desconectado.`, 'success');
        } else {
            await window._firebaseLinkWithPopup(user, cfg.getProvider());
            notificar(`${cfg.nome} conectado!`, 'success');
        }
        renderizarMetodosLogin(auth.currentUser);
    } catch (err) {
        const msgs = {
            'auth/popup-closed-by-user': 'Janela fechada. Tente novamente.',
            'auth/popup-blocked':        'Pop-up bloqueado pelo navegador.',
            'auth/credential-already-in-use': 'Conta já vinculada a outro usuário.',
            'auth/provider-already-linked':   `${cfg.nome} já está conectado.`,
        };
        notificar(msgs[err.code] || `Erro: ${err.message}`, 'error');
        renderizarMetodosLogin(auth.currentUser);
    }
}

// ── DESEMPENHO ────────────────────────────────────────────────────────────────
function renderizarDesempenho() {
    const nivel     = STATE.nivel    ?? 1;
    const xp        = STATE.xp       ?? 0;
    const sequencia = STATE.sequencia ?? 0;
    const historico = STATE.historico ?? [];

    const totalAcertos  = parseInt(document.getElementById('total-acertos')?.textContent)  || 0;
    const totalRedacoes = parseInt(document.getElementById('total-redacoes')?.textContent) || 0;
    const xpNivel       = typeof XP_POR_NIVEL !== 'undefined' ? XP_POR_NIVEL : 100;
    const xpAcumulado   = ((nivel - 1) * xpNivel) + xp;

    _setTxt('stat-pontuacao',  xpAcumulado.toLocaleString('pt-BR'));
    _setTxt('stat-redacoes',   totalRedacoes.toLocaleString('pt-BR'));
    _setTxt('stat-acertos',    totalAcertos.toLocaleString('pt-BR'));
    _setTxt('stat-sequencia',  sequencia.toLocaleString('pt-BR'));
    _setTxt('stat-nivel',      String(nivel));
    _setTxt('stat-xp',         xp.toLocaleString('pt-BR'));
    _setTxt('perfil-nivel-badge', String(nivel));

    const pct   = Math.min(100, Math.round((xp / xpNivel) * 100)) || 0;
    const barra = document.getElementById('barra-progresso');
    const cont  = document.getElementById('barra-progresso-container');
    if (barra) barra.style.width = `${pct}%`;
    if (cont)  cont.setAttribute('aria-valuenow', String(pct));
    _setTxt('progresso-pct', `${pct}%`);

    const msgs = [
        { min: 75, msg: 'Quase lá! Você está muito próximo de subir de nível.' },
        { min: 50, msg: 'Mais da metade do caminho! Continue praticando.' },
        { min: 25, msg: 'Ótimo começo! Você já passou de 25% do próximo nível.' },
        { min: 0,  msg: 'Continue praticando para subir de nível!' },
    ];
    _setTxt('progresso-desc', (msgs.find(m => pct >= m.min) ?? msgs[msgs.length - 1]).msg);

    const ult = historico[historico.length - 1];
    _setTxt('stat-ultima-atividade', ult ? (ult.descricao || ult.tema || 'Atividade registrada') : 'Nenhuma atividade ainda');

    _renderizarHistoricoPerfil(historico);
}

function _renderizarHistoricoPerfil(historico) {
    const lista = document.getElementById('historico-lista-perfil');
    const vazio = document.getElementById('historico-vazio-perfil');
    if (!lista) return;
    if (!historico?.length) { vazio?.classList.remove('hidden'); return; }
    vazio?.classList.add('hidden');
    lista.querySelectorAll('.historico-item').forEach(e => e.remove());
    const icones = { cacador: '🎯', multipla: '📋', digitacao: '⌨️' };
    [...historico].reverse().slice(0, 10).forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'historico-item';
        div.role = 'listitem';
        div.style.animationDelay = `${i * 40}ms`;
        div.innerHTML = `
            <span class="historico-item-icone" aria-hidden="true">${icones[item.modo] ?? '📝'}</span>
            <span class="historico-item-descricao">${item.descricao || item.tema || 'Redação praticada'}</span>
            ${item.data ? `<span class="historico-item-detalhe">${_formatarRelativa(item.data)}</span>` : ''}
            ${item.xpGanho ? `<span class="historico-item-xp">+${item.xpGanho} XP</span>` : ''}
        `;
        lista.appendChild(div);
    });
}

// ── MODAL: MOSTRAR PAINEL CORRETO (logado / não logado) ───────────────────────
function _atualizarModalPaineis(user) {
    const pLogin  = document.getElementById('modal-painel-login');
    const pPerfil = document.getElementById('modal-painel-perfil');
    if (!pLogin || !pPerfil) return;
    if (user) {
        pLogin.classList.add('hidden');
        pPerfil.classList.remove('hidden');
        _atualizarMiniPerfil(user);
    } else {
        pPerfil.classList.add('hidden');
        pLogin.classList.remove('hidden');
        mostrarLogin();
    }
}

// ── LISTENER DE AUTH STATE ────────────────────────────────────────────────────
function iniciarListenerAuth() {
    const auth = window._firebaseAuth;
    if (!auth || typeof window._firebaseOnAuthStateChanged !== 'function') {
        renderizarPerfilUsuario(null);
        renderizarMetodosLogin(null);
        _atualizarNavbarAvatar(null);
        _atualizarModalPaineis(null);
        renderizarDesempenho();
        return;
    }
    window._firebaseOnAuthStateChanged(auth, (user) => {
        _atualizarNavbarAvatar(user);
        _atualizarModalPaineis(user);
        renderizarPerfilUsuario(user);
        renderizarMetodosLogin(user);
        renderizarDesempenho();
    });
}

// ── HOOK: atualiza perfil ao abrir aba ────────────────────────────────────────
(function hookAtivarAba() {
    const _orig = window.ativarAba;
    if (typeof _orig !== 'function') return;
    window.ativarAba = function(aba) {
        _orig(aba);
        if (aba === 'perfil') {
            renderizarDesempenho();
            const u = window._firebaseAuth?.currentUser;
            if (u) { renderizarPerfilUsuario(u); renderizarMetodosLogin(u); }
        }
    };
})();

// ── EXPÕE GLOBAIS ─────────────────────────────────────────────────────────────
window.toggleModalPerfil     = toggleModalPerfil;
window.fecharModalPerfil     = fecharModalPerfil;
window.mostrarLogin          = mostrarLogin;
window.mostrarCadastro       = mostrarCadastro;
window.mostrarEsqueciSenha   = mostrarEsqueciSenha;
window.toggleSenhaVisivel    = toggleSenhaVisivel;
window.loginComGoogle        = loginComGoogle;
window.loginComEmail         = loginComEmail;
window.cadastrarEmail        = cadastrarEmail;
window.enviarResetSenha      = enviarResetSenha;
window.fazerLogout           = fazerLogout;
window.alternarProvedorLogin = alternarProvedorLogin;
window.iniciarListenerAuth   = iniciarListenerAuth;

window.dispatchEvent(new Event('tcc-js-ready'));
