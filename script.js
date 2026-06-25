/* ============================================================
   TEMPO JUNTOS — atualiza a cada segundo
   Mude a DATA_INICIO para a data de vocês (ano, mês-1, dia)
   mês-1 porque em JS janeiro = 0, então outubro = 9
   ============================================================ */
const DATA_INICIO = new Date(2023, 9, 26); // 26/10/2023

function atualizarTempo() {
  const agora  = new Date();
  const diff   = agora - DATA_INICIO; // ms

  let anos  = agora.getFullYear() - DATA_INICIO.getFullYear();
  let meses = agora.getMonth()    - DATA_INICIO.getMonth();
  let dias  = agora.getDate()     - DATA_INICIO.getDate();

  if (dias  < 0) { meses--; dias  += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate(); }
  if (meses < 0) { anos--;  meses += 12; }

  const totalSeg  = Math.floor(diff / 1000);
  const horas     = Math.floor((totalSeg % 86400) / 3600);
  const minutos   = Math.floor((totalSeg % 3600)  / 60);
  const segundos  = totalSeg % 60;

  document.getElementById('t-anos').textContent  = anos;
  document.getElementById('t-meses').textContent = meses;
  document.getElementById('t-dias').textContent  = dias;
  document.getElementById('t-horas').textContent = String(horas).padStart(2,'0');
  document.getElementById('t-min').textContent   = String(minutos).padStart(2,'0');
  document.getElementById('t-seg').textContent   = String(segundos).padStart(2,'0');
}
atualizarTempo();
setInterval(atualizarTempo, 1000);

/* ============================================================
   QUANTO EU TE AMO — slider
   Edite as frases no array NIVEIS abaixo à vontade!
   Cada entrada tem: ate (valor 0-100), emoji e texto.
   ============================================================ */
const NIVEIS = [
  { ate:  0,  emoji: '🤔', texto: 'arrasta pra descobrir…' },
  { ate:  8,  emoji: '😊', texto: 'um pouquinho… brincadeira, muito mais que isso!' },
  { ate: 18,  emoji: '🥰', texto: 'te amo mais do que comer docinhos' },
  { ate: 28,  emoji: '💕', texto: 'te amo mais do que qualquer filme que a gente ja tenha assistido juntos.' },
  { ate: 38,  emoji: '😍', texto: 'te amo mais do que você odeia os capetinhas do colégio.' },
  { ate: 48,  emoji: '💗', texto: 'te amo mais do que nós ja vimos de MasterChefs juntos.' },
  { ate: 58,  emoji: '💝', texto: 'te amo mais do que nós gostamos de ficar agarradinhos na coberta no frio.' },
  { ate: 68,  emoji: '💞', texto: 'te amo mais do que consigo colocar em palavras, e olha que tentei.' },
  { ate: 78,  emoji: '🌺', texto: 'te amo tanto que fico doidinho só de lembrar do seu cheirinho.' },
  { ate: 88,  emoji: '😋', texto: 'te amo muito mais do que você me ama...!' },
  { ate: 98,  emoji: '🚀', texto: 'chegando perto do infinito… mas ainda não chegou!' },
  { ate: 100, emoji: '∞',  texto: 'INFINITO. Te amo infinitamente, imensamente, completamente. Sempre. 💗' },
];

let ultimoNivel = -1;
let infinitoBloqueado = false;

function dispararKaboom() {
  const container = document.getElementById('infinito-kaboom');
  container.innerHTML = '';
  const emojis = ['💗','💕','💝','💞','🌸','✨','💫'];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('span');
    el.classList.add('kaboom-coracao');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left   = Math.random() * 80 + '%';
    el.style.bottom = Math.random() * 30 + '%';
    el.style.animationDelay = (Math.random() * 0.5) + 's';
    el.style.fontSize = (1 + Math.random()) + 'rem';
    container.appendChild(el);
  }
  setTimeout(() => container.innerHTML = '', 2000);
}

document.getElementById('slider-amor').addEventListener('input', function() {
  const val = parseInt(this.value);

  let nivel = NIVEIS[0];
  for (const n of NIVEIS) {
    if (val >= n.ate) nivel = n;
  }

  const idx = NIVEIS.indexOf(nivel);
  if (idx !== ultimoNivel) {
    ultimoNivel = idx;
    const resposta = document.getElementById('amor-resposta');
    resposta.style.opacity = '0';
    setTimeout(() => {
      document.getElementById('amor-emoji').textContent = nivel.emoji;
      document.getElementById('amor-texto').textContent = nivel.texto;
      resposta.style.opacity = '1';
    }, 200);

    if (val === 100 && !infinitoBloqueado) {
      infinitoBloqueado = true;
      setTimeout(() => { dispararKaboom(); infinitoBloqueado = false; }, 300);
    }
  }
});

