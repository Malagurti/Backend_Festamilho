Backend_Festamilho

Informações do Projeto

Banco de dados => MongoDB:
Porta do Banco => 27017:
Porta do Backend => 4000;

Gerenciador de pacotes utilizado: Yarn.

Para instalar todas as dependencias basta entrar na pasta raiz do projeto e digitar yarn após ter feito sua instalação.

Rotas:

Cadastro de usuario
http://localhost:4000/auth/registro => Post

Autenticacao de usuario
http://localhost:4000/auth/autenticacao => Post

Recuperação de Senha
http://localhost:4000/auth/recuperasenha => Post

Troca da senha
http://localhost:4000/auth/resetasenha => Post

Verificacao de Token com Header
http://localhost:4000/barraca => Get

Listar todas as barracas
http://localhost:4000/barraca => Get

Listar apenas uma barraca
http://localhost:4000/barraca/barracaId =>Get

Cadastrar uma barraca
http://localhost:4000/barraca => Post

Atualizar uma barraca
http://localhost:4000/barraca/barracaId => Put

Deletar uma barraca
http://localhost:4000/barraca/barracaId => Delete

Listar todos os Cardapios
http://localhost:4000/cardapio => Get

Listar um cardapio por Ip
http://localhost:4000/cardapio/cardapioId => get






