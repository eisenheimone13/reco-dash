import { OutlinedInput } from "@mui/material";
import { COLORS } from "../../styles/colors";

interface IAppInput {
  id: string;
  name: string;
  placeholder: string;
  onChange: (text: string) => void;

  fullWidth?: boolean;
  style?: any;
}

const AppInput = (props: IAppInput) => {
  const { id, name, placeholder, onChange, style, fullWidth } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div style={{ ...style }}>
      <OutlinedInput
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          backgroundColor: COLORS.Serfice[1],
          color: COLORS.white,
          fontSize: 12,
        }}
        fullWidth={fullWidth}
      />
    </div>
  );
};

export default AppInput;
