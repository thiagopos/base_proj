
## SIMEON BOILERPLATE 🚀

Este projeto é um _boilerplate_ para aplicações web, desenvolvido para ser a base para os futuros sistemas **SIMEON**, que são utilizados no hospital público *HMACN*, que faz parte da *SMS*.

Os sistemas SIMEON impactam na vida de milhares de pessoas por ano que trabalham e utilizam o hospital. O objetivo deste boilerplate é fornecer uma base _sólida e escalável_ para o desenvolvimento de novos sistemas, garantindo que eles atendam às necessidades específicas do hospital.

## Estrutura do Projeto 📂
```bash
.
├── .gitignore
├── LICENSE.md
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── express.js
│   │   └── session.js
│   ├── middleware/
│   │   └── validate.js
│   ├── models/
│   │   ├── connectar.js
│   │   └── queries/
│   │       └── consultasAutenticacao.js
│   ├── public/
│   │   ├── images/
│   │   ├── scripts/
│   │   └── styles/
│   ├── routes/
│   │   ├── cadastro.js
│   │   ├── index.js
│   │   ├── login.js
│   │   └── logout.js
│   └── views/
│       ├── cadastro.ejs
│       ├── dashboard.ejs
│       ├── login.ejs
│       └── partials/
```
## Instalação 🛠️
Para instalar as dependências do projeto, execute o seguinte comando:
```sh
npm install
```
ou se você estiver usando Yarn:

```sh
yarn install
```
## Licença 📝

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.