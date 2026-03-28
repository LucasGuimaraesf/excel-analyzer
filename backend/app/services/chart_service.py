import numpy as np
import pandas as pd


def _serialize_value(v):
    """Convert a value to JSON-serializable type."""
    if hasattr(v, "strftime"):
        if hasattr(v, "hour") and v.hour == 0 and v.minute == 0 and v.second == 0:
            return v.strftime("%d/%m/%Y")
        return v.strftime("%d/%m/%Y %H:%M")
    if isinstance(v, (np.integer,)):
        return int(v)
    if isinstance(v, (np.floating,)):
        return round(float(v), 2)
    if isinstance(v, float) and np.isnan(v):
        return 0
    if isinstance(v, (int, float, str, bool)):
        return v
    return str(v)


def _prepare_chart_data(df: pd.DataFrame, x_col: str, y_col: str, aggregation: str | None) -> list[dict]:
    """Prepare data array for Recharts."""
    if aggregation:
        grouped = df.groupby(x_col)[y_col].agg(aggregation).reset_index()
        grouped = grouped.sort_values(y_col, ascending=False).head(20)
    else:
        grouped = df[[x_col, y_col]].dropna().head(100)

    rows = []
    for _, row in grouped.iterrows():
        rows.append({
            x_col: _serialize_value(row[x_col]),
            y_col: _serialize_value(row[y_col]),
        })
    return rows


def _limit_pie_slices(data: list[dict], y_col: str, x_col: str, max_slices: int = 6) -> list[dict]:
    """Group small slices into 'Outros' for cleaner pie charts."""
    if len(data) <= max_slices:
        return data

    # Sort by value descending
    sorted_data = sorted(data, key=lambda d: d.get(y_col, 0), reverse=True)
    top = sorted_data[: max_slices - 1]
    rest = sorted_data[max_slices - 1 :]

    outros_total = sum(d.get(y_col, 0) for d in rest)
    if outros_total > 0:
        top.append({x_col: "Outros", y_col: round(outros_total, 2)})

    return top


def _next_id(counter: list) -> str:
    counter[0] += 1
    return f"chart_{counter[0]}"


