## Preparação para fazer deploy

`npm run build` cria um diretório` build` com uma construção de produção de seu aplicativo. Configure seu servidor HTTP favorito para que um visitante do seu site seja servido `index.html`, e solicitações para caminhos estáticos como `/static/js/main.<hash>.js` são atendidos com o conteúdo do `/arquivostatic/js/main. <hash>.js`.

## Servidor Estático

Para ambientes que usam [Node](https://nodejs.org/), a maneira mais fácil de lidar com isso seria instalar [servir](https://github.com/zeit/serve) e deixá-lo lidar com o resto:

```sh
npm install -g serve
serve -s build
```

O último comando mostrado acima servirá seu site estático na porta **5000**. Como muitas das configurações internas de [serve](https://github.com/zeit/serve), a porta pode ser ajustada usando os sinalizadores `-l` ou` --listen`:

```sh
serve -s build -l 4000
```

Execute este comando para obter uma lista completa das opções disponíveis:

```sh
serve -h
```

## Outras Soluções

Você não precisa necessariamente de um servidor estático para executar um projeto Create React App em produção. Ele também funciona bem quando integrado a um aplicativo existente do lado do servidor.

Aqui está um exemplo programático usando [Node](https://nodejs.org/) e [Express](https://expressjs.com/):

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
```

A escolha de seu software de servidor também não é importante. Como o aplicativo Create React é totalmente independente de plataforma, não há necessidade de usar o Node explicitamente.

A pasta `build` com ativos estáticos é a única saída produzida pelo aplicativo Create React.

No entanto, isso não é suficiente se você usar o roteamento do lado do cliente. Leia a próxima seção se você deseja suportar URLs como `/todos/42` em seu aplicativo de página única.

## Servindo aplicativos com roteamento do lado do cliente

Se você usa roteadores que usam HTML5 [API de histórico `pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries) em segundo plano (por exemplo, [React Router ](https://github.com/ReactTraining/react-router) com `browserHistory`), muitos servidores de arquivos estáticos irão falhar. Por exemplo, se você usou o React Router com uma rota para `/todos/42`, o servidor de desenvolvimento responderá a ` localhost: 3000 /todos/42` apropriadamente, mas um Express servindo uma construção de produção como acima não.

Isso ocorre porque quando há um novo carregamento de página para `/todos/42`, o servidor procura o arquivo` build/todos/42` e não o encontra. O servidor precisa ser configurado para responder a uma solicitação para `/todos/42`, servindo `index.html`. Por exemplo, podemos corrigir nosso exemplo expresso acima para servir `index.html` para qualquer caminho desconhecido:

```diff
 app.use(express.static(path.join(__dirname, 'build')));
-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
```

Se você estiver usando o [Apache HTTP Server](https://httpd.apache.org/), será necessário criar um arquivo `.htaccess` na pasta` public` semelhante a este:

```
    Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]
```

Ele será copiado para a pasta `build` quando você executar` npm run build`.

Se você estiver usando o [Apache Tomcat](https://tomcat.apache.org/), deverá seguir [esta resposta do Stack Overflow](https://stackoverflow.com/a/41249464/4878474).

Agora as solicitações para `/todos/42` serão tratadas corretamente tanto no desenvolvimento quanto na produção.

Em uma versão de produção, quando você optou por um [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) tratará automaticamente todas as solicitações de navegação, como para
`/todos/42`, servindo a cópia em cache do seu `index.html`. Isto
o roteamento de navegação do service worker pode ser configurado ou desabilitado por
`Ejecting` e, em seguida, modificando o
[`navigateFallback`](https://github.com/GoogleChrome/sw-precache#navigatefallback-string)
e [`navigateFallbackWhitelist`](https://github.com/GoogleChrome/sw-precache#navigatefallbackwhitelist-arrayregexp) opções da configuração `SWPrecachePlugin`.

Quando os usuários instalam seu aplicativo na tela inicial de seus dispositivos, a configuração padrão cria um atalho para `/ index.html`. Isso pode não funcionar para roteadores do lado do cliente que esperam que o aplicativo seja servido de `/`. Edite o manifesto do aplicativo da web em `public / manifest.json` e altere` start_url` para corresponder ao esquema de URL necessário, por exemplo:

```js
  "start_url": ".",
```

## Construindo para caminhos relativos

Por padrão, Create React App produz um build assumindo que seu aplicativo está hospedado na raiz do servidor.

Para substituir isso, especifique a `homepage` em seu` package.json`, por exemplo:

```js
  "homepage":"http://mywebsite.com/relativepath",
```

Isso permitirá ao Create React App inferir corretamente o caminho raiz a ser usado no arquivo HTML gerado.

** Nota **: Se você estiver usando `react-router @ ^ 4`, você pode enraizar` <Link> `s usando o prop` basename` em qualquer `<Router>`.

Mais informações [aqui](https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string).

Por exemplo:

```js
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // renderiza <a href="/calendar/today"> 
```

### Servindo a mesma compilação de caminhos diferentes

>Nota: este recurso está disponível com `react-scripts @ 0.9.0` e superior.

Se você não estiver usando a API de histórico `pushState` HTML5 ou não usar o roteamento do lado do cliente, não é necessário especificar a URL a partir da qual seu aplicativo será servido. Em vez disso, você pode colocar isso em seu `package.json`:

```js
    "homepage": ".",
```

Isso garantirá que todos os caminhos de ativos sejam relativos a `index.html`. Você poderá então mover seu aplicativo de `http://mywebsite.com` para` http://mywebsite.com/relativepath` ou mesmo `http://mywebsite.com/relative/path` sem ter que reconstruir isto.

## Personalizando Variáveis ​​de Ambiente para Ambientes de Compilação Arbitrária

Você pode criar um ambiente de construção arbitrário criando um arquivo `.env` personalizado e carregando-o usando [env-cmd](https://www.npmjs.com/package/env-cmd).

Por exemplo, para criar um ambiente de construção para um ambiente de teste:

1. Crie um arquivo chamado `.env.staging`
2. Defina as variáveis ​​de ambiente como você faria com qualquer outro arquivo `.env` (por exemplo,` REACT_APP_API_URL = http://api-staging.example.com`)
3. Instale o [env-cmd](https://www.npmjs.com/package/env-cmd)
   ```sh
   $ npm install env-cmd --save
   $ # ou
   $ yarn add env-cmd
   ```
4. Adicione um novo script ao seu `package.json`, construindo com seu novo ambiente:
   ```json
   {
     "scripts": {
       "build: staging": "env-cmd -f .env.staging npm run build"
     }
   }
   ```

Agora você pode executar `npm run build: staging` para construir com a configuração do ambiente de teste.
Você pode especificar outros ambientes da mesma maneira.

Variáveis ​​em `.env.production` serão usadas como fallback porque` NODE_ENV` sempre será definido como `produção` para uma construção.

Texto traduzido e adaptado de [Deployment](https://create-react-app.dev/docs/deployment/)