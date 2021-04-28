let typed2 = new Typed('.works', {
    strings: [
        '<i>Web Developer</i>',
        '<i>PegaSystem Developer</i>',
        '<i>BackEnd Developer</i>',
    ],
    typeSpeed: 40,
    backSpeed: 40,
    loop: true,
    showCursor: true,
    smartBackspace: true,
});

const moonPath =
    'M32 50C32 77.6142 50.5 100 50.5 100C22.8858 100 0.5 77.6142 0.5 50C0.5 22.3858 22.8858 0 50.5 0C50.5 0 32 22.3858 32 50Z';

const sunPath =
    'M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z';

const darkMode = document.querySelector('#darkMode');
const html = document.querySelector('html');

console.log(html.dataset.colorMode);

let toggle = false;

darkMode.addEventListener('click', () => {
    const timeline = anime.timeline({
        duration: 750,
        easing: 'easeOutExpo',
    });
    timeline
        .add({
            targets: '.sun',
            d: [{
                value: toggle ? sunPath : moonPath,
            }, ],
        })
        .add({
                targets: darkMode,
                rotate: 320,
            },
            '-=750',
        )
        .add({
                targets: html,
                change: function() {
                    html.dataset.colorMode = toggle ? 'dark' : 'light';
                },
            },
            '-=750',
        );
    if (!toggle) {
        toggle = true;
    } else {
        toggle = false;
    }
});

const scriptURL =
    'https://script.google.com/macros/s/AKfycby17WjamfnRYqxPIqn61cZLif6C1lLKP_yRyMstvYEWY9GERQDrCGUYselaG5AIBeYm/exec';
const form = document.forms['semy-site-contact-form'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    btnKirim.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form),
        })
        .then((response) => {
            console.log('Success!', response);
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                html: '<b>Terima Kasih! </b>Pesan sudah terkirim',
            });
            form.reset();
        })
        .catch((error) => {
            console.error('Error!', error.message);
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                html: '<b>Mohon Maaf! </b>Pesan gagal terkirim',
            });
        });
});