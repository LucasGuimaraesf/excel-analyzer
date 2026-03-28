import numpy as np
import pandas as pd


def _format_date(v):
    """Format a date/datetime value for display."""
    if hasattr(v, "strftime"):
        if hasattr(v, "hour") and v.hour == 0 and v.minute == 0 and v.second == 0:
            return v.strftime("%d/%m/%Y")
        return v.strftime("%d/%m/%Y %H:%M")
    return str(v)


def classify_column(series: pd.Series) -> str:
    """Classify a column as numeric, datetime, or categorical."""
    if pd.api.types.is_numeric_dtype(series):
        return "numeric"

    if pd.api.types.is_datetime64_any_dtype(series):
        return "datetime"

    # Try to parse as datetime
    clean = series.dropna()
    if len(clean) > 0:
        try:
            pd.to_datetime(clean.head(20), format="mixed")
            return "datetime"
        except (ValueError, TypeError):
            pass

    # Try to parse as numeric (backup)
    if len(clean) > 0:
        converted = pd.to_numeric(clean.head(20), errors="coerce")
        if converted.notna().sum() / len(converted) > 0.5:
            return "numeric"

    return "categorical"


def compute_stats(series: pd.Series) -> dict | None:
    """Compute basic stats for numeric columns."""
    if not pd.api.types.is_numeric_dtype(series):
        return None
    clean = series.dropna()
    if clean.empty:
        return None
    return {
        "mean": round(float(clean.mean()), 2),
        "median": round(float(clean.median()), 2),
        "min": round(float(clean.min()), 2),
        "max": round(float(clean.max()), 2),
        "std": round(float(clean.std()), 2),
    }


def analyze_dataframe(df: pd.DataFrame) -> dict:
    """Analyze a DataFrame and return column metadata."""
    columns_info = []

    for col in df.columns:
        series = df[col]
        dtype = classify_column(series)

        # Convert datetime columns for consistent handling
        if dtype == "datetime" and not pd.api.types.is_datetime64_any_dtype(series):
            df[col] = pd.to_datetime(series, format="mixed", errors="coerce")

        sample = series.dropna().head(5).tolist()
        # Convert numpy/pandas types to native Python for JSON serialization
        sample = [
            _format_date(v) if hasattr(v, "isoformat") else
            float(v) if isinstance(v, (np.integer, np.floating)) else
            str(v) if not isinstance(v, (int, float, str, bool)) else v
            for v in sample
        ]

        col_info = {
            "name": col,
            "dtype": dtype,
            "sample_values": sample,
            "null_count": int(series.isna().sum()),
            "unique_count": int(series.nunique()),
            "stats": compute_stats(series) if dtype == "numeric" else None,
        }
        columns_info.append(col_info)

    return {
        "row_count": len(df),
        "columns": columns_info,
        "dataframe": df,
    }
