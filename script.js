document.addEventListener('DOMContentLoaded', () => {
  // Alterna submenu ao clicar
  document.querySelectorAll('.menu-toggle').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      const parentLi = this.parentElement;

      // Fecha outros menus abertos
      document.querySelectorAll('.menu li').forEach(li => {
        if (li !== parentLi) {
          li.classList.remove('ativo');
        }
      });

      // Alterna o submenu clicado
      parentLi.classList.toggle('ativo');
    });
  });

  // Ativa visualmente o item clicado no menu
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.menu li').forEach(li => {
        li.classList.remove('ativo');
      });
      this.parentElement.classList.add('ativo');
    });
  });

  // Fecha o submenu ao clicar fora do menu
  document.addEventListener('click', function (e) {
    const isClickInside = e.target.closest('.menu');
    if (!isClickInside) {
      document.querySelectorAll('.menu li').forEach(li => {
        li.classList.remove('ativo');
      });
    }
  });

  // Carousel
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-track img');
  const nextBtn = document.querySelector('.carousel-button.next');
  const prevBtn = document.querySelector('.carousel-button.prev');

  let index = 0;

  function updateCarousel() {
    const width = track.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`; // <-- corrigido aqui
  }

  nextBtn?.addEventListener('click', () => {
    if (index < slides.length - 1) {
      index++;
      updateCarousel();
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  window.addEventListener('resize', updateCarousel);
  window.addEventListener('load', updateCarousel);

  // Animação do botão de contato
  const contatoBtn = document.querySelector('.contato-link');
  if (contatoBtn) {
    contatoBtn.addEventListener('click', function () {
      const tituloContato = document.getElementById('contato');
      tituloContato?.classList.add('brilho');

      setTimeout(() => {
        tituloContato?.classList.remove('brilho');
      }, 7000);
    });
  }

  // Formulário de pedido de oração
  const form = document.getElementById('pedidoForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formMessage.style.color = 'green';
          formMessage.textContent = 'Pedido enviado com sucesso! Obrigado por compartilhar conosco.';
          form.reset();
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Ops! Ocorreu um erro ao enviar seu pedido. Tente novamente mais tarde.';
      }
    });
  }

  // Marca automaticamente o item do menu baseado na URL da página
  const path = window.location.pathname;
  const currentPage = path.split("/").pop();

  document.querySelectorAll('.menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hrefPage = href.split("/").pop();

    if (hrefPage === currentPage) {
      const li = link.parentElement;
      li.classList.add('ativo');

      // Caso seja um submenu, abre também o pai
      const parentLi = li.closest('li');
      if (parentLi) parentLi.classList.add('ativo');
    }
  });
});

document.querySelector('.proposito-link')?.addEventListener('click', function () {
  const tituloProposito = document.getElementById('proposito');
  tituloProposito.classList.add('brilho');

  setTimeout(() => {
    tituloProposito.classList.remove('brilho');
  }, 7000); // ou 3000 se quiser só 3 segundos
});

function menuOnClick() {
  document.getElementById("menu1-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu1-bg").classList.toggle("change-bg");
}
