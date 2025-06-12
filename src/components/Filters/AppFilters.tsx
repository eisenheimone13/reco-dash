import { COLORS } from "../../styles/colors";
import AppTextInput from "../app/AppTextInput";

interface IAppFilters {
  onChangeFilterName: (name: string) => void;
  onChangeFilterCategory: (category: string) => void;
}

const AppFilters = (props: IAppFilters) => {
  const { onChangeFilterName, onChangeFilterCategory } = props;

  const handleChangeFilterName = (filterName: string) => {
    onChangeFilterName(filterName);
  };

  const handleChangeFilterCategory = (filterCat: string) => {
    onChangeFilterCategory(filterCat);
  };

  return (
    <div
      style={{
        padding: 10,
        maxWidth: 330,
        width: "100%",
        backgroundColor: COLORS.Serfice[1],
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.section[1],
          color: "#FFF",
          paddingLeft: 16,
          paddingTop: 14,
          paddingBottom: 14,
          fontWeight: "500",
          fontSize: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#5B5B5B",
        }}
      >
        Filters
      </div>

      <AppTextInput
        onChange={handleChangeFilterName}
        id="appName"
        name={"name"}
        placeholder={"Name Filter"}
        style={{ marginTop: 10, marginBottom: 10 }}
        fullWidth={true}
      />

      <AppTextInput
        onChange={handleChangeFilterCategory}
        id="category"
        name={"category"}
        placeholder={"Category Filter"}
        fullWidth={true}
      />
    </div>
  );
};

export default AppFilters;
