Excel Analyzer
Aplicacao web que analisa automaticamente arquivos Excel (.xlsx) e gera graficos inteligentes. Basta fazer upload da planilha — o sistema detecta os tipos de dados, identifica padroes e cria visualizacoes prontas.

Funcionalidades
Deteccao automatica de cabecalhos — funciona com qualquer formato de planilha Excel
Classificacao inteligente de colunas — identifica dados numericos, categoricos e datas
Geracao automatica de graficos — barras, linhas e pizza com 7 regras em cascata
Filtros interativos — selecione quais categorias exibir nos graficos em tempo real
Troca de tipo de grafico — alterne entre barras, linhas e pizza com um clique
Download de graficos — exporte qualquer grafico como imagem PNG
Formatacao brasileira — datas em DD/MM/YYYY e valores em R$
Stack
Backend: Python, FastAPI, pandas, openpyxl
Frontend: React, Vite, Recharts, Tailwind CSS
Roteamento: React Router DOM
Como rodar
Backend

cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend

cd frontend
npm install
npm run dev
Acesse http://localhost:5173 no navegador.

Paginas
Dashboard — upload de Excel e visualizacao dos graficos
Quem Somos — sobre o projeto
Contato — formulario de contato
Login — interface de autenticacao (UI)
