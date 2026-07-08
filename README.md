# Gabriel Araujo — Portfolio

Site estático em **React + Vite**, com React Router, Framer Motion e áudio ambiente.

## Requisitos

- Node.js **18+** (recomendado LTS)

## Scripts

```bash
npm install    # instalar dependências
npm run dev    # desenvolvimento local
npm run build  # gera a pasta dist/ para produção
npm run lint   # ESLint
```
## Estrutura relevante

- `src/` — componentes e estilos (`src/styles/` concentra o CSS por página)
- `public/` — assets estáticos (imagens, áudio, PDF do CV, og-image)
- `render.yaml` — config do Render (static site + rewrite de SPA para `index.html`)

## Deploy (Render)

O site usa `BrowserRouter`, então todas as rotas precisam de rewrite para
`index.html`. O `render.yaml` já declara isso; se o serviço foi criado manualmente
no dashboard, adicione em **Redirects/Rewrites**: `/*` → `/index.html` (Rewrite).

## Autoria

Este portfólio foi totalmente idealizado e desenvolvido por **Gabriel Araujo**.

Estou aberto a contatos profissionais e colaborações:
- Portfolio: https://gabriel-caraujo.onrender.com/
- LinkedIn: https://www.linkedin.com/in/gabrielcaraujo
- GitHub: https://github.com/Biieru
- WhatsApp: https://wa.me/5581986646327

## Reuso e crédito

Você pode estudar, forkear e adaptar este código para fins não comerciais,
desde que dê os devidos créditos de autoria.

Exemplo de citação:

> Original author: Gabriel Araujo
> Source/inspiration: https://gabriel-caraujo.onrender.com/

Para uso comercial, entre em contato previamente.

Consulte os termos completos no arquivo `LICENSE`.
