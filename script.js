/* ============================================================
   FRASES — adicione, remova ou edite à vontade!
   Cada frase vai entre aspas e separada por vírgula.
   Você pode colocar memórias, elogios, piadas internas...
   ============================================================ */
const frases = [
  "Seu sorriso é literalmente o melhor sorriso do universo. Fato científico.",
  "Sabia que hoje o mundo ficou melhor só por você existir?",
  "Você tem o dom de transformar dias cinzas em dias dourados 💛",

  /* ---- MEMÓRIAS DE VOCÊS — mude para as de vocês! ---- */
  "Lembra daquela vez que você riu tanto que não conseguia mais parar? Esse momento é meu favorito.",
  "Naquele dia que a gente ficou conversando até tarde… eu não queria que acabasse nunca.",
  "Cada detalhe seu que eu fui descobrindo me fez querer te conhecer ainda mais.",

  /* ---- ELOGIOS ---- */
  "Você é mais forte do que imagina, mais incrível do que acredita e mais amada do que percebe.",
  "Tem gente que ilumina o lugar onde entra. Você é exatamente essa pessoa.",
  "Sua risada é meu som favorito. Não é exagero, é verdade mesmo.",
  "Você cuida das pessoas com uma delicadeza que é rara demais. Isso é um superpoder.",

  /* ---- BOBEIRAS FOFAS ---- */
  "Cientistas confirmaram: abraço seu tem +300% de eficácia contra dias ruins.",
  "Se você fosse uma música, seria aquela que fica na cabeça do jeito bom.",
  "Você é tipo café quentinho numa manhã fria. Essencial e reconfortante.",

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
