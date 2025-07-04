document.addEventListener("DOMContentLoaded", function () {
  const scrollButton = document.getElementById("scrollButton");
  const scrollText = document.getElementById("scrollText");
  const scrollIcon = document.getElementById("scrollIcon");

  const sections = ["about", "skills", "contact"];
  let currentIndex = 0;
  let goBackMode = false;

  scrollButton.addEventListener("click", () => {
    scrollButton.classList.add("fade");

    setTimeout(() => {
      if (!goBackMode) {
        if (currentIndex < sections.length) {
          document.getElementById(sections[currentIndex]).scrollIntoView({ behavior: "smooth" });
          currentIndex++;
        }

        if (currentIndex === sections.length) {
          scrollText.textContent = "Go Back";
          goBackMode = true;
        }
      } else {
        document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
        scrollText.textContent = "More About Me";
        currentIndex = 0;
        goBackMode = false;
      }

      scrollButton.classList.remove("fade");
    }, 150);
  });

  // ========= Intro Text & Social Icons Animation =========
  setTimeout(() => {
    const intro = document.querySelector('.brief-intro');
    const socials = document.querySelector('.social-circles');
    if (intro) {
      intro.style.display = 'block';
      setTimeout(() => {
        intro.classList.add('show');
        setTimeout(() => socials.classList.add('pop-animate'), 1000);
      }, 10);
    }
  }, 7000);

  // ========= About Section Reveal on Scroll =========
  const introSection = document.querySelector('.intro-section');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + window.innerHeight;
    const sectionTop = introSection.offsetTop;
    if (scrollY >= sectionTop + 100) {
      introSection.classList.add('show');
    }
  });

  // ========= Animate Skill Bars and Circle Charts =========
  const animateSkillsOnScroll = () => {
    const bars = document.querySelectorAll('.bar-fill');
    const charts = document.querySelectorAll('.circle-chart');

    bars.forEach(bar => {
      if (isInViewport(bar) && !bar.classList.contains('animate')) {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--target-width', width);
        bar.classList.add('animate');
      }
    });

    charts.forEach(chart => {
      if (isInViewport(chart) && !chart.classList.contains('visible')) {
        const percent = chart.getAttribute('data-percent');
        chart.classList.add('visible');

        let current = 0;
        const fill = () => {
          if (current <= percent) {
            chart.style.background = `conic-gradient(#00ffee ${current}%, #2d2d2d ${current}%)`;
            current++;
            requestAnimationFrame(fill);
          }
        };
        requestAnimationFrame(fill);
      }
    });
  };

  const isInViewport = element => {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  window.addEventListener('scroll', animateSkillsOnScroll);
  window.addEventListener('load', animateSkillsOnScroll);

  // ========= Netlify Contact Form Message Handler =========
  const form = document.forms['contact'];
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => {
          const name = document.getElementById("name").value;
          document.getElementById("responseMsg").textContent = `✅ Thank you, ${name}! Your message has been sent.`;
          form.reset();
        })
        .catch((error) => {
          document.getElementById("responseMsg").textContent = "❌ Something went wrong. Please try again.";
          console.error("Form submission error:", error);
        });
    });
  }
});