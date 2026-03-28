from pydantic import BaseModel


class ColumnInfo(BaseModel):
    name: str
    dtype: str  # "numeric", "categorical", "datetime"
    sample_values: list
    null_count: int
    unique_count: int
    stats: dict | None = None


class ChartSuggestion(BaseModel):
    id: str
    title: str
    chart_type: str  # "bar", "line", "pie"
    x_column: str
    y_column: str
    aggregation: str | None = None
    reason: str
    data: list[dict]


class AnalysisResponse(BaseModel):
    filename: str
    row_count: int
    columns: list[ColumnInfo]
    suggested_charts: list[ChartSuggestion]
