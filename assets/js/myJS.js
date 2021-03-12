let typed2 = new Typed('.works', {
    strings: ['<i>Web Developer</i>', '<i>PegaSystem Developer</i>', '<i>BackEnd Developer</i>'],
    typeSpeed: 40,
    backSpeed: 40,
    loop: true,
    showCursor: true,
    smartBackspace: true
});

const scriptURL = 'https://script.google.com/macros/s/AKfycby17WjamfnRYqxPIqn61cZLif6C1lLKP_yRyMstvYEWY9GERQDrCGUYselaG5AIBeYm/exec';
const form = document.forms['semy-site-contact-form'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');


form.addEventListener('submit', e => {
    e.preventDefault();
    btnKirim.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            console.log('Success!', response);
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                html: '<b>Terima Kasih! </b>Pesan sudah terkirim'
            });
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                html: '<b>Mohon Maaf! </b>Pesan gagal terkirim'
            });
        })
})