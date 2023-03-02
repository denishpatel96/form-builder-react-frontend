import { Close, LaptopOutlined, PhoneIphoneOutlined, TvOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import FormPreview from "./FormPreview";

const modalStyle = {
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

const cardContentStyle = {
  maxHeight: "calc(100vh - 140px)",
  overflow: "auto",
};

type FormPreviewModalProps = {
  formFields: any[];
};

const FormPreviewModal = ({ formFields }: FormPreviewModalProps) => {
  const [open, setOpen] = React.useState(false);

  const [device, setDevice] = React.useState(() => ["laptop"]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDevice = (event: React.MouseEvent<HTMLElement>, newDevices: string[]) => {
    if (newDevices.length) {
      setDevice(newDevices);
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
        <Card sx={modalStyle}>
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
            <FormPreview formFields={formFields} />
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}></CardActions>
        </Card>
      </Modal>
    </>
  );
};

export default FormPreviewModal;
