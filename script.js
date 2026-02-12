const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const companySelect = document.getElementById("companySelect");

// Verificação para evitar erros na tela de entrada (onde o menu não existe)
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

const empresas = {
  caminhos: {
    nome: "Caminhos Dourados",
    slogan: "Transporte seguro, eficiente e confortável para sua rotina",
    logo: "imagens/logo.png",
    hero: "imagens/hero.png",
    email: "contato@caminhosdourados.com",
    telefone: "(00) 00000-0000",
    endereco: "Rua Exemplo, 123",
    cores: {
      primary: "#033859",
      secondary: "#F2B705",
      accent: "#D98E04",
      highlight: "#D96704",
    },
  },

  empresaB: {
    nome: "Empresa B",
    slogan: "Soluções modernas em transporte e mobilidade",
    logo: "imagens/logo-b.png",
    hero: "imagens/hero-b.png",
    email: "contato@empresab.com",
    telefone: "(11) 99999-9999",
    endereco: "Av. Principal, 456",
    cores: {
      primary: "#225C73",
      secondary: "#6A9BA6",
      accent: "#A69D8D",
      highlight: "#58594F",
    },
  },
};

function trocarEmpresa(empresaKey, salvar = true) {
  const empresa = empresas[empresaKey];

  document.getElementById("logoEmpresa").src = empresa.logo;
  document.getElementById("empresaNome").textContent = empresa.nome;
  document.getElementById("empresaSlogan").textContent = empresa.slogan;
  document.getElementById("empresaEmail").textContent =
    `Email: ${empresa.email}`;
  document.getElementById("empresaTelefone").textContent =
    `Telefone: ${empresa.telefone}`;
  document.getElementById("empresaEndereco").textContent =
    `Endereço: ${empresa.endereco}`;

  document.getElementById("heroSection").style.background =
    `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${empresa.hero}) center/cover no-repeat`;

  document.documentElement.style.setProperty(
    "--primary",
    empresa.cores.primary,
  );
  document.documentElement.style.setProperty(
    "--secondary",
    empresa.cores.secondary,
  );
  document.documentElement.style.setProperty("--accent", empresa.cores.accent);
  document.documentElement.style.setProperty(
    "--highlight",
    empresa.cores.highlight,
  );

  // Garante que o select mostre a opção correta
  companySelect.value = empresaKey;

  if (salvar) {
    localStorage.setItem("empresaAtiva", empresaKey);
  }
}

if (companySelect) {
  // Define a opção selecionada com base na página atual para garantir a navegação correta
  if (window.location.href.includes("empresaB.html")) {
    companySelect.value = "empresaB";
  } else {
    companySelect.value = "caminhos";
  }

  companySelect.addEventListener("change", (e) => {
    if (e.target.value === "empresaB") {
      window.location.href = "empresaB.html";
    } else {
      window.location.href = "empresaA.html";
    }
  });
}

/* LÓGICA DO CARROSSEL DE DEPOIMENTOS */
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;

