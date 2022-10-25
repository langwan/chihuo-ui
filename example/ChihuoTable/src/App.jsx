import {
  Box,
  ClickAwayListener,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  randomBoolean,
  randomId,
  randomInt,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import {
  IconCopy,
  IconEdit,
  IconFile,
  IconFolder,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons";
import { ChihuoTable } from "ChihuoTable";
import { useEffect, useState } from "react";

function formatFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
}

const columns = [
  {
    field: "name",
    headerName: "文件名",
    renderCell: (params) => (
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent="flex-start"
      >
        {params.row.type == "folder" ? (
          <IconFolder stroke={1} />
        ) : (
          <IconFile stroke={1} />
        )}
        <Box pl={1}>{params.row.name}</Box>
      </Stack>
    ),
  },
  {
    field: "total_bytes",
    headerName: "大小",
    width: 140,
    renderCell: (params) => formatFileSize(params.row.total_bytes),
  },
  {
    field: "updated_at",
    headerName: "修改时间",
    width: 160,
    renderCell: (params) => {
      return new Date(params.row.updated_at).toLocaleString();
    },
  },
  {
    field: "op",
    headerName: "操作",
    width: 160,
    renderCell: (params) => <Box>11</Box>,
  },
];

export default () => {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [cellModesModel, setCellModesModel] = useState({});
  const [rowContextMenu, setRowContextMenu] = useState(null);
  useEffect(() => {
    document.oncontextmenu = function (event) {
      return false;
    };
    let result = [];
    for (var i = 0; i < 20; i++) {
      result.push({
        id: randomId(),
        name: randomTraderName(),
        size: randomInt(1024 * 50, 1024 * 1024 * 100),
        utime: randomUpdatedDate().getTime(),
        type: randomBoolean() ? "folder" : "file",
      });
    }
    result = [
      {
        id: 1,
        updated_at: "2022-10-21T05:16:46.717174+08:00",
        asset_name: "学习",
        name: "sample1.mp4",
        local_path: "samples/sample1.mp4",
        dst_path: "/Users/langwan/Documents/.chiplayer/data/学习/sample1.mp4",
        total_bytes: 3372396,
        consumed_bytes: 0,
        is_completed: false,
        error: "",
      },
      {
        id: 2,
        updated_at: "2022-10-21T05:18:07.336604+08:00",
        asset_name: "学习",
        name: "sample1.mp4",
        local_path: "samples/sample1.mp4",
        dst_path: "/Users/langwan/Documents/.chiplayer/data/学习/sample1.mp4",
        total_bytes: 3372396,
        consumed_bytes: 0,
        is_completed: false,
        error: "",
      },
      {
        id: 3,
        updated_at: "2022-10-21T05:18:51.243295+08:00",
        asset_name: "学习",
        name: "sample1.mp4",
        local_path: "samples/sample1.mp4",
        dst_path: "/Users/langwan/Documents/.chiplayer/data/学习/sample1.mp4",
        total_bytes: 3372396,
        consumed_bytes: 0,
        is_completed: true,
        error: "",
      },
      {
        id: 4,
        updated_at: "2022-10-21T05:19:42.215888+08:00",
        asset_name: "学习",
        name: "sample1.mp4",
        local_path: "samples/sample1.mp4",
        dst_path: "/Users/langwan/Documents/.chiplayer/data/学习/sample1.mp4",
        total_bytes: 3372396,
        consumed_bytes: 0,
        is_completed: false,
        error: "",
      },
      {
        id: 5,
        updated_at: "2022-10-21T05:20:35.713175+08:00",
        asset_name: "学习",
        name: "sample1.mp4",
        local_path: "samples/sample1.mp4",
        dst_path: "/Users/langwan/Documents/.chiplayer/data/学习/sample1.mp4",
        total_bytes: 3372396,
        consumed_bytes: 0,
        is_completed: true,
        error: "",
      },
    ];
    setRows(result);

    return () => {};
  }, []);
  const onSelectionModelChange = (newSelection) => {
    setSelectionModel([...newSelection]);
  };
  const onRowClick = (row, event) => {};
  const onRowContextMenu = (row, event) => {
    if (!selectionModel.includes(row.id)) {
      setSelectionModel([row.id]);
    }

    event.stopPropagation();
    event.preventDefault();

    setRowContextMenu(
      rowContextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };
  const onCellEditStop = (id, field, value) => {
    setCellModesModel({});
    const result = rows.map((row) => {
      if (row.id == id) {
        return { ...row, [field]: value };
      } else {
        return row;
      }
    });

    setRows([...result]);
  };
  const onCellEditStart = (ref) => {};

  const onSortModelChange = (filed, sort) => {};
  const onLoadMore = () => {
    const result = [];
    for (var i = 0; i < 20; i++) {
      result.push({
        id: randomId(),
        name: randomTraderName(),
        size: randomInt(1024 * 50, 1024 * 1024 * 100),
        utime: randomUpdatedDate().getTime(),
        type: randomBoolean() ? "folder" : "file",
      });
    }
    setRows([...rows, ...result]);
  };
  const onContentMenuClose = (event) => {
    setRowContextMenu(null);
  };
  return (
    <Box>
      <ChihuoTable
        rows={rows}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        getRowId={(row) => row.id}
        rowHeight={40}
        onRowClick={onRowClick}
        headerHeight={40}
        columns={columns}
        cellModesModel={cellModesModel}
        onCellEditStart={onCellEditStart}
        onCellEditStop={onCellEditStop}
        onRowContextMenu={onRowContextMenu}
        onLoadMore={onLoadMore}
        onSortModelChange={onSortModelChange}
        initialState={{ sorting: { field: "updated_at", sort: "desc" } }}
      />
      <ClickAwayListener
        mouseEvent="onMouseDown"
        onClickAway={() => {
          setRowContextMenu(null);
        }}
      >
        <Menu
          sx={{
            "&.MuiPopover-root": {
              pointerEvents: "none",
            },
            "& .MuiPopover-paper": {
              pointerEvents: "auto",
              width: 260,
              maxWidth: "100%",
            },
          }}
          open={rowContextMenu !== null}
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorReference="anchorPosition"
          onClose={onContentMenuClose}
          anchorPosition={
            rowContextMenu !== null
              ? { top: rowContextMenu.mouseY, left: rowContextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={onContentMenuClose}>
            <ListItemIcon>
              <IconPlayerPlay stroke={1} width={20} />
            </ListItemIcon>
            <ListItemText>执行</ListItemText>
            <Typography>⌘C</Typography>
          </MenuItem>
          <MenuItem onClick={onContentMenuClose}>
            <ListItemIcon>
              <IconCopy stroke={1} width={20} />
            </ListItemIcon>
            <ListItemText>拷贝</ListItemText>
            <Typography>⌘C</Typography>
          </MenuItem>
          <MenuItem onClick={onContentMenuClose}>
            <ListItemIcon>
              <IconEdit stroke={1} width={20} />
            </ListItemIcon>
            <ListItemText>编辑</ListItemText>
            <Typography>⌘E</Typography>
          </MenuItem>
          <MenuItem onClick={onContentMenuClose}>
            <ListItemIcon>
              <IconTrash stroke={1} width={20} />
            </ListItemIcon>
            <ListItemText>删除</ListItemText>
            <Typography>⌘D</Typography>
          </MenuItem>
        </Menu>
      </ClickAwayListener>
    </Box>
  );
};
