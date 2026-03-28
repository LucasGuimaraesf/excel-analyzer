import io
import re

import pandas as pd


def _find_best_header_row(file_bytes: bytes, max_rows: int = 3) -> int:
    """Try multiple header rows and pick the one with fewest 'Unnamed' columns."""
    best_row = 0
    best_unnamed_count = float("inf")

    for row in range(max_rows):
        try:
            df = pd.read_excel(io.BytesIO(file_bytes), engine="openpyxl", header=row)
            df = df.dropna(axis=1, how="all")

            if df.empty or len(df.columns) == 0:
                continue

            unnamed_count = sum(
                1 for col in df.columns
                if re.match(r"^Unnamed: \d+$", str(col))
            )

            # Prefer the row with fewer unnamed columns
            # On tie, prefer lower row (less data loss)
            if unnamed_count < best_unnamed_count:
                best_unnamed_count = unnamed_count
                best_row = row
        except Exception:
            continue

    return best_row


def parse_excel(file_bytes: bytes) -> pd.DataFrame:
    """Read Excel bytes into a cleaned DataFrame."""
    header_row = _find_best_header_row(file_bytes)
    df = pd.read_excel(io.BytesIO(file_bytes), engine="openpyxl", header=header_row)

    # Remove fully empty rows/columns
    df = df.dropna(how="all").dropna(axis=1, how="all")

    # Rename any remaining "Unnamed" columns
    new_columns = []
    col_counter = 1
    for col in df.columns:
        if re.match(r"^Unnamed: \d+$", str(col)):
            new_columns.append(f"Coluna_{col_counter}")
        else:
            new_columns.append(str(col))
        col_counter += 1
    df.columns = new_columns

    # Strip whitespace from string columns
    for col in df.select_dtypes(include=["object"]).columns:
        df[col] = df[col].astype(str).str.strip()
        # Replace "nan" strings from astype(str)
        df[col] = df[col].replace("nan", pd.NA)

    # Try to convert string columns to numeric
    for col in df.select_dtypes(include=["object"]).columns:
        converted = pd.to_numeric(df[col], errors="coerce")
        non_null_original = df[col].notna().sum()
        if non_null_original > 0:
            conversion_rate = converted.notna().sum() / non_null_original
            if conversion_rate > 0.5:
                df[col] = converted

    return df
