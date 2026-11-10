document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
       LISTE DES JEUX
    ========================================================= */

  const games = [
    {
      image: "958C927B-668F-4AEB-B283-6F3CD54965E0.webp",
      jeu: "Château Falkenstein",
      date: "Janvier 2026",
    },
    {
      image: "20260117_152401.webp",
      jeu: "Némésis",
      date: "Janvier 2026",
    },
    {
      image: "20261024_142850.webp",
      jeu: "Witcher",
      date: "Octobre 2026",
    },
    {
      image: "20261024_142937.jpg",
      jeu: "Witcher",
      date: "Novembre 2026",
    },
    {
      image: "hg.png",
      jeu: "Zombiology",
      date: "Novembre 2026",
    },
    {
      image: "IMG_0770.jpg",
      jeu: "Cthulhu chroniques oubliées",
      date: "Août 2025",
    },
    {
      image: "IMG_1438.jpg",
      jeu: "Les chants de Tindalos",
      date: "Décembre 2025",
    },
    {
      image: "IMG_2111.webp",
      jeu: "Heroquest",
      date: "Avril 2026",
    },
    {
      image: "IMG_3393.JPEG",
      jeu: "Knight",
      date: "Août 2026",
    },
    {
      image: "IMG_3404.JPEG",
      jeu: "Knight",
      date: "Août 2026",
    },
    {
      image: "IMG_3754.webp",
      jeu: "Monster of the week",
      date: "Avril 2026",
    },
    {
      image: "IMG_3866.jpg",
      jeu: "Zombiology",
      date: "Novembre 2026",
    },
    {
      image: "IMG_4202.webp",
      jeu: "Fallout III",
      date: "Mai 2026",
    },
    {
      image: "IMG_4415.webp",
      jeu: "Betrayal at house on the hills",
      date: "Avril 2026",
    },
    {
      image: "IMG_4544.jpg",
      jeu: "Les captifs de la sorcière dormante",
      date: "Juillet 2026",
    },
    {
      image: "IMG_4824.png",
      jeu: "Alien",
      date: "Février 2026",
    },
    {
      image: "IMG_5008.jpg",
      jeu: "Les chants de Tindalos",
      date: "Décembre 2025",
    },
    {
      image: "IMG_5695.jpg",
      jeu: "Les chants de Tindalos",
      date: "Décembre 2025",
    },
    {
      image: "IMG_6254.jpg",
      jeu: "Knight",
      date: "Juin 2026",
    },
    {
      image: "IMG_20251114_201248.jpg",
      jeu: "Dead of Winter",
      date: "Décembre 2025",
    },
  ];

  /* =========================================================
       MÉLANGE ALÉATOIRE DES PHOTOS
    ========================================================= */

  function shuffleGames(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  const shuffledGames = shuffleGames(games);

  /* =========================================================
       RÉCUPÉRATION DES ÉLÉMENTS HTML
    ========================================================= */

  const carouselTrack = document.querySelector("#carousel-track");
  const carouselCounter = document.querySelector("#carousel-counter");
  const carouselPrev = document.querySelector("#carousel-prev");
  const carouselNext = document.querySelector("#carousel-next");
  const carouselWrapper = document.querySelector(".carousel-wrapper");

  if (
    !carouselTrack ||
    !carouselCounter ||
    !carouselPrev ||
    !carouselNext ||
    !carouselWrapper
  ) {
    return;
  }

  /* =========================================================
       VARIABLES
    ========================================================= */

  let currentIndex = 0;
  let autoCarousel = null;

  const autoDelay = 3000;
  const cards = [];

  /* =========================================================
       CRÉATION DES CARTES
    ========================================================= */

  shuffledGames.forEach((game) => {
    const card = document.createElement("article");
    card.classList.add("carousel-card");

    // Image
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("carousel-image-wrapper");

    const image = document.createElement("img");

    image.src = `assets/images/caroussel/${game.image}`;
    image.alt = game.jeu;
    image.loading = "lazy";

    imageWrapper.appendChild(image);

    // Titre et date
    const caption = document.createElement("div");
    caption.classList.add("carousel-caption");

    const title = document.createElement("h3");
    title.textContent = game.jeu;

    caption.appendChild(title);

    if (game.date) {
      const date = document.createElement("p");
      date.classList.add("carousel-date");
      date.textContent = game.date;

      caption.appendChild(date);
    }

    // Assemblage
    card.appendChild(imageWrapper);
    card.appendChild(caption);

    carouselTrack.appendChild(card);
    cards.push(card);
  });

  /* =========================================================
       AFFICHAGE D'UNE DIAPOSITIVE
    ========================================================= */

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = shuffledGames.length - 1;
    } else if (index >= shuffledGames.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    cards.forEach((card, cardIndex) => {
      card.classList.toggle("active", cardIndex === currentIndex);
    });

    carouselCounter.textContent = `${currentIndex + 1} / ${shuffledGames.length}`;
  }

  /* =========================================================
       BOUTON PRÉCÉDENT
    ========================================================= */

  carouselPrev.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    restartAutoCarousel();
  });

  /* =========================================================
       BOUTON SUIVANT
    ========================================================= */

  carouselNext.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    restartAutoCarousel();
  });

  /* =========================================================
       CARROUSEL AUTOMATIQUE
    ========================================================= */

  function startAutoCarousel() {
    stopAutoCarousel();

    autoCarousel = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoDelay);
  }

  function stopAutoCarousel() {
    if (autoCarousel !== null) {
      clearInterval(autoCarousel);
      autoCarousel = null;
    }
  }

  function restartAutoCarousel() {
    startAutoCarousel();
  }

  /* =========================================================
       PAUSE AU SURVOL
    ========================================================= */

  carouselWrapper.addEventListener("mouseenter", () => {
    stopAutoCarousel();
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    startAutoCarousel();
  });

  /* =========================================================
       INITIALISATION
    ========================================================= */

  goToSlide(0);
  startAutoCarousel();
});
