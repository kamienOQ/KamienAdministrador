import { useCallback } from "react";
import { Fab } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useOrdersUi } from "../../../hooks";
import { Box } from "@mui/system";

export const OrderActions = ({ row }) => {
  const { onViewOrder, onEditOrder } = useOrdersUi();

  const viewOrder = useCallback((row) => onViewOrder(row), []);

  const editOrder = useCallback((row) => onEditOrder(row), []);

  return (
    <>
      <Box
        sx={{
          m: 1,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          minWidth: "100%",
        }}
      >
        <Fab
          color="primary"
          onClick={() => viewOrder(row)}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "info.main",
            color: "white",
            "&:hover": { bgcolor: "info.main" },
          }}
        >
          <VisibilityIcon />
        </Fab>
        <Fab
          color="edit"
          onClick={() => editOrder(row)}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "edit.main",
            color: "white",
            "&:hover": { bgcolor: "edit.main" },
          }}
        >
          <EditIcon />
        </Fab>
      </Box>
    </>
  );
};
