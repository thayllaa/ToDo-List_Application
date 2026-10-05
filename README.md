# App Todo List

Aplicação de gerenciamento de tarefas com autenticação, categorias personalizáveis, tags, subtarefas e comentários.

O projeto é dividido em duas partes dentro do mesmo repositório:

- **Backend**: API REST em AdonisJS v6 com MySQL, rodando em Docker.
- **Frontend (`dashboard/`)**: aplicação Angular com Tailwind CSS.

## Funcionalidades

- Cadastro, login e logout com token de acesso
- Tarefas com status, prioridade, prazo e indicação de atraso
- Subtarefas e comentários em cada tarefa
- Categorias com ícone e cor escolhidos pelo usuário
- Tags com cor personalizada
- Filtros de tarefas
- Edição de perfil (nome de usuário, e-mail e senha)
- Estados de carregamento e de lista vazia, avisos de sucesso e erro, confirmação antes de excluir
- Layout responsivo

## Tecnologias

| Camada   | Tecnologias                                              |
| -------- | -------------------------------------------------------- |
| Backend  | AdonisJs, TypeScript, MySQL                              |
| Frontend | Angular, Tailwind CSS, Reactive Forms, Lucide (ícones)   |
