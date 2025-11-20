# Guia de Contribuição

Obrigado por considerar contribuir com este projeto! Este documento fornece diretrizes para contribuições.

## Como Contribuir

### 1. Reportar Bugs

Se você encontrou um bug:

1. Verifique se o bug já não foi reportado nas [Issues](../../issues)
2. Se não foi reportado, crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. comportamento atual
   - Screenshots (se aplicável)
   - Ambiente (OS, versões, etc.)

### 2. Sugerir Melhorias

Para sugerir uma nova funcionalidade ou melhoria:

1. Verifique se a sugestão já não existe
2. Crie uma issue descrevendo:
   - A funcionalidade/melhoria proposta
   - Casos de uso
   - Benefícios

### 3. Submeter Pull Requests

1. **Fork o repositório**
2. **Crie uma branch** para sua feature/fix:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Faça suas alterações** seguindo as boas práticas:
   - Código limpo e legível
   - Comentários quando necessário
   - Testes atualizados/criados
   - Documentação atualizada
4. **Commit suas mudanças**:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
5. **Push para sua branch**:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
6. **Abra um Pull Request** com descrição clara

## Padrões de Código

### Convenções de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de manutenção

### Boas Práticas

- ✅ Use nomes descritivos para variáveis e funções
- ✅ Mantenha funções pequenas e focadas
- ✅ Adicione comentários quando necessário
- ✅ Siga o padrão de código existente
- ✅ Escreva testes para novas funcionalidades
- ✅ Atualize a documentação quando necessário

## Estrutura de Testes

Ao adicionar novos testes:

1. Coloque-os na pasta apropriada (`api-tests`, `web-tests`, etc.)
2. Use nomes descritivos
3. Siga os padrões existentes
4. Inclua cenários positivos e negativos

## Perguntas?

Se tiver dúvidas, abra uma issue ou entre em contato com os mantenedores.

Obrigado por contribuir! 🎉

