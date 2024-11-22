// Toggle menu
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
  menuList.classList.toggle("show");
});

// Function to load content based on page selection
function loadContent(page) {
  $('#content').html('');  // Kosongkan konten sebelum memuat halaman baru

  if (page === 'home') {
    $('#content').load('index.html .cover-container', function (response, status, xhr) {
      if (status === "error") {
        console.error("Error loading home content:", xhr.status, xhr.statusText);
      }
    });
  } else if (page === 'about.html') {
    $('#content').load('about.html .tentang', 'about.html .visi-misi', function (response, status, xhr) {
      if (status === "error") {
        console.error("Error loading about content:", xhr.status, xhr.statusText);
      }
    });
  } else if (page === 'material.html') {
    $('#content').load('material.html .material', function (response, status, xhr) {
      if (status === "error") {
        console.error("Error loading material content:", xhr.status, xhr.statusText);
      }
      $('section.banner').hide();
    });
  } else if (page === 'product.html') {
    $('#content').load('product.html .product', function (response, status, xhr) {
      if (status === "error") {
        console.error("Error loading product content:", xhr.status, xhr.statusText);
      }
      $('section.banner').hide();
      const swiper = new Swiper(".slide-container", {
        slidesPerView: 4,
        spaceBetween: 20,
        sliderPerGroup: 4,
        loop: true,
        centerSlide: "true",
        fade: "true",
        grabCursor: "true",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
        },
      });
    });
  } else if (page === 'contact.html') {
    $('#content').load('contact.html .contact-container', function (response, status, xhr) {
      if (status === "error") {
        console.error("Error loading contact content:", xhr.status, xhr.statusText);
        return;
      }

      // Setelah konten contact dimuat, tambahkan event listener pada form
      const form = document.querySelector('form');
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          checkInputs();  // Cek input terlebih dahulu

          // Hanya kirim email jika semua input valid
          if (!document.querySelector('.error')) {
            sendEmail();
          } else {
            alert("Please fill in all required fields.");
          }
        });
      } else {
        console.error("Form not found in contact content.");
      }
    });
  } else {
    $.ajax({
      url: page,
      method: 'GET',
      success: function (response) {
        $('#content').html(response);
      },
      error: function (error) {
        console.error("Error loading page:", error);
      }
    });
  }
}

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read More";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
 


function clickCard(popupId) {
  var popup = document.getElementById(popupId);
  popup.classList.toggle("show");
}

// Function to toggle content visibility
function toggleContent(contentId) {
  var allContents = document.querySelectorAll('.content');
  allContents.forEach(function (content) {
    if (content.classList.contains('visible') && content.id !== contentId) {
      content.classList.remove('visible');
    }
  });

  var content = document.getElementById(contentId);
  if (content.classList.contains('visible')) {
    content.classList.remove('visible');
  } else {
    content.classList.add('visible');
  }
}

// Fungsi untuk memeriksa input kosong dan menambahkan gaya error
function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value === "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    item.addEventListener("keyup", () => {
      if (item.value !== "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

// Fungsi untuk mengirim email

function sendEmail() {
  const fullName = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const mess = document.getElementById('message');
  const bodyMessage = `Full Name: ${fullName.value}<br>Email: ${email.value}<br>Phone Number: ${phone.value}<br>Message: ${mess.value}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "rifqirifkulloh@gmail.com",
    Password: "D3613205F6F2400272E8D87FC6C68DC5981C",
    To: "rifqirifkulloh@gmail.com",
    From: "rifqirifkulloh@gmail.com",
    Subject: "New Contact Form Submission",
    Body: bodyMessage
  }).then(
    message => {
      if (message === "OK") {
        // Sembunyikan form dan tampilkan pesan konfirmasi
        const formContainer = document.querySelector('.contact-container');
        if (formContainer) {
          formContainer.style.display = 'none'; // Sembunyikan form
        }

        // Tampilkan pesan konfirmasi
        const confirmationMessage = document.createElement('div');
        confirmationMessage.innerHTML = `<p>Pesan Anda telah berhasil dikirim! Terima kasih.</p>`;
        confirmationMessage.style.color = 'green';
        confirmationMessage.style.fontSize = '18px';
        confirmationMessage.style.textAlign = 'center';

        // Tambahkan pesan konfirmasi ke konten
        document.getElementById('content').appendChild(confirmationMessage);
      }
    }
  );
}