// ESTADO GLOBAL
const STATE = {
    redacao:      null,
    errosIdentif: [],
    nome:         '',
    historico:    [],
    nivel:        1,
    xp:           0,
    sequencia:    0
};

// CONSTANTES
const XP_POR_ERRO  = 10;
const XP_POR_NIVEL = 100;
const BONUS_PERF   = 50;

const NIVEIS = {
    1: { titulo: '💀 Iniciante',      cor: '#5a0000' },
    2: { titulo: '🩸 Suspeito',       cor: '#8b0000' },
    3: { titulo: '⛓️ Prisioneiro',    cor: '#a05a2c' },
    4: { titulo: '🪚 Sobrevivente',   cor: '#b8a000' },
    5: { titulo: '🎭 Mestre do Jogo', cor: '#c0392b' }
};

// BASE DE TEMAS
const TEMAS = {
    educacao: {
        titulo: 'Educação e Tecnologia na Era Digital',
        dificuldade: 'Média', competencia: 'C1, C2, C3',
        introducao: [
            'A educação brasileira enfrenta grandes desafios na era digital',
            'A tecnologia tem transformado profundamente o ensino no Brasil',
            'O acesso à educação de qualidade é fundamental para o desenvolvimento do país'
        ],
        desenvolvimento: [
            'Por um lado, a inclusão digital nas escolas públicas ainda é precária',
            'Ademais, a formação de professores para o uso de tecnologias é insuficiente',
            'Além disso, a desigualdade no acesso à internet prejudica milhões de estudantes',
            'Nesse contexto, programas governamentais têm buscado democratizar o acesso',
            'Outrossim, iniciativas privadas também contribuem para a modernização do ensino'
        ],
        conclusao: [
            'Portanto, é necessário investir em infraestrutura tecnológica nas escolas',
            'Assim, torna-se imprescindível capacitar os educadores para o uso pedagógico da tecnologia',
            'Destarte, políticas públicas devem garantir acesso universal à internet de qualidade'
        ]
    },
    'meio-ambiente': {
        titulo: 'Preservação Ambiental e Desenvolvimento Sustentável',
        dificuldade: 'Fácil', competencia: 'C1, C3, C5',
        introducao: [
            'A preservação do meio ambiente é uma das maiores preocupações da atualidade',
            'O Brasil possui uma das maiores biodiversidades do planeta',
            'A questão ambiental tem gerado debates intensos na sociedade contemporânea'
        ],
        desenvolvimento: [
            'De um lado, o desmatamento na Amazônia atingiu níveis alarmantes',
            'Além disso, a poluição dos rios e oceanos ameaça a vida marinha',
            'Por outro lado, energias renováveis ganham espaço na matriz energética',
            'Nesse sentido, a consciência ambiental da população tem crescido',
            'Ademais, empresas começam a adotar práticas sustentáveis'
        ],
        conclusao: [
            'Portanto, o governo deve fiscalizar rigorosamente crimes ambientais',
            'Assim, campanhas de conscientização precisam ser ampliadas',
            'Desse modo, é fundamental investir em tecnologias limpas e sustentáveis'
        ]
    },
    'saude-mental': {
        titulo: 'Saúde Mental no Brasil: Desafios e Caminhos',
        dificuldade: 'Média', competencia: 'C1, C2, C4',
        introducao: [
            'A saúde mental tornou-se uma questão de saúde pública no Brasil',
            'Problemas psicológicos afetam milhões de brasileiros atualmente',
            'O cuidado com a mente é tão importante quanto com o corpo'
        ],
        desenvolvimento: [
            'Primeiramente, o estigma social em torno de doenças mentais ainda é muito forte',
            'Além disso, o acesso a tratamento psicológico é limitado no SUS',
            'Por outro lado, campanhas como Janeiro Branco têm conscientizado a população',
            'Nesse contexto, o ambiente de trabalho tem sido fonte de adoecimento',
            'Ademais, as redes sociais intensificam problemas como ansiedade e depressão'
        ],
        conclusao: [
            'Portanto, políticas de saúde mental devem ser ampliadas no sistema público',
            'Assim, empresas precisam promover ambientes de trabalho mais saudáveis',
            'Destarte, a sociedade deve combater o preconceito contra doenças psicológicas'
        ]
    },
    desigualdade: {
        titulo: 'Desigualdade Social e Seus Impactos no Brasil',
        dificuldade: 'Difícil', competencia: 'C1, C3, C4, C5',
        introducao: [
            'A desigualdade social é um dos maiores problemas do Brasil',
            'O país figura entre os mais desiguais do mundo',
            'A concentração de renda afeta diretamente a qualidade de vida da população'
        ],
        desenvolvimento: [
            'Em primeiro lugar, o acesso à educação de qualidade é desigual entre classes',
            'Além disso, a saúde pública não atende adequadamente as populações mais pobres',
            'Por outro lado, programas sociais têm ajudado a reduzir a pobreza extrema',
            'Nesse sentido, a reforma tributária é debatida como solução',
            'Ademais, a geração de empregos é fundamental para reduzir desigualdades'
        ],
        conclusao: [
            'Portanto, investimentos em educação pública são essenciais',
            'Assim, políticas de redistribuição de renda devem ser fortalecidas',
            'Desse modo, oportunidades iguais precisam ser garantidas a todos'
        ]
    },
    violencia: {
        titulo: 'Violência Contra a Mulher no Brasil',
        dificuldade: 'Média', competencia: 'C2, C3, C5',
        introducao: [
            'A violência contra a mulher é um grave problema social no Brasil',
            'Dados mostram que milhares de mulheres sofrem agressões diariamente',
            'A Lei Maria da Penha foi um avanço importante na proteção feminina'
        ],
        desenvolvimento: [
            'Primeiramente, a cultura machista ainda perpetua violências de gênero',
            'Além disso, muitas vítimas têm medo de denunciar seus agressores',
            'Por outro lado, delegacias especializadas têm melhorado o atendimento',
            'Nesse contexto, campanhas de conscientização são fundamentais',
            'Ademais, a educação de base precisa trabalhar o respeito e igualdade'
        ],
        conclusao: [
            'Portanto, é necessário fortalecer mecanismos de proteção às vítimas',
            'Assim, campanhas educativas devem começar desde a infância',
            'Destarte, punições mais severas podem inibir agressores'
        ]
    },
    internet: {
        titulo: 'Democratização do Acesso à Internet no Brasil',
        dificuldade: 'Fácil', competencia: 'C1, C3, C5',
        introducao: [
            'O acesso à internet tornou-se essencial na sociedade contemporânea',
            'Milhões de brasileiros ainda não têm acesso à rede mundial',
            'A exclusão digital aprofunda desigualdades sociais existentes'
        ],
        desenvolvimento: [
            'De um lado, a internet é fundamental para educação e trabalho',
            'Além disso, serviços públicos estão cada vez mais digitalizados',
            'Por outro lado, áreas rurais e periféricas carecem de infraestrutura',
            'Nesse sentido, programas governamentais buscam expandir o acesso',
            'Ademais, a internet móvel tem crescido mas ainda é cara para muitos'
        ],
        conclusao: [
            'Portanto, o Estado deve investir em infraestrutura de telecomunicações',
            'Assim, programas de inclusão digital precisam ser ampliados',
            'Desse modo, tarifas populares podem democratizar o acesso à rede'
        ]
    }
};

