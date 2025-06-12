import React, { useEffect, useState, useMemo } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { usePutAppDataMutation } from "../../services/get-app.service";
import { IQueryModel } from "../../services/query.model";
import AppFilters from "../../components/Filters/AppFilters";
import { COLORS } from "../../styles/colors";
import { Alert } from "@mui/material";

const columns: GridColDef[] = [
  { field: "appName", headerName: "App Name", width: 250 },
  { field: "category", headerName: "Category", width: 250 },
];

const AppsTable = () => {
  const [filterName, setFilterName] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const [debouncedName, setDebouncedName] = useState("");
  const [debouncedCat, setDebouncedCat] = useState("");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<25 | 50>(25);

  const [error, setError] = useState<string | null>(null);
  const [putAppData, { data, isLoading }] = usePutAppDataMutation();

  const onChangeFilterName = (name: string) => {
    setFilterName(name);
  };
  const onChangeFilterCategory = (cat: string) => {
    setFilterCat(cat);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedName(filterName);
      setDebouncedCat(filterCat);
      setPage(0);
    }, 700);
    return () => clearTimeout(id);
  }, [filterName, filterCat]);

  const paginationModel: GridPaginationModel = useMemo(
    () => ({ page, pageSize }),
    [page, pageSize]
  );

  useEffect(() => {
    const fetchData = async () => {
      const payload: IQueryModel = {
        appName: debouncedName,
        category: debouncedCat,
        pageNumber: page,
        pageSize: pageSize,
      };
      try {
        await putAppData(payload).unwrap();
        setError(null);
      } catch (e: any) {
        setError(
          e?.data?.error ||
            "The server is temporarily unavailable. Please try again later."
        );
      }
    };
    fetchData();
  }, [debouncedName, debouncedCat, page, pageSize, putAppData]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: COLORS.Serfice[1],
        padding: 16,
      }}
    >
      <div style={{ flex: 1 }}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <DataGrid
          rows={data?.appRows ?? []}
          columns={columns}
          rowCount={data?.totalCount ?? 0}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize as 25 | 50);
          }}
          pageSizeOptions={[25, 50]}
          loading={isLoading}
          getRowId={(row) => row.appId}
          rowHeight={50}
          style={{
            marginRight: 10,
            backgroundColor: COLORS.Serfice[1],
          }}
          sx={{
            color: "#FFF",
            fontSize: 12,
            fontWeight: "400",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(181, 230, 0, 0.08) !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: COLORS.Serfice[1],
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              backgroundColor: "transparent !important",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "#fff",
            },
          }}
        />
      </div>

      <AppFilters
        onChangeFilterName={onChangeFilterName}
        onChangeFilterCategory={onChangeFilterCategory}
      />
    </div>
  );
};

export default AppsTable;
