import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { usePutAppDataMutation } from "../../services/get-app.service";
import { IQueryModel } from "../../services/query.model";

import AppFilters from "../../components/Filters/AppFilters";
import { COLORS } from "../../styles/colors";

const columns: GridColDef[] = [
  {
    field: "appName",
    headerName: "App Name",
    width: 200,
  },
  { field: "category", headerName: "Category", width: 150 },
];

const AppsTable = () => {
  const [filterName, setFilterName] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const [debouncedFilterName, setDebouncedFilterName] = useState("");
  const [debouncedFilterCat, setDebouncedFilterCat] = useState("");

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const [putAppData, { data, isLoading }] = usePutAppDataMutation();

  const handleChangeCategory = (cat: string) => {
    setFilterCat(cat);
  };

  const handleChangeFilterName = (name: string) => {
    setFilterName(name);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilterName(filterName);
      setDebouncedFilterCat(filterCat);
    }, 500);

    return () => clearTimeout(timeout);
  }, [filterName, filterCat]);

  const fetchData = () => {
    const payload: IQueryModel = {
      appName: debouncedFilterName,
      category: debouncedFilterCat,
      pageNumber: paginationModel.page,
      pageSize: paginationModel.pageSize as 25 | 50,
    };
    putAppData(payload);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, debouncedFilterName, debouncedFilterCat]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: COLORS.Serfice[1],
      }}
    >
      <DataGrid
        rows={data?.appRows ?? []}
        columns={columns}
        rowCount={data?.totalCount ?? 0}
        pagination
        paginationMode="server"
        pageSizeOptions={[25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        getRowId={(row) => row.appId}
        style={{ marginRight: 10, backgroundColor: COLORS.Serfice[1] }}
        rowHeight={50}
      />
      <AppFilters
        onChangeFilterCategory={handleChangeCategory}
        onChangeFilterName={handleChangeFilterName}
      />
    </div>
  );
};

export default AppsTable;
