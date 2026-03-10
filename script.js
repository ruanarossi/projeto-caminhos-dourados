document.addEventListener("DOMContentLoaded", () => {
  console.log("O site foi carregado corretamente!");

  /* ==========================================
     1. MENU MOBILE
     ========================================== */
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  /* ==========================================
     3. CARROSSEL DA FROTA (FLEET)
     ========================================== */
  const fleetData = [
    {
      title: "Ônibus Executivo",
      desc: "Ideal para viagens longas e grandes grupos. Nossa frota de ônibus executivos oferece o máximo em conforto e segurança, com poltronas reclináveis soft, climatização inteligente e amplo bagageiro.",
      features: [
        { text: "44 a 50 Lugares", icon: "fas fa-users" },
        { text: "Ar condicionado", icon: "fas fa-snowflake" },
        { text: "Frigobar", icon: "fas fa-glass-water" },
        { text: "Suspensão a ar", icon: "fas fa-wind" },
        { text: "DVD", icon: "fas fa-compact-disc" },
        { text: "Rádio", icon: "fas fa-music" },
        { text: "Microfone", icon: "fas fa-microphone" },
        { text: "Banheiro", icon: "fas fa-restroom" },
        { text: "100% monitorada", icon: "fas fa-video" },
      ],
      image: "imagens/bus2.png",
    },
    {
      title: "Micro-ônibus Premium",
      desc: "A solução perfeita para grupos médios e transfer corporativo. Agilidade no trânsito urbano sem abrir mão do conforto. Perfeito para eventos, city tours e deslocamentos de equipes.",
      features: [
        { text: "28 a 33 Lugares", icon: "fas fa-users" },
        { text: "Ar condicionado", icon: "fas fa-snowflake" },
        { text: "Frigobar", icon: "fas fa-glass-water" },
        { text: "Suspensão a ar", icon: "fas fa-wind" },
        { text: "DVD", icon: "fas fa-compact-disc" },
        { text: "Rádio", icon: "fas fa-music" },
        { text: "Microfone", icon: "fas fa-microphone" },
        { text: "100% monitorada", icon: "fas fa-video" },
      ],
      image: "imagens/bus2.png",
    },
    {
      title: "Vans Executivas",
      desc: "Exclusividade e rapidez para pequenos grupos. Nossas vans são equipadas para oferecer uma experiência VIP, ideal para receptivos em aeroportos e viagens curtas com total privacidade.",
      features: [
        { text: "15 a 20 Lugares", icon: "fas fa-users" },
        { text: "Ar condicionado", icon: "fas fa-snowflake" },
        { text: "Frigobar", icon: "fas fa-glass-water" },
        { text: "Suspensão a ar", icon: "fas fa-wind" },
        { text: "DVD", icon: "fas fa-compact-disc" },
        { text: "Rádio", icon: "fas fa-music" },
        { text: "Microfone", icon: "fas fa-microphone" },
        { text: "100% monitorada", icon: "fas fa-video" },
      ],
      image: "imagens/bus3.jpg",
    },
  ];

  // Seleção de elementos (agora segura dentro do DOMContentLoaded)
  const fleetTitle = document.getElementById("fleetTitle");
  const fleetDesc = document.getElementById("fleetDesc");
  const fleetFeatures = document.getElementById("fleetFeatures");
  const fleetImage = document.getElementById("fleetImage");
  const fleetDotsContainer = document.getElementById("fleetDots");
  const fleetTextContent = document.getElementById("fleetTextContent");

  let currentFleetIndex = 0;
  let fleetInterval;

  // Função para atualizar o slide
  function updateFleetSlide(index) {
    if (!fleetTitle || !fleetImage) return; // Proteção extra

    const data = fleetData[index];

    // Animação de imagem
    fleetImage.style.opacity = "0";
    setTimeout(() => {
      fleetImage.src = data.image;
      fleetImage.style.opacity = "1";
    }, 200);

    // Animação de texto
    if (fleetTextContent) {
      fleetTextContent.classList.remove("animate-text-up");
      void fleetTextContent.offsetWidth; // Força reinício da animação

      fleetTitle.textContent = data.title;
      fleetDesc.textContent = data.desc;

      if (fleetFeatures) {
        fleetFeatures.innerHTML = data.features
          .map((feat) => `<li><i class="${feat.icon}"></i> ${feat.text}</li>`)
          .join("");
      }

      fleetTextContent.classList.add("animate-text-up");
    }

    // Atualizar bolinhas
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentFleetIndex = index;
  }

  function goToFleetSlide(index) {
    updateFleetSlide(index);
    resetFleetAutoplay();
  }

  function startFleetAutoplay() {
    fleetInterval = setInterval(() => {
      let nextIndex = (currentFleetIndex + 1) % fleetData.length;
      updateFleetSlide(nextIndex); // Chama update direto para não resetar o timer excessivamente
    }, 5000);
  }

  function resetFleetAutoplay() {
    clearInterval(fleetInterval);
    startFleetAutoplay();
  }

  // Inicialização da Frota
  if (fleetDotsContainer && fleetTitle) {
    fleetDotsContainer.innerHTML = "";
    fleetData.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        goToFleetSlide(index);
      });

      fleetDotsContainer.appendChild(dot);
    });

    startFleetAutoplay();
  }

  /* ==========================================
     4. ANIMAÇÃO DE NÚMEROS (STATS)
     ========================================== */
  const statsSection = document.querySelector(".stats");
  const counters = document.querySelectorAll(".stat-number");
  let started = false; // Garante que a animação rode apenas uma vez

  function startCounting() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // Duração da animação em ms
      const increment = target / (duration / 20); // Passo baseado no tempo

      let current = 0;

      const prefix = target === 3 ? "" : "+";

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = prefix + Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = prefix + target;
        }
      };

      updateCounter();
    });
  }

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        startCounting();
        started = true;
      }
    });
    observer.observe(statsSection);
  }

  /* ==========================================
     5. BOTÃO VOLTAR AO TOPO
     ========================================== */
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ==========================================
     6. ANIMAÇÃO DE SCROLL (SERVIÇOS)
     ========================================== */
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-animate");
        }
      });
    },
    { threshold: 0.1 }, // Dispara quando 10% do elemento estiver visível
  );

  scrollElements.forEach((el) => scrollObserver.observe(el));

  /* ==========================================
     7. MODAL DE SERVIÇOS
     ========================================== */
  const servicesData = {
    escolar: {
      title: "Transporte Escolar",
      desc: "Oferecemos um serviço de transporte escolar completo, priorizando a segurança e o bem-estar dos estudantes. Nossos veículos são inspecionados regularmente e nossos monitores garantem a tranquilidade dos pais desde o embarque até o desembarque na escola ou em casa.",
      benefits: [
        "Segurança total com cinto de segurança em todos os bancos",
        "Motoristas experientes e defensivos",
        "Veículos revisados periodicamente",
        "Rotas organizadas para menor tempo de trajeto",
        "Monitoramento em tempo real",
      ],
      icon: "fas fa-school",
    },
    tfd: {
      title: "Transporte TFD",
      desc: "O Tratamento Fora de Domicílio exige cuidado especial. Nosso serviço é focado em oferecer uma viagem tranquila e confortável para pacientes, com total pontualidade para garantir que nenhum compromisso médico seja perdido.",
      benefits: [
        "Conforto extra com poltronas reclináveis",
        "Pontualidade rigorosa para consultas",
        "Atendimento humanizado e respeitoso",
        "Climatização adequada",
        "Apoio no embarque e desembarque",
      ],
      icon: "fas fa-heartbeat",
    },
    urbano: {
      title: "Transporte Urbano",
      desc: "Conectamos a cidade com eficiência. Nossas rotas urbanas são planejadas para oferecer a melhor mobilidade para a população, com horários consistentes e veículos limpos e conservados.",
      benefits: [
        "Rotas otimizadas para evitar atrasos",
        "Agilidade no deslocamento diário",
        "Preço acessível e justo",
        "Veículos com acessibilidade",
        "Integração com principais pontos da cidade",
      ],
      icon: "fas fa-bus",
    },
  };

  const modalOverlay = document.getElementById("serviceModal");
  const closeModalBtn = document.querySelector(".close-modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalBenefitsList = document.getElementById("modalBenefitsList");
  const modalIcon = document.getElementById("modalIcon");
  const detailButtons = document.querySelectorAll(".btn-details");

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalIcon.className = data.icon;

    modalBenefitsList.innerHTML = data.benefits
      .map(
        (benefit) =>
          `<li><i class="fas fa-check-circle" style="color: var(--secondary); margin-right: 10px;"></i> ${benefit}</li>`,
      )
      .join("");

    modalOverlay.classList.add("active");
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
  }

  if (modalOverlay) {
    detailButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const serviceKey = btn.getAttribute("data-service");
        openModal(serviceKey);
      });
    });

    closeModalBtn.addEventListener("click", closeModal);

    // Fechar ao clicar fora do modal
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Fechar com a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
      }
    });
  }

  /* ==========================================
     8. HOVER DOS ÍCONES DE SERVIÇO (GIF)
     ========================================== */
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const img = card.querySelector(".service-icon img");
    if (img) {
      const staticSrc = img.src;
      const gifSrc = img.getAttribute("data-gif");

      card.addEventListener("mouseenter", () => {
        if (gifSrc) img.src = gifSrc;
      });

      card.addEventListener("mouseleave", () => {
        if (gifSrc) img.src = staticSrc;
      });
    }
  });
});