/* ============================================================
   FRASES — adicione, remova ou edite à vontade!
   Cada frase vai entre aspas e separada por vírgula.
   Você pode colocar memórias, elogios, piadas internas...
   ============================================================ */
const frases = [
  "Seu sorriso é literalmente o sorriso mais lindo do universo. Fato científico.",
  "Sabia que hoje o mundo ficou melhor só por você existir?",
  "Você tem o dom de transformar dias cinzas em dias coloridos sabia? 🌈",

  /* ---- MEMÓRIAS DE VOCÊS — mude para as de vocês! ---- */
  "Lembra daquela vez em que eu estourei o macarrão e você ri de mim até hoje, e eu amo isso.",
  "Cada noite que passei a mais depois do genezia, eu sei que valeu 100%, eu adoro quem você é 😘.",
  "Cada detalhe seu que eu fui descobrindo me fez querer te conhecer ainda mais.",

  /* ---- ELOGIOS ---- */
  "Você é mais forte do que imagina, mais incrível do que acredita e mais amada do que percebe.",
  "Sua beleza ilumina meu coração, seu sorriso ilumina minha alma ❤️",
  "Sua risada é meu som favorito. Não é exagero, é verdade mesmo.",
  "Seu cheirinho natural me deixa completamente doidinho, é maravilhoso ❤️",

  /* ---- BOBEIRAS FOFAS ---- */
  "Cientistas confirmaram: Seu punzinho é uma das coisas mais fofas do mundo 🥰",
  "Você fez com que eu começasse a escutar divas pops, realmente escuto até hoje 🎵.",
  "Você é tipo combo da empórios quentinho numa noite fria debaixo da coberta com meu momo 🥰.",

  /* ---- ADICIONE MAIS AQUI ---- */
  /* "Sua frase personalizada aqui!", */
];

/* ============================================================
   LÓGICA DO BOTÃO PRINCIPAL
   ============================================================ */
let ultimaFrase = -1;
let totalCliques = 0;

function sortearFrase() {
  if (frases.length === 0) return;

  let idx;
  do { idx = Math.floor(Math.random() * frases.length); }
  while (idx === ultimaFrase && frases.length > 1);
  ultimaFrase = idx;

  totalCliques++;

  const el    = document.getElementById('frase');
  const caixa = document.getElementById('caixa-frase');

  caixa.style.opacity = '0';
  setTimeout(() => {
    el.textContent = frases[idx];
    caixa.style.opacity = '1';
  }, 250);

  document.getElementById('contador').textContent =
    totalCliques === 1
      ? '1 motivo descoberto hoje 💛'
      : `${totalCliques} motivos descobertos hoje 💛`;
}

/* ============================================================
   CORAÇÃO QUE CRESCE A CADA CLIQUE
   ============================================================ */
let tamanhoCoracao = 3.0; // rem inicial
let cliquesCoracao = 0;

function crescerCoracao() {
  cliquesCoracao++;
  tamanhoCoracao = Math.min(tamanhoCoracao + 0.35, 9.0); // máximo 9rem

  const el   = document.getElementById('coracao');
  const hint = document.getElementById('tamanho-hint');

  el.style.fontSize = tamanhoCoracao + 'rem';
  el.classList.remove('pulsar');
  void el.offsetWidth; // força reflow para reiniciar a animação
  el.classList.add('pulsar');

  hint.textContent = tamanhoCoracao >= 9.0
    ? '💛 maior não dá mais!'
    : `${cliquesCoracao} clique${cliquesCoracao > 1 ? 's' : ''} ↑`;

  /* Ativa easter egg no 7º clique */
  if (cliquesCoracao === 7) {
    setTimeout(abrirEasterEgg, 400);
  }
}

/* ============================================================
   EASTER EGG
   ============================================================ */
function abrirEasterEgg() {
  document.getElementById('easter-egg').classList.add('ativo');
}

function fecharEasterEgg() {
  document.getElementById('easter-egg').classList.remove('ativo');
}

/* Fechar ao clicar fora da caixa */
document.getElementById('easter-egg').addEventListener('click', function(e) {
  if (e.target === this) fecharEasterEgg();
});

/* Fechar com tecla Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharEasterEgg();
});

/* ============================================================
   ESTRELINHAS DE FUNDO (canvas animado)
   ============================================================ */
(function() {
  const canvas = document.getElementById('estrelas');
  const ctx    = canvas.getContext('2d');
  let W, H, estrelas;
  const N = 55;

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    estrelas = Array.from({ length: N }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 2.2 + 0.5,
      a:  Math.random() * Math.PI * 2,
      v:  (Math.random() - 0.5) * 0.3,
      op: Math.random() * 0.5 + 0.15,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    estrelas.forEach(s => {
      s.a += s.v * 0.04;
      const op = s.op * (0.7 + 0.3 * Math.sin(s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,91,138,${op})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', init);
  init();
  draw();
})();