# PokemonTcg

Bem-vindo ao Pokemon-Tcg, um projeto web desenvolvido utilizando Angular 13.3.9, Angular Material UI e Tailwind CSS.

## Arquitetura

O projeto adota uma arquitetura modularizada, organizada em diferentes módulos para facilitar a manutenção e 
escalabilidade. A estrutura básica do projeto é delineada abaixo:

/src
|-- /app
| |-- /models
| |-- /pages
| |-- /services
| |-- /shared 
| |-- app.component.ts
| |-- app.module.ts
|-- /assets
|-- /styles
|-- /...

 **`/src`**: O diretório principal que contém todo o código-fonte da aplicação.

  - **`/app`**: Este diretório é o núcleo da aplicação, contendo diferentes módulos e componentes.

    - **`/models`**: Contém interfaces ou classes TypeScript que definem a estrutura dos modelos de dados utilizados na aplicação.

    - **`/pages`**: Armazena os componentes que servem como páginas ou rotas principais da aplicação.

    - **`/services`**: Este diretório contém serviços Angular responsáveis por centralizar lógicas de negócios e interações com APIs.

    - **`/shared`**: Componentes, módulos ou outros artefatos compartilhados entre diferentes partes da aplicação são armazenados aqui.

    - **`app.component.ts`**: O componente raiz da aplicação, responsável por gerenciar a estrutura global.

    - **`app.module.ts`**: O módulo raiz da aplicação, responsável por importar e configurar todos os outros módulos, componentes e serviços necessários.

  - **`/assets`**: Contém arquivos estáticos, como imagens e fontes.

  - **`/styles`**: Armazena arquivos de estilo, como arquivos CSS ou SASS, utilizados para estilizar os componentes e páginas.

## Funcionalidades

O projeto possui as seguintes funcionalidades principais:

	O usuário pode ver seus baralhos.
	O usuário pode criar um novo baralho.
	O usuário pode remover um baralho.
	O usuário pode editar um baralho.
	O usuário pode clicar num baralho para visualizar seus detalhes.
	O usuário pode colocar um nome no seu baralho;
	O usuário pode inserir cartas no baralho;
	
## Ambiente de Desenvolvimento

Certifique-se de ter as seguintes dependências instaladas:

- Node.js (v16.20.2 ou superior)
- Angular CLI (v13.3.9)

### Configuração do Ambiente

1. Clone este repositório: `git clone git@github.com:Mikewillv94/pokemon-tcp.git
2. Navegue até o diretório do projeto: `pokemon-tcp`
3. Instale as dependências: `npm install`

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

```bash  ng serve 

Navegue até `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar algum dos arquivos de origem.