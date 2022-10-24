import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ChihuoSelection } from "Selection";

export default () => {
  const [items, setItems] = useState([]);

  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionRect, setSelectionRect] = useState(null);
  const gridRef = useRef();

  useEffect(() => {
    document.oncontextmenu = function (event) {
      return false;
    };
    let its = [];
    for (let i = 0; i < 30; i++) {
      its.push({
        id: "" + i,
      });
    }
    setItems(its);
  }, []);

  const onSelectionModelChange = (models) => {
    setSelectionModel([...models]);
  };

  return (
    <ChihuoSelection
      selectionModel={selectionModel}
      onSelectionModelChange={onSelectionModelChange}
      itemsRef={gridRef}
    >
      <Grid
        ref={gridRef}
        container
        spacing={3}
        sx={{ backgroundColor: "white" }}
      >
        {items.map((item) => (
          <Grid
            key={item.id}
            data-key={item.id}
            sx={{ height: 180, width: "auto" }}
            item
            xs={1}
          >
            <Box
              sx={{
                backgroundColor: "#DDDDDD",
                border: selectionModel.includes(item.id)
                  ? "4px solid #555555"
                  : "none",
                width: "100%",
                height: "100%",
              }}
            ></Box>
          </Grid>
        ))}
      </Grid>
    </ChihuoSelection>
  );
};
