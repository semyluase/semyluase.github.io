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
    'M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z';

const sunPath =
    'M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z';

const darkMode = document.querySelector('#darkMode');
const html = document.querySelector('html');

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
                translateY: 250,
            },
            '-=550',
        )
        .add({
                targets: darkMode,
                translateY: 0,
            },
            '-=550',
        )
        .add({
                targets: '.sunStopFirst',
                stopColor: toggle ? 'rgb(200,105,43)' : 'rgb(255,255,255)',
            },
            '-=750',
        )
        .add({
                targets: '.sunStopSecond',
                stopColor: toggle ? 'rgb(239,185,67)' : 'rgb(161,161,161)',
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

AOS.init();

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