function updateCarousel() {
  const container = document.querySelector(".carousel-track-container");
  if (container && track) {
    const width = container.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
}

if (track) {
  window.addEventListener("resize", updateCarousel);
}

/* ==========================================
   LÓGICA DA TELA DE ENTRADA (GATEWAY)
   ========================================== */
function navigateTo(url) {
  // Efeito visual de saída (fade-out)
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  // Aguarda a transição antes de mudar de página
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

/* ==========================================
   EFEITOS VISUAIS DA TELA DE ENTRADA
   ========================================== */
const cardA = document.querySelector(".gateway-card.card-a");
const cardB = document.querySelector(".gateway-card.card-b");
const body = document.body;

// Verifica se os elementos existem (para não dar erro em outras páginas)
if (cardA && cardB && body) {
  // Eventos para Empresa A (Dia)
  cardA.addEventListener("mouseenter", () => body.classList.add("hover-a"));
  cardA.addEventListener("mouseleave", () => body.classList.remove("hover-a"));

  // Eventos para Empresa B (Noite)
  cardB.addEventListener("mouseenter", () => body.classList.add("hover-b"));
  cardB.addEventListener("mouseleave", () => body.classList.remove("hover-b"));
}

/* ==========================================
   LÓGICA DA NOVA SEÇÃO DE FROTA (CARROSSEL + TEXTO)
   ========================================== */

const fleetData = [
  {
    title: "Ônibus Executivo",
    desc: "Ideal para viagens longas e grandes grupos. Nossa frota de ônibus executivos oferece o máximo em conforto e segurança, com poltronas reclináveis soft, climatização inteligente e amplo bagageiro.",
    features: [
      { text: "44 a 50 Lugares", icon: "fas fa-users" },
      { text: "Poltronas reclináveis", icon: "fas fa-couch" },
      { text: "Ar condicionado", icon: "fas fa-snowflake" },
      { text: "USB", icon: "fas fa-bolt" },
      { text: "Bagageiro Amplo", icon: "fas fa-suitcase" },
      { text: "Banheiro", icon: "fas fa-restroom" },
    ],
    image: "imagens/bus.png", // Usando imagem do contexto
  },
  {
    title: "Micro-ônibus Premium",
    desc: "A solução perfeita para grupos médios e transfer corporativo. Agilidade no trânsito urbano sem abrir mão do conforto. Perfeito para eventos, city tours e deslocamentos de equipes.",
    features: [
      { text: "28 a 33 Lugares", icon: "fas fa-users" },
      { text: "Poltronas Reclináveis", icon: "fas fa-couch" },
      { text: "Ar condicionado", icon: "fas fa-snowflake" },
      { text: "USB", icon: "fas fa-bolt" },
    ],
    image: "imagens/bus2.png", // Usando imagem do contexto
  },
  {
    title: "Vans Executivas",
    desc: "Exclusividade e rapidez para pequenos grupos. Nossas vans são equipadas para oferecer uma experiência VIP, ideal para receptivos em aeroportos e viagens curtas com total privacidade.",
    features: [
      { text: "15 a 20 Lugares", icon: "fas fa-users" },
      { text: "Poltronas reclináveis", icon: "fas fa-couch" },
      { text: "Ar condicionado", icon: "fas fa-snowflake" },
      { text: "Vidros Escuros", icon: "fas fa-eye-slash" },
      { text: "USB", icon: "fas fa-bolt" },
    ],
    image: "imagens/bus3.jpg", // Usando imagem do contexto
  },
];

const fleetTitle = document.getElementById("fleetTitle");
const fleetDesc = document.getElementById("fleetDesc");
const fleetFeatures = document.getElementById("fleetFeatures");
const fleetImage = document.getElementById("fleetImage");
const fleetDotsContainer = document.getElementById("fleetDots");
const fleetTextContent = document.getElementById("fleetTextContent");

let currentFleetIndex = 0;
let fleetInterval;

function initFleetCarousel() {
  if (!fleetTitle || !fleetImage) return; // Evita erro se a seção não existir

  // Criar os dots (bolinhas)
  fleetDotsContainer.innerHTML = "";
  fleetData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToFleetSlide(index);
      resetFleetAutoplay();
    });
    fleetDotsContainer.appendChild(dot);
  });

  // Iniciar autoplay
  startFleetAutoplay();
}

function updateFleetSlide(index) {
  const data = fleetData[index];

  // 1. Animação de Saída/Entrada da Imagem (Simples troca de src com fade visual via CSS transition)
  fleetImage.style.opacity = "0";

  setTimeout(() => {
    fleetImage.src = data.image;
    fleetImage.style.opacity = "1";
  }, 200); // Pequeno delay para o efeito de fade

  // 2. Atualizar Texto com Animação
  // Remove a classe de animação para poder reiniciar
  fleetTextContent.classList.remove("animate-text-up");

  // Força o reflow (reinicia o ciclo de renderização do elemento)
  void fleetTextContent.offsetWidth;

  // Atualiza o conteúdo
  fleetTitle.textContent = data.title;
  fleetDesc.textContent = data.desc;

  // Atualiza features
  fleetFeatures.innerHTML = data.features
    .map((feat) => `<li><i class="${feat.icon}"></i> ${feat.text}</li>`)
    .join("");

  // Adiciona a classe de animação novamente
  fleetTextContent.classList.add("animate-text-up");

  // 3. Atualizar Dots
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentFleetIndex = index;
}

function goToFleetSlide(index) {
  updateFleetSlide(index);
}

function startFleetAutoplay() {
  fleetInterval = setInterval(() => {
    let nextIndex = (currentFleetIndex + 1) % fleetData.length;
    goToFleetSlide(nextIndex);
  }, 5000); // Troca a cada 5 segundos
}

function resetFleetAutoplay() {
  clearInterval(fleetInterval);
  startFleetAutoplay();
}

// Inicializa o carrossel quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", initFleetCarousel);
