
<h1 align="center">
  <a href="https://github.com/pi2-fga/201901-InspecaoCaboDeAco-Frontend" target="_blank">
    <img src="./docs/logo.png" />
  </a>
</h1>

<p align="center">
  Este projeto é referente ao Frontend do projeto Inspeção de Cabo de Aço da disciplina de PI2, desenvolvido em:<br>
  <strong>Vue/Quasar, Apollo e Pug.</strong>
</p>

<p align="center">
  <a href="https://v1.quasar-framework.org/">
    <img src="https://img.shields.io/badge/quasar-1.0.0-blue.svg" alt="Versão do Quasar" />
  </a>
  <a href="https://vue-apollo.netlify.com/">
    <img src="https://img.shields.io/badge/vue_apollo-3.0.0-3eaf7c.svg" alt="Versão do Vue Apollo" />
  </a>
  <a href="https://pugjs.org/api/getting-started.html">
    <img src="https://img.shields.io/badge/pug-2.0.3-a86454.svg" alt="Versão do Pug" />
  </a>
</p>

## 📋 Requisitos

Para rodar o projeto, basta ter o Git, Docker e o Docker Compose instalados. Para rodar local, deve-se ter o Node e o [Quasar CLI](https://v1.quasar-framework.org/quasar-cli/installation) instalados.

## 💻 Rodando a aplicação

O primeiro passo é clonar o projeto e em seguida entrar em sua raiz:

```sh
git clone git@github.com:pi2-inspecao-cabo-de-aco/frontend.git && cd frontend
```

Para baixar as imagens e subir os containers, rode o comando:

```sh
docker-compose up --build
```

Após isso, o _frontend_ estará disponível para uso, na url `localhost:8080`.

A outra maneira possível é rodar o _frontend_ sem o Docker. Para isto, basta instalar as dependências da aplicação presentes no `package.json` utilizando o comando `yarn` ou `npm install`.

E em seguida a aplicação estará disponível na mesma url `localhost:8080` após executar o comando abaixo.

```sh
quasar dev
```

## 📂 Estrutura

A hierarquia de pastas do projeto é a seguinte:

```
frontend/
└── src/
    ├── /
    ├── assets/
    ├── boot/
    ├── components/
    │   ├── cables-page/
    │   │   ├── CablesList.vue
    │   │   └── CreateCable.vue
    |   └── ...
    ├── css/
    ├── graphql/
    │   ├── fragments/
    │   ├── mutations/
    │   │   ├── create-cable.gql
    │   │   └── ...
    │   ├── queries/
    │   │   ├── cables.gql
    │   │   └── ...
    │   ├── subscriptions/
    |   └── ...
    ├── helpers/
    ├── i18n/
    ├── layouts/
    ├── mixins/
    ├── pages/
    │   ├── CablesPage.vue
    │   ├── Index.vue
    │   └── ...
    ├── router/
    ├── statics/
    ├── store/
    ├── App.vue
    └── ...
```

**assets:** Contém arquivos extras à aplicação, como imagens, fontes, etc.

**boot:** Contém arquivos de configuração de _plugins_ utilizados na aplicação.

**components:** Contém todos os componentes da aplicação, estruturados em pastas referentes à um componente _page_ ou à uma _feature_ específica. A nomenclatura das pastas utiliza o padrão `kebab-case` e os componentes utilizam o padrão `PascalCase`.

**grahql:** Contém todos os arquivos referentes aos _resolvers_ do graphql, como _fragments_, _queries_, _mutations_ e _subscriptions_. A extensão dos arquivos presentes são `.gql` e podem ser importados em qualquer componente, para ser utilizado no Apollo.

**helpers:** Contém métodos com lógicas que podem ser utilizadas em vários componentes.

**layouts:** Contém componentes reutilizáveis que são a estrutura de uma janela. É comum seus componentes terem uma barra de navegação, um _drawer_ ou até um _footer_. Geralmente são utilizados como componentes pai de várias rotas.

**pages:** Contém componentes que guardam toda a lógica de uma página. Estão em um nível de abstração abaixo de um _layout_ e acima dos componentes comuns.

**router:** Contém todas as rotas da aplicação.

**store:** Contém todos os arquivos referentes ao `Vuex`, que é a biblioteca de gerenciamento de estados do Vue. Suas pastas utilizam o padrão de nomenclatura `kebab-case`, onde cada uma contém os _getter_, _actions_, _mutations_ e o _state_ de cada módulo da _Store_.