// BANCO DE ERROS
const ERROS = [
    // Acentuação
    { correto: 'têm',           errado: 'tem',           explicacao: 'O verbo "ter" na 3ª pessoa do plural leva acento: têm.',                         competencia: 'C1' },
    { correto: 'países',        errado: 'paises',         explicacao: 'Paroxítona terminada em ditongo leva acento: países.',                           competencia: 'C1' },
    { correto: 'saúde',         errado: 'saude',          explicacao: 'Hiato tônico exige acento: saúde.',                                              competencia: 'C1' },
    { correto: 'área',          errado: 'area',           explicacao: 'Paroxítona terminada em ditongo leva acento: área.',                             competencia: 'C1' },
    { correto: 'histórico',     errado: 'historico',      explicacao: 'Proparoxítona sempre leva acento: histórico.',                                   competencia: 'C1' },
    { correto: 'possível',      errado: 'possivel',       explicacao: 'Paroxítona terminada em "l" leva acento: possível.',                             competencia: 'C1' },
    { correto: 'até',           errado: 'ate',            explicacao: 'Oxítona terminada em "e" leva acento: até.',                                     competencia: 'C1' },
    { correto: 'também',        errado: 'tambem',         explicacao: 'Oxítona terminada em "em" leva acento: também.',                                 competencia: 'C1' },
    { correto: 'está',          errado: 'esta',           explicacao: 'O verbo "estar" (está) leva acento para diferenciar do pronome "esta".',         competencia: 'C1' },
    { correto: 'públicas',      errado: 'publicas',       explicacao: 'Proparoxítona sempre leva acento: públicas.',                                    competencia: 'C1' },
    { correto: 'econômica',     errado: 'economica',      explicacao: 'Proparoxítona sempre leva acento: econômica.',                                   competencia: 'C1' },
    { correto: 'científica',    errado: 'cientifica',     explicacao: 'Proparoxítona sempre leva acento: científica.',                                  competencia: 'C1' },
    // Ortografia
    { correto: 'exceção',       errado: 'excessão',       explicacao: 'Escreve-se com "ç": exceção (derivado de exceto).',                              competencia: 'C1' },
    { correto: 'análise',       errado: 'analise',        explicacao: 'O substantivo "análise" leva acento. O verbo "analise" não leva.',               competencia: 'C1' },
    { correto: 'imprescindível',errado: 'imprecindível',  explicacao: 'Escreve-se com "s": imprescindível.',                                            competencia: 'C1' },
    { correto: 'através',       errado: 'atravez',        explicacao: 'Escreve-se com "s" no final: através.',                                          competencia: 'C1' },
    { correto: 'benefício',     errado: 'benefico',       explicacao: 'A palavra benefício leva acento no "i".',                                        competencia: 'C1' },
    { correto: 'privilégio',    errado: 'previlégio',     explicacao: 'Escreve-se com "i" na primeira sílaba: privilégio.',                             competencia: 'C1' },
    { correto: 'assessoria',    errado: 'acessoria',      explicacao: 'Com dois "s": assessoria (de assessor).',                                        competencia: 'C1' },
    // Concordância
    { correto: 'existem',       errado: 'existe',         explicacao: '"Existir" concorda com o sujeito plural: existem problemas.',                    competencia: 'C1' },
    { correto: 'fazem',         errado: 'faz',            explicacao: 'Com sujeito plural, o verbo concorda: eles fazem.',                              competencia: 'C1' },
    { correto: 'foram',         errado: 'foi',            explicacao: 'Verbo deve concordar com o sujeito plural: dados foram.',                        competencia: 'C1' },
    { correto: 'precisam',      errado: 'precisa',        explicacao: 'Verbo concorda com sujeito plural: políticas precisam.',                         competencia: 'C1' },
    { correto: 'contribuem',    errado: 'contribui',      explicacao: 'Verbo concorda com sujeito plural: iniciativas contribuem.',                     competencia: 'C1' },
    { correto: 'afetam',        errado: 'afeta',          explicacao: 'Verbo concorda com sujeito plural: problemas afetam.',                           competencia: 'C1' },
    // Pontuação
    { correto: 'Brasil,',       errado: 'Brasil',         explicacao: 'Falta vírgula após adjunto adverbial deslocado.',                                competencia: 'C1' },
    { correto: 'qualidade,',    errado: 'qualidade',      explicacao: 'Vírgula necessária antes de conectivo explicativo.',                             competencia: 'C1' },
    { correto: 'atualmente,',   errado: 'atualmente',     explicacao: 'Adjunto adverbial deslocado deve ser isolado por vírgula.',                      competencia: 'C1' },
    { correto: 'população,',    errado: 'população',      explicacao: 'Vírgula necessária para separar orações.',                                       competencia: 'C1' },
    // Regência
    { correto: 'assistir aos',  errado: 'assistir os',    explicacao: '"Assistir" no sentido de ver exige preposição "a": assistir aos programas.',     competencia: 'C1' },
    { correto: 'implica',       errado: 'implica em',     explicacao: '"Implicar" no sentido de acarretar é transitivo direto, sem preposição.',        competencia: 'C1' },
    { correto: 'ir ao',         errado: 'ir no',          explicacao: 'O verbo "ir" exige preposição "a" (ir ao lugar), não "em".',                     competencia: 'C1' },
    // Crase
    { correto: 'às',            errado: 'as',             explicacao: 'Uso de crase antes de artigo feminino: às vezes, às pessoas.',                   competencia: 'C1' },
    { correto: 'à',             errado: 'a',              explicacao: 'Crase obrigatória antes de palavra feminina determinada: à educação.',           competencia: 'C1' },
    { correto: 'à medida que',  errado: 'a medida que',   explicacao: 'Locução "à medida que" sempre com crase.',                                       competencia: 'C1' }
];

