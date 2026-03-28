from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.analysis import AnalysisResponse
from app.services.analysis_service import analyze_dataframe
from app.services.chart_service import suggest_charts
from app.utils.excel_parser import parse_excel

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("/upload", response_model=AnalysisResponse)
async def upload_excel(file: UploadFile = File(...)):
    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Somente arquivos Excel (.xlsx, .xls) sao aceitos")

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="Arquivo excede o limite de 10MB")

    try:
        df = parse_excel(contents)
    except Exception:
        raise HTTPException(status_code=422, detail="Erro ao ler o arquivo Excel. Verifique se o formato esta correto.")

    if df.empty:
        raise HTTPException(status_code=422, detail="A planilha esta vazia")

    analysis = analyze_dataframe(df)

    # Debug: print detected columns
    for col in analysis["columns"]:
        print(f"  Coluna: {col['name']} | Tipo: {col['dtype']} | Unicos: {col['unique_count']} | Nulos: {col['null_count']} | Exemplos: {col['sample_values'][:3]}")

    charts = suggest_charts(analysis["columns"], analysis["dataframe"])
    print(f"  Graficos gerados: {len(charts)}")

    return AnalysisResponse(
        filename=file.filename,
        row_count=analysis["row_count"],
        columns=analysis["columns"],
        suggested_charts=charts,
    )