def suggest_charts(columns_info: list[dict], df: pd.DataFrame) -> list[dict]:
    """Generate chart suggestions based on column analysis."""
    suggestions = []
    counter = [0]

    numeric_cols = [c for c in columns_info if c["dtype"] == "numeric"]
    categorical_cols = [c for c in columns_info if c["dtype"] == "categorical" and c["unique_count"] <= 30]
    datetime_cols = [c for c in columns_info if c["dtype"] == "datetime"]

    # Rule 1: categorical + numeric → bar chart
    for cat in categorical_cols:
        for num in numeric_cols:
            if len(suggestions) >= 6:
                break
            data = _prepare_chart_data(df, cat["name"], num["name"], "sum")
            if data:
                suggestions.append({
                    "id": _next_id(counter),
                    "title": f"{num['name']} por {cat['name']}",
                    "chart_type": "bar",
                    "x_column": cat["name"],
                    "y_column": num["name"],
                    "aggregation": "sum",
                    "reason": f"Coluna categorica + numerica sugere comparacao por barras",
                    "data": data,
                })

    # Rule 2: datetime + numeric → line chart
    for dt in datetime_cols:
        for num in numeric_cols:
            if len(suggestions) >= 6:
                break
            sorted_df = df.sort_values(dt["name"])
            data = _prepare_chart_data(sorted_df, dt["name"], num["name"], None)
            if data:
                suggestions.append({
                    "id": _next_id(counter),
                    "title": f"{num['name']} ao longo do tempo",
                    "chart_type": "line",
                    "x_column": dt["name"],
                    "y_column": num["name"],
                    "aggregation": None,
                    "reason": f"Coluna temporal + numerica sugere tendencia em linha",
                    "data": data,
                })

    # Rule 3: categorical (few values) + numeric → pie chart (limited slices)
    for cat in categorical_cols:
        if cat["unique_count"] > 12:
            continue
        for num in numeric_cols:
            if len(suggestions) >= 6:
                break
            data = _prepare_chart_data(df, cat["name"], num["name"], "sum")
            if data:
                data = _limit_pie_slices(data, num["name"], cat["name"])
                suggestions.append({
                    "id": _next_id(counter),
                    "title": f"Distribuicao de {num['name']} por {cat['name']}",
                    "chart_type": "pie",
                    "x_column": cat["name"],
                    "y_column": num["name"],
                    "aggregation": "sum",
                    "reason": f"Poucas categorias permite visualizacao em pizza",
                    "data": data,
                })

    # Rule 4 (FALLBACK): Only categorical → frequency count
    if len(suggestions) == 0 and categorical_cols:
        for cat in categorical_cols[:3]:
            if len(suggestions) >= 6:
                break
            counts = df[cat["name"]].value_counts().head(20).reset_index()
            counts.columns = [cat["name"], "Contagem"]
            data = []
            for _, row in counts.iterrows():
                data.append({
                    cat["name"]: _serialize_value(row[cat["name"]]),
                    "Contagem": int(row["Contagem"]),
                })
            if data:
                suggestions.append({
                    "id": _next_id(counter),
                    "title": f"Frequencia de {cat['name']}",
                    "chart_type": "bar",
                    "x_column": cat["name"],
                    "y_column": "Contagem",
                    "aggregation": "count",
                    "reason": f"Contagem de valores unicos",
                    "data": data,
                })

    # Rule 5 (FALLBACK): Only numeric (2+) → line chart
    if len(suggestions) == 0 and len(numeric_cols) >= 2:
        x_col = numeric_cols[0]
        for y_col in numeric_cols[1:4]:
            if len(suggestions) >= 6:
                break
            data = _prepare_chart_data(df, x_col["name"], y_col["name"], None)
            if data:
                suggestions.append({
                    "id": _next_id(counter),
                    "title": f"{y_col['name']} vs {x_col['name']}",
                    "chart_type": "line",
                    "x_column": x_col["name"],
                    "y_column": y_col["name"],
                    "aggregation": None,
                    "reason": f"Relacao entre colunas numericas",
                    "data": data,
                })

    # Rule 6 (FALLBACK): Single numeric → histogram
    if len(suggestions) == 0 and len(numeric_cols) == 1:
        col_name = numeric_cols[0]["name"]
        series = df[col_name].dropna()
        if len(series) > 0:
            bins = min(10, series.nunique())
            if bins > 1:
                cut = pd.cut(series, bins=bins)
                counts = cut.value_counts().sort_index()
                data = []
                for interval, count in counts.items():
                    data.append({col_name: str(interval), "Contagem": int(count)})
                if data:
                    suggestions.append({
                        "id": _next_id(counter),
                        "title": f"Distribuicao de {col_name}",
                        "chart_type": "bar",
                        "x_column": col_name,
                        "y_column": "Contagem",
                        "aggregation": "histogram",
                        "reason": f"Distribuicao dos valores em faixas",
                        "data": data,
                    })

    # Rule 7 (ULTIMATE FALLBACK): Use first columns
    if len(suggestions) == 0 and len(columns_info) >= 1:
        for col in columns_info[:2]:
            if len(suggestions) >= 6:
                break
            counts = df[col["name"]].value_counts().head(20).reset_index()
            counts.columns = [col["name"], "Contagem"]
            data = []
            for _, row in counts.iterrows():
                data.append({
                    col["name"]: _serialize_value(row[col["name"]]),
                    "Contagem": int(row["Contagem"]),
                })
            if data:
                suggestions.append({
                    "id": _next_id(counter),
                    "title": f"Frequencia de {col['name']}",
                    "chart_type": "bar",
                    "x_column": col["name"],
                    "y_column": "Contagem",
                    "aggregation": "count",
                    "reason": f"Contagem automatica dos valores",
                    "data": data,
                })

    return suggestions[:6]