// DICAS CONTEXTUAIS
const DICAS = {
    acentuacao: [
        '⚠️ Todas as proparoxítonas levam acento — sem exceção.',
        '⚠️ Verbos "ter" e "vir" na 3ª pessoa do plural levam acento circunflexo.',
        '⚠️ Oxítonas terminadas em A, E, O levam acento.'
    ],
    concordancia: [
        '⚠️ O verbo sempre concorda com o sujeito em número e pessoa.',
        '⚠️ Sujeitos compostos levam o verbo para o plural.',
        '⚠️ "Haver" no sentido de "existir" é impessoal — fica no singular.'
    ],
    crase: [
        '⚠️ Crase = preposição A + artigo A. Só antes de palavras femininas.',
        '⚠️ Troque por palavra masculina: se aparecer "AO", use crase.',
        '⚠️ Antes de verbo, pronome ou palavra masculina — sem crase.'
    ]
};

// UTILITÁRIOS
const rand  = (arr, excluir = []) => { const pool = arr.filter(i => !excluir.includes(i)); return pool[Math.floor(Math.random() * pool.length)]; };
const el    = id => document.getElementById(id);
const hide  = id => el(id)?.classList.add('hidden');
const show  = id => el(id)?.classList.remove('hidden');

// ── PERSISTÊNCIA ────────────────────────────────────────────────
function salvar() {
    try {
        localStorage.setItem('sawEnem2026', JSON.stringify({
            historico: STATE.historico,
            nivel:     STATE.nivel,
            xp:        STATE.xp,
            sequencia: STATE.sequencia
        }));
    } catch(e) { /* sem storage disponível */ }
}

