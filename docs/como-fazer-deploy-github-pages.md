## Como fazer deploy no Github Pages
>Observe a versão do react-scripts, o material engobla versões acima da react-scripts@0.2.0

### Passo 1: Adicione `homepage` no `package.json`

Abra seu `package.json` e adicione o campo `homepage`, substituindo

```json
  "homepage": "https://usuáriogithub.github.io/nomerepositório",
```

Lembre-se de trocar `"usuáriogithub"` e `"nomerepositório"` pelos nomes indicados, o Create React usa o campo `homepage` para determinar a URL raiz no arquivo HTML construído. 

### Passo 2: Instalar `gh-pages` e adicionar `deploy` aos scripts em `package.json`

Para publicá-lo em [https://usuáriogithub.github.io/nomerepositório](https://usuáriogithub.github.io/nomerepositório), execute:

```sh
npm install --save gh-pages
```

Ou, alternativamente você por usar `yarn`:

```sh
yarn add gh-pages
```

Adicione os scripts a seguir em seu `package.json`:

```diff
  "scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

O script `predeploy` será executado automaticamente antes de `deploy` ser executado.

### Step 3: Faça o deploy executando `npm run deploy`

```sh
npm run deploy
```

### Step 4: Para uma página de projeto, certifique-se de que as configurações de seu projeto usam `gh-pages`

Por fim, certifique-se de que a opção **GitHub Pages** nas configurações do projeto GitHub esteja definida para usar a branch `gh-pages`:

<img src="https://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting" />

### Etapa 5: Opcionalmente, configure o domínio

Você pode configurar um domínio personalizado com páginas GitHub adicionando um arquivo `CNAME` à pasta` public / `.

Seu arquivo CNAME deve ser assim:

`` `
meuwebsite.com
`` `

### Referência

Texto traduzido e adaptado de [https://create-react-app.dev/docs/deployment/](https://create-react-app.dev/docs/deployment/)
