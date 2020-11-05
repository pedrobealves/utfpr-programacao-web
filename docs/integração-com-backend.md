#### Integrando com back-end


Muitas vezes, é veinculado o aplicativo React de front-end no mesmo host e porta de sua implementação de back-end.

```
/             - o servidor estático retorna index.html com o aplicativo React
/todos        - o servidor estático retorna index.html com o aplicativo React
/api/todos    - o servidor lida com quaisquer solicitações /api/* usando a implementação de backend

```

Essa configuração **não** é necessária. No entanto, se você **tiver** uma configuração como esta, é conveniente escrever pedidos como `fetch ('/api/todos')` sem se preocupar em redirecioná-los para outro host ou porta durante o desenvolvimento.

Para dizer ao servidor de desenvolvimento para fazer proxy de quaisquer solicitações desconhecidas para seu servidor API em desenvolvimento, adicione um campo `proxy` ao seu `package.json`, por exemplo:

```json
  "proxy": "http: // localhost: 4000",
```

Desta forma, quando você `fetch('/api/todos')` no desenvolvimento, o servidor de desenvolvimento reconhecerá que não é um ativo estático e enviará o proxy de sua solicitação para `http://localhost:4000/api/todos` como uma alternativa. O servidor de desenvolvimento **apenas** tentará enviar solicitações sem `text/html` em seu cabeçalho `Accept` para o proxy.

Convenientemente, isso evita [problemas de CORS](https://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations) e mensagens de erro como esta em desenvolvimento:

```
A API de busca não pode carregar http: // localhost: 4000 / api / todos. Nenhum cabeçalho 'Access-Control-Allow-Origin' está presente no recurso solicitado. Portanto, o acesso de origem 'http: // localhost: 3000' não é permitido. Se uma resposta opaca atender às suas necessidades, defina o modo da solicitação como 'no-cors' para buscar o recurso com o CORS desativado.
```

Lembre-se de que `proxy` só tem efeito no desenvolvimento (com `npm start`), e cabe a você garantir que URLs como `/api/todos` apontem para a coisa certa na produção. Você não precisa usar o prefixo `/api`. Qualquer solicitação não reconhecida sem um cabeçalho de aceitação `text/html` será redirecionada para o `proxy` especificado.

A opção `proxy` suporta conexões HTTP, HTTPS e WebSocket.

Se a opção `proxy` **não** for flexível o suficiente para você, alternativamente, você pode:

- Configurar o proxy manualmente
- Habilitar o CORS em seu servidor `aqui está como fazê-lo para Express`:

```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

```

### Integrando com um back-end de API

Esses tutoriais irão ajudá-lo a integrar seu aplicativo com um back-end de API em execução em outra porta, usando `fetch ()` ou `axios` para acessá-lo.

#### Node

Confira [este tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/).
Você pode encontrar o repositório GitHub complementar [aqui](https://github.com/fullstackreact/food-lookup-demo).

Texto traduzido e adaptado de [Proxying API Requests in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development) e [Integrating with an API Backend](https://create-react-app.dev/docs/integrating-with-an-api-backend).


