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
