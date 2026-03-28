# Excel Analyzer

Aplicação web que analisa automaticamente arquivos Excel (`.xlsx`) e gera gráficos inteligentes.
Basta fazer upload da planilha — o sistema detecta os tipos de dados, identifica padrões e cria visualizações prontas.

---

## Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| **Detecção automática de cabeçalhos** | Funciona com qualquer formato de planilha Excel |
| **Classificação inteligente de colunas** | Identifica dados numéricos, categóricos e datas |
| **Geração automática de gráficos** | Barras, linhas e pizza com 7 regras em cascata |
| **Filtros interativos** | Selecione quais categorias exibir nos gráficos em tempo real |
| **Troca de tipo de gráfico** | Alterne entre barras, linhas e pizza com um clique |
| **Download de gráficos** | Exporte qualquer gráfico como imagem PNG |
| **Formatação brasileira** | Datas em DD/MM/YYYY e valores em R$ |

---

## Stack

**Backend**
- Python · FastAPI · pandas · openpyxl · numpy

**Frontend**
- React · Vite · Recharts · Tailwind CSS · React Router DOM

---

## Como rodar

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate             # Windows
# source venv/bin/activate        # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Acesse http://localhost:5173 no navegador.


