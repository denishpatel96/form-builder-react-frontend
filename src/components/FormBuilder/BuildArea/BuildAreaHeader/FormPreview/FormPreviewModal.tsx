import React from "react";
import {
  ChevronLeftOutlined,
  LaptopOutlined,
  PhoneIphoneOutlined,
  PreviewOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  SxProps,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { FieldProps, IFormDesignProps } from "../../../Types";
import FormPreview from "./FormPreview";
import { getTheme } from "../../../../../theme";
import { cloneDeep } from "lodash";

const modalStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.default",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
};

type FormPreviewModalProps = {
  formFields: FieldProps[];
  formProperties: IFormDesignProps;
};

const FormPreviewModal = ({ formFields, formProperties }: FormPreviewModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [device, setDevice] = React.useState("phone");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDevice = (event: React.MouseEvent<HTMLElement>, newDevice: string) => {
    if (newDevice) {
      setDevice(newDevice);
    }
  };

  return (
    <>
      <Button size="small" variant="contained" startIcon={<PreviewOutlined />} onClick={handleOpen}>
        Preview
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Form Preview Modal"
        aria-describedby="You can see the preview of the form you have made in form builder area here."
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 50,
            }}
          >
            <Tooltip title="Back">
              <IconButton onClick={handleClose}>
                <ChevronLeftOutlined />
              </IconButton>
            </Tooltip>
            <Typography variant="subtitle1" pl={1}>
              Live Preview
            </Typography>
          </Box>

          <ThemeProvider theme={getTheme({ palette: cloneDeep(formProperties.palette) })}>
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                position: "relative",
                overflow: "scroll",
                bgcolor: (theme) => theme.palette?.background?.default,
                backgroundImage: `url(${formProperties.pageImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Box
                sx={{
                  margin: "8px auto",
                  padding: `${formProperties.verticalPadding}px ${formProperties.horizontalPadding}px`,
                  height: "auto",
                  width: "calc(100% - 48px)",
                  maxWidth: formProperties.formWidth,
                  bgcolor: (theme) => theme.palette.background.paper,
                  boxShadow: (theme) => theme.shadows[1],
                  borderRadius: 2,
                  ".MuiTypography-root": {
                    color: (theme) => theme.palette.text.secondary,
                  },
                  backgroundImage: `url(${formProperties.formImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  ...(device === "phone" && {
                    width: "100%",
                    height: "100%",
                    overflow: "scroll",
                    maxWidth: 394,
                    maxHeight: 850,
                    borderWidth: "12px",
                    borderColor: "darkgrey",
                    borderStyle: "solid",
                    borderRadius: 2,
                  }),
                }}
              >
                <FormPreview
                  formFields={formFields}
                  device={device}
                  formProperties={formProperties}
                />
              </Box>
            </Box>
          </ThemeProvider>

          <Box sx={{ height: 50, width: "100%", display: "flex", justifyContent: "center" }}>
            <ToggleButtonGroup
              exclusive
              value={device}
              onChange={handleDevice}
              aria-label="device"
              size="small"
              sx={{ p: 1 }}
            >
              <ToggleButton size="small" value="laptop" aria-label="laptop">
                <LaptopOutlined />
              </ToggleButton>
              <ToggleButton size="small" value="phone" aria-label="phone">
                <PhoneIphoneOutlined />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FormPreviewModal;
