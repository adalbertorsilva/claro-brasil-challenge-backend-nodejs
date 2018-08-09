Comentários
===================

Decisão Arquitetural
-------------

A arquitetura adotada foi uma abordagem baseada em middlewares como validadores de negócio ( foi pensado em utilizar sequelize hooks para tal, entretando isso acarretaria num aumento muito grande das responsabilidades do modelo ), onde os mesmos recebem as requisições, fazem suas tratativas e caso seus critérios de negócio sejam atendidos a requisição é passada para o próximo validador até chegar na última que é o controller que possui a responsabilidade de apenas persistir o modelo.

O projeto foi dividido em 11 pastas responsáveis por armazenar testes ( tanto unitários como de integração), configurações de projeto ( banco de dados, servidor e test), controladores, erros customizados, validadores ( middlewares ), migrções de banco de dados, modelos, rotas do servidor, schemas de validação de payload e utilitários.

-------------

Bibliotecas de terceiros
-------------

Para esse projeto foram utilizadas as seguintes bibliotecas externas:

- **auto-bind** para controle de contexto interno das classes ES6
- **body-parser** para auxilio na coversão das requisições em objetos JSON
- **cors** para prevenção de cross origin resourse sharing
- **dotenv** para facilitar a utilização de variáveis de ambiente
- **express** para auxiliar na configuração do servidor
- **joi** para auxilio na validação dos payloads enviados nas requisições
- **moment** para auxilio no tratamento de datas
- **pg** e **pg-hstore** para conexão com o banco de dados postgres
- **require-all** para auxilio na importação de arquivos e criação de indices
- **sequelize** para mapeamento de entidades de relacionamento
- **sequelize-cli** para auxilio na criação e confirguração do banco de dados
- **eslint** para auxilio no code style
- **husky** para execução de tarefas tais como uso do lint atrelado a git hooks
- **jest** para criação e execução de testes automatizados
- **sinon** para a criação de test doubles
- **supertest** para levantar o contexto do servidor em ambiente de testes e simular resqusições
-------------

Melhorias
-------------

Gostaria de fazer um refactoring nos middlewares para maior resutilização de código

-------------

Acredito que nenhum requisito obrigatório não tenha sido feito