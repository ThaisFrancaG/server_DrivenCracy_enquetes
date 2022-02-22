# DrivenCracy

Esse é o back-end de uma aplicação para enquetes. Enquanto back-end, ele permite conexão à um front-end através do seu link de deploy e permite a criação de enquetes, opções para as enquetes, votos nas opções disponíveis e exibição de resultados.

## Rotas e Usos

#### Criar uma nova enquete

```http
  POST /pool/
```

| Parâmetro Envio | Tipo     | Descrição                                                  |
| :-------------- | :------- | :--------------------------------------------------------- |
| `title`         | `string` | **Obrigatório**. O título da enquete que você deseja criar |
| `expireAt`      | `string` | Data limite da enquete. Default: 30 dias após post         |

#### Obter Enquetes

```http
  GET /pool/
```

| Parâmetro Resposta | Tipo    | Descrição                           |
| :----------------- | :------ | :---------------------------------- |
| `pools`            | `array` | Retorna todas as arrays cadastradas |

#### Criar Opções de Voto

```http
  POST /choice/
```

| Parâmetro Envio | Tipo     | Descrição                                                        |
| :-------------- | :------- | :--------------------------------------------------------------- |
| `title`         | `string` | **Obrigatório** Opção a ser adicionada à enquete                 |
| `poolId`        | `string` | **Obrigatório** Id da enquete a qual se deseja adicionar a opção |

#### Obter Opções de Voto Disponíveis

```http
  GET /pool/:id/choice
```

| Parâmetro Envio | Tipo     | Descrição                                      |
| :-------------- | :------- | :--------------------------------------------- |
| `:id`           | `string` | Id da enquete cujas opções se deseja verificar |

#### Votar Na Enquete

```http
  POST /choice/:id/vote
```

| Parâmetro Envio | Tipo     | Descrição                        |
| :-------------- | :------- | :------------------------------- |
| `:id`           | `string` | Id opção em qual se deseja votar |

#### Obter Resultados Enquetes

```http
  GET /pool/:id/result
```

| Parâmetro Envio | Tipo     | Descrição                                    |
| :-------------- | :------- | :------------------------------------------- |
| `:id`           | `string` | Id da enquete cujo resultado se deseja obter |

## Stack utilizada

**Back-end:** Node, Express, MongoDB

**Deploy:** Heroku, MongoAtlas

## Deploy

O deploy do back-end pode ser visto e utilizado com o link:

```url
  https://drivencracy-tfrancag.herokuapp.com/
```

Deploy feito via Heroku

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:ThaisFrancaG/server_DrivenCracy_enquetes.git
```

Entre no diretório do projeto

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```
