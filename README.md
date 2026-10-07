# 🐾 Patas & Companhia — Site de Demonstração

Site institucional fictício para o pet shop **Patas & Companhia**, criado como exercício de
front-end. É um site estático, sem build e sem dependências: basta abrir o HTML no navegador.

> ⚠️ **Aviso:** "Patas & Companhia" é uma empresa fictícia. Nomes, endereços, telefones,
> e-mails, preços e avaliações são inventados e servem apenas para fins de estudo e demonstração.

## 📁 Estrutura

```
.
├── index.html   # Estrutura e conteúdo (navegação, hero, serviços, produtos, contato)
├── styles.css   # Estilos, layout responsivo, animações e acessibilidade
├── app.js       # Interatividade: menu, carrinho, validação de formulário, animações
├── README.md
└── .gitignore
```

Os arquivos ficam na raiz do repositório porque é isso que permite ao GitHub Pages
(origem: branch `main`, pasta `/`) publicar o site diretamente, sem build.

## ▶️ Como visualizar

Abra o arquivo `index.html` no navegador.

Como o `app.js` renderiza os cards de serviços e produtos dinamicamente, a página precisa ser
aberta como arquivo/página (clique duplo ou `open`), e não apenas lida como texto.

Se preferir servir por HTTP local:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## ✨ Funcionalidades

| Área | Recursos |
| --- | --- |
| **Navegação** | Cabeçalho fixo, rolagem suave por âncoras, destaque automático da seção ativa e menu hambúrguer no mobile (fecha com `Esc`, clique fora ou redimensionamento) |
| **Apresentação** | Hero com selo de destaque, chamada principal, botões de ação, indicadores de credibilidade e card flutuante de oferta |
| **Serviços** | 6 serviços gerados a partir do array `SERVICOS` (banho e tosa, consultas veterinárias, hospedagem, adestramento, táxi dog e pet sitter) com preço e duração |
| **Produtos** | 3 produtos gerados a partir do array `PRODUTOS` (ração premium, mordedor e caminha) com selo, avaliação em estrelas, preço antigo/atual e botão "Adicionar" |
| **Contato** | Formulário validado em tempo real (nome, e-mail, telefone com máscara, serviço e mensagem), mensagens de erro acessíveis e cards de endereço, telefone e horários |
| **Extras** | Carrinho com contador animado e toast de resumo, animações de entrada com `IntersectionObserver`, suporte a `prefers-reduced-motion`, `:focus-visible`, skip link e estilos de impressão |

## 🎨 Personalização

### Trocar serviços e produtos

Edite os arrays no topo do `app.js`:

```js
const SERVICOS = [ /* icone, titulo, descricao, preco, duracao */ ];
const PRODUTOS = [ /* emoji, categoria, nome, descricao, precoAntigo, preco, avaliacao, nota, selo, seloClasse */ ];
```

### Trocar as cores

As cores ficam centralizadas em variáveis CSS no início do `styles.css`:

```css
:root {
  --c-primary: #f2762e;   /* laranja principal */
  --c-accent:  #1f9d8d;   /* verde de apoio     */
  --c-bg:      #fffaf4;   /* fundo quente       */
}
```

## ♿ Acessibilidade

- Estrutura semântica com `header`, `nav`, `main`, `section`, `aside` e `footer`
- Link "pular para o conteúdo" e foco visível em todos os elementos interativos
- `aria-expanded`, `aria-controls`, `aria-live`, `aria-invalid` e `role="alert"` nos pontos certos
- Contraste de texto verificado e respeito à preferência por menos movimento

## 📄 Licença

Conteúdo de estudo, livre para uso e adaptação. Os emojis usados como ícones fazem parte da
fonte do sistema e não exigem downloads externos.
