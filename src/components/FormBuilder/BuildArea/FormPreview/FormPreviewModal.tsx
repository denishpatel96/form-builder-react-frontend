import React from "react";
import {
  ArrowBackOutlined,
  ChevronLeftOutlined,
  LaptopOutlined,
  PhoneIphoneOutlined,
  PreviewOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  SxProps,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { IFieldProps, IFormDesignProps } from "../../Types";
import FormPreview from "./FormPreview";
import { getCustomTheme } from "../../../../theme";
import { cloneDeep } from "lodash";
import SuccessAnimated from "../../../Reusable/SuccessAnimated";

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
  formFields: IFieldProps[];
  formProperties: IFormDesignProps;
};

const FormPreviewModal = ({ formFields, formProperties }: FormPreviewModalProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [showSuccessPage, setShowSuccessPage] = React.useState<boolean>(false);
  const [device, setDevice] = React.useState("laptop");
  const handleOpen = () => {
    setOpen(true);
    setShowSuccessPage(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDevice = (_event: React.MouseEvent<HTMLElement>, newDevice: string) => {
    if (newDevice) {
      setDevice(newDevice);
    }
  };

  const handleSubmitSuccess = () => {
    setShowSuccessPage(true);
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
              background: (theme) => theme.palette.background.paper,
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
            <ToggleButtonGroup
              exclusive
              value={device}
              onChange={handleDevice}
              aria-label="device"
              size="small"
              sx={{ ml: "auto", mr: 1, p: 1 }}
            >
              <ToggleButton size="small" value="laptop" aria-label="laptop">
                <LaptopOutlined />
              </ToggleButton>
              <ToggleButton size="small" value="phone" aria-label="phone">
                <PhoneIphoneOutlined />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <ThemeProvider theme={getCustomTheme({ ...cloneDeep(formProperties.palette) })}>
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                position: "relative",
                overflow: "scroll",
                bgcolor: (theme) =>
                  formProperties.formBgColor || theme.palette?.background?.default,
                backgroundImage: `url(${formProperties.formBgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Box
                sx={{
                  margin: "16px auto",
                  padding: `${formProperties.verticalPadding}px ${formProperties.horizontalPadding}px`,
                  height: "auto",
                  width: "calc(100% - 48px)",
                  maxWidth: formProperties.formWidth,
                  bgcolor: (theme) => formProperties.pageBgColor || theme.palette.background.paper,
                  boxShadow: (theme) => theme.shadows[1],
                  borderRadius: 2,
                  ".MuiTypography-root": {
                    color: (theme) => theme.palette.text.secondary,
                  },
                  backgroundImage: `url(${formProperties.pageBgImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  ...(device === "phone" && {
                    width: "100%",
                    height: "100%",
                    overflow: "scroll",
                    maxWidth: 394,
                    maxHeight: 850,
                    borderWidth: "12px",
                    borderColor: "black",
                    borderStyle: "solid",
                    borderRadius: 2,
                  }),
                }}
              >
                {showSuccessPage ? (
                  <Stack spacing={2} alignItems={"center"}>
                    <SuccessAnimated />
                    <Typography variant="subtitle1">Thank you for submitting the form!</Typography>
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBackOutlined />}
                      onClick={() => {
                        setShowSuccessPage(false)
                      }}
                    >
                      Back to Form
                    </Button>
                  </Stack>
                ) : (
                  <FormPreview
                    formFields={formFields}
                    device={device}
                    formProperties={formProperties}
                    onSuccess={handleSubmitSuccess}
                  />
                )}
              </Box>
            </Box>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
};

export default FormPreviewModal;
