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

## Documentação

A documentação de Engenharia de Requisitos (SRS) está em [`docs/`](docs/00-indice.md):
requisitos funcionais e não funcionais, SRS tradicional, backlog ágil (DoR/DoD) e validação.

---

## Como rodar com Docker (recomendado)

A forma mais simples — **não precisa instalar Python nem Node**, apenas o
[Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
git clone <url-do-repo>
cd excel-data-analyzer
docker compose up --build
```

Depois acesse:

- **Aplicação:** [http://localhost:8080](http://localhost:8080)
- **API / Swagger:** [http://localhost:8000/docs](http://localhost:8000/docs)

Para parar: `Ctrl+C` e depois `docker compose down`.

> A primeira execução baixa as imagens e compila o frontend (alguns minutos).
> As próximas sobem em segundos graças ao cache do Docker.

### Erro: "container name is already in use"

Se ao subir aparecer algo como `Conflict. The container name "/excel-analyzer-backend"
is already in use`, existe um container antigo com esse nome (por exemplo, de uma execução
anterior em outra pasta). Remova os containers e suba novamente:

```bash
docker rm -f excel-analyzer-backend excel-analyzer-frontend
docker compose up -d --build
```

---

## Como rodar manualmente (desenvolvimento)

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

Acesse [http://localhost:5173](http://localhost:5173)  no navegador.


