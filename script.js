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
     2. CARROSSEL DE DEPOIMENTOS
     ========================================== */
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

  if (nextBtn && cards.length > 0) {
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
     3. CARROSSEL DA FROTA (FLEET)
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
      image: "imagens/bus2.png",
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
      image: "imagens/bus2.png",
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

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = "+" + Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = "+" + target;
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
});
