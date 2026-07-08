# Backend FastAPI — imagem enxuta baseada em Python slim
FROM python:3.12-slim

# Evita arquivos .pyc e garante logs sem buffer
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Instala dependências primeiro (aproveita o cache de camadas do Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação
COPY app ./app

EXPOSE 8000

# Sobe a API. host 0.0.0.0 para ser acessível fora do container.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
