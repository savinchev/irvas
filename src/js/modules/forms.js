const forms = () => {

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        })
    })

    const message = {
        loading: 'Загрузка...',
        sucess: 'Спасибо! Специалист свяжется с вами в ближайшее время',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => item.value = '');
    }

    form.forEach(item => {
        item.addEventListener('submit', e => {

            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');

            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    document.querySelector('.status').textContent = message.sucess;
                })
                .catch(() => document.querySelector('.status').textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        })
    })
};

export default forms;