import { Ajax } from './ajax.js';

const api = new Ajax({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 3000,
    headers: {
        'Authorization': 'Bearer my-fake-token-123'
    }
});

const runTests = async () => {
    const output = document.getElementById('output');
    const log = (msg) => {
        console.log(msg);
        output.innerHTML += `<p>${JSON.stringify(msg)}</p>`;
    };

    try {
        log('TEST GET');
        const post1 = await api.get('/posts/1');
        log(post1);

        log('TEST POST');
        const newPost = {
            title: 'Mój nowy post',
            body: 'Treść posta z biblioteki Ajax',
            userId: 1
        };
        const createdPost = await api.post('/posts', newPost);
        log(createdPost);

        log('TEST PUT');
        const updatedData = { id: 1, title: 'Zaktualizowany tytuł' };
        const updatedPost = await api.put('/posts/1', updatedData, { timeout: 5000 });
        log(updatedPost);

        log('TEST DELETE');
        const deleteRes = await api.delete('/posts/1');
        log('Usunięto pomyślnie (odpowiedź API):');
        log(deleteRes);

        log('TEST BŁĘDU');
        await api.get('/posts/999999'); 

    } catch (error) {
        console.error('Złapano błąd w aplikacji:', error);
        output.innerHTML += `<p style="color:red"><strong>Błąd:</strong> ${error.message}</p>`;
    }

    try {
        log('TEST TIMEOUT');
        const fastApi = new Ajax({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 10 });
        await fastApi.get('/posts');
    } catch (error) {
        output.innerHTML += `<p style="color:orange"><strong>Oczekiwany Timeout:</strong> ${error.message}</p>`;
    }
};

runTests();