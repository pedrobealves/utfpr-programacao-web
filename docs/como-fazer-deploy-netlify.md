## Como fazer deploy no [Netlify](https://www.netlify.com/)

** Implantação manual no CDN da Netlify: **

`` `sh
npm install netlify-cli -g
Netlify deploy
`` `

Escolha a pasta `build` para deploy

** Para configurar entrega contínua: **

Com esta configuração, o Netlify criará e implantará quando você enviar algo para o git ou abrir uma solicitação pull:

1. [Inicie um novo projeto netlify](https://app.netlify.com/signup)
2. Escolha seu serviço de hospedagem Git e selecione seu repositório
3. Clique em `Build your site`

### Referência

Texto traduzido e adaptado de [https://create-react-app.dev/docs/deployment/](https://create-react-app.dev/docs/deployment/#netlify)
