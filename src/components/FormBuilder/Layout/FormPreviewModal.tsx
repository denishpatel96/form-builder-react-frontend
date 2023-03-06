import { Close, LaptopOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { FieldProps } from "../FormElements/Common/Types";
import FormPreview from "./FormPreview";

const modalStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const cardContentStyle: SxProps = {
  maxHeight: "calc(100% - 70px)",
  overflow: "auto",
};

type FormPreviewModalProps = {
  formFields: FieldProps[];
};

const FormPreviewModal = ({ formFields }: FormPreviewModalProps) => {
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
      <Button size="small" onClick={handleOpen}>
        Preview
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Form Preview Modal"
        aria-describedby="You can see the preview of the form you have made in form builder area here."
      >
        <Card
          sx={{
            ...modalStyle,
            ...(device === "phone" && { width: 390, height: 844, maxHeight: "100%" }),
          }}
        >
          <CardHeader
            title={
              <Grid container alignItems={"center"}>
                <Typography variant="subtitle1">Preview</Typography>
                <ToggleButtonGroup
                  exclusive
                  value={device}
                  onChange={handleDevice}
                  aria-label="device"
                  size="small"
                  sx={{ pl: 2 }}
                >
                  <ToggleButton value="laptop" aria-label="laptop">
                    <LaptopOutlined />
                  </ToggleButton>
                  <ToggleButton value="phone" aria-label="phone">
                    <PhoneIphoneOutlined />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            }
            action={
              <Tooltip title="Close">
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Tooltip>
            }
          />

          <CardContent sx={cardContentStyle}>
            <FormPreview formFields={formFields} device={device} />
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}></CardActions>
        </Card>
      </Modal>
    </>
  );
};

export default FormPreviewModal;