function carregar() {
    try {
        const raw = localStorage.getItem('sawEnem2026');
        if (!raw) return;
        const d = JSON.parse(raw);
        STATE.historico = d.historico || [];
        STATE.nivel     = d.nivel     || 1;
        STATE.xp        = d.xp        || 0;
        STATE.sequencia = d.sequencia || 0;
        atualizarUI();
    } catch(e) { /* dados corrompidos */ }
}

// ── NOTIFICAÇÕES ────────────────────────────────────────────────
function notificar(msg, tipo = 'info') {
    const container = el('notificacoes-container');
    if (!container) return;

    const tipos = { success: 'sucesso', warning: 'aviso', error: 'erro' };
    const div = document.createElement('div');
    div.className = `notificacao ${tipos[tipo] || tipo}`;
    div.textContent = msg;
    container.appendChild(div);

    setTimeout(() => {
        div.classList.add('saindo');
        setTimeout(() => div.remove(), 380);
    }, 3200);
}

// SISTEMA DE ABAS
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

// MENU DRAWER
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

// BUSCA
const BUSCA_INDEX = [
    { termo: 'início home começo', aba: 'inicio',        label: 'Início' },
    { termo: 'competências c1 c2 c3 c4 c5 gramática norma', aba: 'competencias', label: 'Competências' },
    { termo: 'dicas conectivos coesão portanto ademais entretanto', aba: 'dicas',  label: 'Dicas & Conectivos' },
    { termo: 'temas assuntos educação meio ambiente saúde violência', aba: 'temas', label: 'Temas' },
    { termo: 'acessibilidade fonte contraste cursor leitor', aba: 'acessibilidade', label: 'Acessibilidade' },
    { termo: 'praticar exercício redação jogo treinar', aba: 'pratica', label: '🌾 Praticar Agora' },
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
        <div class="search-result-item" role="listitem" onclick="ativarAba('${r.aba}'); toggleBusca();" tabindex="0">
            <span>${r.label}</span>
            <span class="search-result-tab">${r.aba}</span>
        </div>
    `).join('');
}

// GERAÇÃO DE REDAÇÃO
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

    const intro = rand(tema.introducao);
    const d1    = rand(tema.desenvolvimento);
    const d2    = rand(tema.desenvolvimento, [d1]);
    const d3    = rand(tema.desenvolvimento, [d1, d2]);
    const conc  = rand(tema.conclusao);

    STATE.redacao = {
        titulo:      tema.titulo,
        dificuldade: tema.dificuldade,
        competencia: tema.competencia,
        paragrafos:  [intro, `${d1} ${d2}`, d3, conc].map((txt, i) => montarParagrafo(txt, i < 2 ? 3 : 2)),
        erros:       []
    };

    STATE.errosIdentif = [];
    renderizarRedacao();
    show('redacao-container');
    hide('resultado-container');
    notificar(`Jogo iniciado. Tema: ${tema.titulo}`, 'success');
}

// INSERIR ERROS NO TEXTO
function montarParagrafo(texto, qtd) {
    const palavras = texto.split(' ');
    const pool     = [...ERROS].sort(() => Math.random() - .5);
    const erros    = [];

    for (const erro of pool) {
        if (erros.length >= qtd) break;
        for (let j = 0; j < palavras.length; j++) {
            const limpa = palavras[j].replace(/[,.:;!?]/g, '');
            if (limpa.toLowerCase() === erro.correto.toLowerCase() && !erros.find(e => e.idx === j)) {
                const pont = palavras[j].match(/[,.:;!?]/g);
                palavras[j] = erro.errado + (pont ? pont.join('') : '');
                erros.push({ idx: j, id: `e${Date.now()}${j}`, correto: erro.correto, errado: erro.errado, explicacao: erro.explicacao, competencia: erro.competencia });
                break;
            }
        }
    }

    return { palavras, erros };
}

// RENDERIZAR REDAÇÃO
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
                html += `<span class="palavra-erro" id="${erro.id}" onclick="marcarPalavra('${erro.id}')">${palavra}</span> `;
            } else {
                html += `<span>${palavra}</span> `;
            }
        });
        html += '</p>';
    });

    const meta = `
        <div class="redacao-meta" style="margin-bottom:1.5rem;">
            <span class="meta-item"><span class="meta-icon">📊</span> Dificuldade: <strong>${r.dificuldade}</strong></span>
            <span class="meta-item"><span class="meta-icon">🎯</span> Competências: <strong>${r.competencia}</strong></span>
            <span class="meta-item"><span class="meta-icon">💀</span> Armadilhas: <strong>${r.erros.length}</strong></span>
        </div>`;

    c.innerHTML = meta + html;
}

// MARCAR PALAVRA
function marcarPalavra(id) {
    const elem = el(id);
    if (!elem) return;

    if (STATE.errosIdentif.includes(id)) {
        STATE.errosIdentif = STATE.errosIdentif.filter(x => x !== id);
        elem.classList.remove('palavra-clicada');
    } else {
        STATE.errosIdentif.push(id);
        elem.classList.add('palavra-clicada');
    }
}

// FINALIZAR ANÁLISE
function finalizarAnalise() {
    if (!STATE.redacao) return;
    if (!STATE.errosIdentif.length) {
        notificar('Você não marcou nenhuma armadilha. Observe o texto com cuidado.', 'warning');
        return;
    }

    const total    = STATE.redacao.erros.length;
    const corretos = STATE.errosIdentif.filter(id => STATE.redacao.erros.find(e => e.id === id));
    const perdidos = STATE.redacao.erros.filter(e => !STATE.errosIdentif.includes(e.id));
    const acertos  = corretos.length;
    const pct      = Math.round((acertos / total) * 100);

    let xpGanho = acertos * XP_POR_ERRO;
    if (pct === 100) {
        xpGanho += BONUS_PERF;
        STATE.sequencia++;
        notificar('🎭 ANÁLISE PERFEITA. Bônus de 50 XP concedido.', 'success');
    } else {
        STATE.sequencia = 0;
    }
    STATE.xp += xpGanho;

    while (STATE.xp >= XP_POR_NIVEL * STATE.nivel && STATE.nivel < 5) {
        STATE.nivel++;
        notificar(`⛓️ NÍVEL ${STATE.nivel}: ${NIVEIS[STATE.nivel].titulo}`, 'success');
    }

    STATE.historico.push({
        data:     new Date().toLocaleDateString('pt-BR'),
        tema:     STATE.redacao.titulo,
        acertos, total, pct, xpGanho
    });

    salvar();
    atualizarUI();
    destacarErros(corretos, perdidos);
    exibirResultado(acertos, total, pct, perdidos, xpGanho);
    el('resultado-container')?.scrollIntoView({ behavior: 'smooth' });
}

// DESTACAR ERROS NO TEXTO
function destacarErros(corretos, perdidos) {
    corretos.forEach(id => el(id)?.classList.add('erro-acerto'));
    perdidos.forEach(e  => {
        el(e.id)?.classList.remove('palavra-erro');
        el(e.id)?.classList.add('erro-perdido');
    });
}

// EXIBIR RESULTADO
function exibirResultado(acertos, total, pct, perdidos, xpGanho) {
    const msgs = [
        [90, '🎭 Quase me impressionou.',      'sucesso'],
        [70, '⛓️ Sobreviveu, por enquanto.',   'aviso'],
        [50, '🩸 Não é suficiente para viver.', 'aviso'],
        [ 0, '💀 Você falhou no teste.',        'erro']
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

    if (acertos > 0) {
        html += '<div class="secao-detalhes"><h5>✅ Armadilhas Identificadas</h5>';
        STATE.redacao.erros
            .filter(e => STATE.errosIdentif.includes(e.id))
            .forEach(e => {
                html += `
                    <div class="erro-item">
                        <p class="erro-titulo"><s>${e.errado}</s> → <strong>${e.correto}</strong>
                            <span class="badge badge-success">${e.competencia}</span>
                        </p>
                        <p class="erro-explicacao">${e.explicacao}</p>
                    </div>`;
            });
        html += '</div>';
    }

    if (perdidos.length > 0) {
        html += '<div class="secao-detalhes"><h5>💀 Armadilhas Que Você Não Viu</h5>';
        perdidos.forEach(e => {
            html += `
                <div class="erro-item">
                    <p class="erro-titulo"><s>${e.errado}</s> → <strong>${e.correto}</strong>
                        <span class="badge badge-pending">${e.competencia}</span>
                    </p>
                    <p class="erro-explicacao">${e.explicacao}</p>
                </div>`;
        });
        html += '</div>';

        const tipo = detectarTipoErro(perdidos[0]);
        if (DICAS[tipo]) {
            html += `<div class="alert alert-warning"><span>${rand(DICAS[tipo])}</span></div>`;
        }
    }

    el('resultado-detalhes').innerHTML = html;
    show('resultado-container');
}

function detectarTipoErro(erro) {
    const exp = erro.explicacao.toLowerCase();
    if (exp.includes('acento') || exp.includes('oxítona')) return 'acentuacao';
    if (exp.includes('concorda'))                           return 'concordancia';
    if (exp.includes('crase'))                              return 'crase';
    return null;
}

// REINICIAR PRÁTICA
function reiniciarPratica() {
    STATE.redacao      = null;
    STATE.errosIdentif = [];
    hide('redacao-container');
    hide('resultado-container');
    el('area-pratica')?.scrollIntoView({ behavior: 'smooth' });
}

// DICA RÁPIDA
function mostrarDica() {
    if (!STATE.redacao) return;
    const qtd = STATE.redacao.erros.length;
    notificar(`🎭 O texto contém ${qtd} armadilha${qtd !== 1 ? 's' : ''}. Examine cada palavra com cuidado.`, 'info');
}

// UI: NÍVEL & BARRA DE XP
function atualizarUI() {
    const nivel     = NIVEIS[STATE.nivel];
    const xpNivel   = XP_POR_NIVEL * STATE.nivel;
    const xpParcial = STATE.xp % xpNivel;
    const progresso = Math.round((xpParcial / xpNivel) * 100);

    const set = (id, val) => { const e = el(id); if (e) e.textContent = val; };
    set('nivel-numero',    STATE.nivel);
    set('nivel-titulo',    nivel.titulo);
    set('xp-atual',        STATE.xp);
    set('xp-total',        xpNivel);
    set('sequencia-atual', STATE.sequencia);

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
            <td>${p.tema}</td>
            <td>${p.acertos}/${p.total}</td>
            <td><strong>${p.pct}%</strong></td>
            <td>+${p.xpGanho}</td>
        </tr>`).join('');

    cont.innerHTML = `
        <div class="table-responsive">
            <table class="table-cronograma">
                <thead>
                    <tr><th>Data</th><th>Tema</th><th>Acertos</th><th>%</th><th>XP</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <p class="historico-total">${STATE.historico.length} práticas realizadas</p>`;
}

