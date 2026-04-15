# Gabriel Araujo — Portfolio (Persona-style)

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

## Deploy (ex.: Render — Static Site)

1. Repositório com **esta pasta como raiz** (ou define **Root Directory** = `MY VERSION` se o repo for o monorepo pai).
2. **Build command:** `npm ci && npm run build`
3. **Publish directory:** `dist`
4. **SPA:** regra de rewrite `/*` → `/index.html` (para o React Router em rotas como `/about`).

## Estrutura relevante

- `src/` — componentes e estilos
- `public/` — assets estáticos (imagens, áudio, PDF do CV)
- `dist/` — **não** vai para o Git; é gerada pelo build
