# Excel Data Analyzer

Aplicacao web que recebe arquivos Excel (.xlsx), analisa automaticamente os dados e gera graficos inteligentes.

## Stack
- Backend: FastAPI (Python) com pandas, openpyxl, numpy
- Frontend: React (Vite) com Recharts e Tailwind CSS
- Sem banco de dados no MVP - tudo em memoria

## Estrutura
- `backend/` — API FastAPI
- `frontend/` — App React com Vite

## Convencoes
- Codigo limpo e modular
- Backend e frontend claramente separados
- Arquivos Excel NAO sao persistidos no servidor
- API retorna dados pre-agregados prontos para Recharts