// EFEITO: PARTÍCULAS FLUTUANTES
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

    const gotas = ['💀', '🩸', '⛓️'];

    const criarGota = () => {
        const g   = document.createElement('span');
        g.textContent = gotas[Math.floor(Math.random() * gotas.length)];
        const size = 12 + Math.random() * 14;
        const dur  = 7  + Math.random() * 6;
        Object.assign(g.style, {
            position:       'absolute',
            top:            '-40px',
            left:           Math.random() * 100 + '%',
            fontSize:       size + 'px',
            opacity:        (0.06 + Math.random() * 0.1).toFixed(2),
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

// ── KEYFRAMES DINÂMICOS ─────────────────────────────────────────
function injetarKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quedaGota {
            0%   { transform: translateY(0) rotate(0deg);       opacity: inherit; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// MÓDULO DE ACESSIBILIDADE

const ACESS_KEY = 'enem2026_acess';

const ACESS_STATE = {
    tema:          'padrao',
    interfaceTema: 'sistema',
    fonteNivel:    0,     // -3 a +5 (passos de 10%)
    semAnimacoes:  false,
    espacamento:   false,
    cursorAmpliado: false,
    realcarFoco:   false,
    leitorVelocidade: 1.0,
    leitorTom:        1.0
};

const FONTE_PASSOS  = [-30, -20, -10, 0, 10, 20, 30, 40, 50];  // % relativo ao tamanho base
const FONTE_BASE_PX = 16;
function salvarAcess() {
    try { localStorage.setItem(ACESS_KEY, JSON.stringify(ACESS_STATE)); } catch(e) {}
}
function carregarAcess() {
    try {
        const raw = localStorage.getItem(ACESS_KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        Object.assign(ACESS_STATE, d);
        aplicarEstadoAcess();
    } catch(e) {}
}
function aplicarEstadoAcess() {
    aplicarTema(ACESS_STATE.tema, true);
    aplicarInterfaceTema(ACESS_STATE.interfaceTema, true);
    aplicarFonte(true);
    if (ACESS_STATE.semAnimacoes)   _setToggle('toggle-animacoes',    true);
    if (ACESS_STATE.espacamento)    _setToggle('toggle-espacamento',  true);
    if (ACESS_STATE.cursorAmpliado) _setToggle('toggle-cursor',       true);
    if (ACESS_STATE.realcarFoco)    _setToggle('toggle-foco',         true);

    _syncAnimacoes();
    _syncEspacamento();
    _syncCursor();
    _syncFoco();
    const sv = el('leitor-velocidade');
    const st = el('leitor-tom');
    if (sv) { sv.value = ACESS_STATE.leitorVelocidade; el('val-velocidade').textContent = ACESS_STATE.leitorVelocidade.toFixed(1) + 'x'; }
    if (st) { st.value = ACESS_STATE.leitorTom;        el('val-tom').textContent        = ACESS_STATE.leitorTom.toFixed(1); }
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
    const idx     = ACESS_STATE.fonteNivel + 3;   // offset para array 0-based
    const pct     = 100 + (FONTE_PASSOS[Math.min(idx, FONTE_PASSOS.length - 1)] || 0);
    const px      = (FONTE_BASE_PX * pct / 100).toFixed(1);
    document.documentElement.style.fontSize = px + 'px';
    const disp = el('display-fonte');
    if (disp) disp.textContent = pct + '%';
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
    return {
        padrao: 'Padrão',
        'alto-contraste': 'Alto Contraste',
        'alto-contraste-simples': 'Alto Contraste Simples',
        sepia: 'Sépia',
        protanopia: 'Protanopia',
        deuteranopia: 'Deuteranopia'
    }[k] || k;
}

function aplicarInterfaceTema(nome, silencioso = false) {
    const opcoes = ['claro', 'escuro', 'sistema'];
    const html = document.documentElement;
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
function _setToggle(id, estado) {
    const btn = el(id);
    if (!btn) return;
    btn.setAttribute('aria-checked', estado);
}
function _syncAnimacoes() {
    document.documentElement.classList.toggle('sem-animacoes', ACESS_STATE.semAnimacoes);
}
function _syncEspacamento() {
    document.documentElement.classList.toggle('espacamento-ampliado', ACESS_STATE.espacamento);
}
function _syncCursor() {
    document.documentElement.classList.toggle('cursor-ampliado', ACESS_STATE.cursorAmpliado);
}
function _syncFoco() {
    document.documentElement.classList.toggle('realcar-foco', ACESS_STATE.realcarFoco);
}

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
let _utterance = null;
let _lendoAtivo = false;

function atualizarVelocidade(val) {
    ACESS_STATE.leitorVelocidade = parseFloat(val);
    const disp = el('val-velocidade');
    if (disp) disp.textContent = parseFloat(val).toFixed(1) + 'x';
    salvarAcess();
}
function atualizarTom(val) {
    ACESS_STATE.leitorTom = parseFloat(val);
    const disp = el('val-tom');
    if (disp) disp.textContent = parseFloat(val).toFixed(1);
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
    if (!texto) {
        notificar('Cole ou digite um texto antes de iniciar a leitura.', 'warning');
        return;
    }

    window.speechSynthesis.cancel();

    _utterance          = new SpeechSynthesisUtterance(texto);
    _utterance.lang     = 'pt-BR';
    _utterance.rate     = ACESS_STATE.leitorVelocidade;
    _utterance.pitch    = ACESS_STATE.leitorTom;
    const vozes = window.speechSynthesis.getVoices();
    const vozPtBR = vozes.find(v => v.lang === 'pt-BR') || vozes.find(v => v.lang.startsWith('pt'));
    if (vozPtBR) _utterance.voice = vozPtBR;

    _utterance.onstart = () => {
        _lendoAtivo = true;
        _setBotoesLeitor(true);
        _setStatusLeitor('🔊 Lendo em voz alta...', 'lendo');
    };
    _utterance.onend = () => {
        _lendoAtivo = false;
        _setBotoesLeitor(false);
        _setStatusLeitor('✅ Leitura concluída!', 'concluido');
        setTimeout(() => _setStatusLeitor('', ''), 3000);
    };
    _utterance.onerror = (e) => {
        _lendoAtivo = false;
        _setBotoesLeitor(false);
        if (e.error !== 'interrupted') _setStatusLeitor('⚠️ Erro na leitura. Tente novamente.', '');
    };

    window.speechSynthesis.speak(_utterance);
}

function pausarLeitura() {
    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        _setStatusLeitor('🔊 Lendo em voz alta...', 'lendo');
        el('btn-pausar').querySelector('.acess-btn-icon').textContent = '⏸';
        el('btn-pausar').querySelector('.acess-btn-label').textContent = 'Pausar';
    } else {
        window.speechSynthesis.pause();
        _setStatusLeitor('⏸ Pausado', 'pausado');
        el('btn-pausar').querySelector('.acess-btn-icon').textContent = '▶';
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

document.addEventListener('DOMContentLoaded', () => {
    carregar();
    carregarAcess();
    injetarKeyframes();
    iniciarGotasDeSangue();
    const searchInput = el('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => realizarBusca(e.target.value));
        searchInput.addEventListener('keydown', e => {
            if (e.key === 'Escape') toggleBusca();
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const drawer = el('nav-drawer');
            if (drawer?.classList.contains('aberto')) fecharMenu();
        }
    });
    let _scrollAnterior = 0;
    let _scrollTimer    = null;
    const navbar        = el('main-navbar');
    const LIMIAR        = 80; // px antes de começar a esconder

    window.addEventListener('scroll', () => {
        const scrollAtual = window.scrollY;
        const drawer = el('nav-drawer');
        if (drawer?.classList.contains('aberto')) { _scrollAnterior = scrollAtual; return; }
        const searchBar = el('navbar-search-bar');
        if (searchBar?.classList.contains('aberta')) { _scrollAnterior = scrollAtual; return; }

        if (scrollAtual > LIMIAR && scrollAtual > _scrollAnterior) {
            navbar?.classList.add('navbar-oculta');
        } else {
            navbar?.classList.remove('navbar-oculta');
        }

        _scrollAnterior = scrollAtual;
        clearTimeout(_scrollTimer);
        _scrollTimer = setTimeout(() => {
            navbar?.classList.remove('navbar-oculta');
        }, 1200);
    }, { passive: true });

    console.log('%c🌾 ENEM 2026 — Seek souls. Larger, more powerful souls.', 'color:#888;font-weight:bold;font-size:14px;');
});
