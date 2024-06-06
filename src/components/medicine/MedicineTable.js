import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Table from "../UI/Table";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

const MedicineTable = (props) => {
  const [medicines, setMedicines] = useState([]);
  const {searchText, showLowInventory} = props;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicare/v1/medicines",
      {
        params: {
          medicineName: searchText === '' ? null : searchText,
          lowInventory: showLowInventory ?? null
        }
      });
    const data = await response.data;
    setMedicines(data.sort((med1, med2) => med2.id - med1.id));
  }, [searchText, showLowInventory]);

  const columns = [
    {field: 'name', headerName: 'Medicine', flex: 3},
    {field: 'type', headerName: 'Type', flex: 0.75},
    {field: 'unitPrice', headerName: 'Unit Price', flex: 1},
    {field: 'units', headerName: 'Units', flex: 1},
    {field: 'minimumUnits', headerName: 'Minimum Units', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title={"Edit"}>
              <EditIcon fontSize="large" sx={{color: "#b25600"}}/>
            </Tooltip>
          }
          component={Link}
          to={`${params.id}/edit`}
          label="Edit"
        />,
      ],
    },
  ];

  return (
    <Table columns={columns} rows={medicines}/>
  );
};

export default MedicineTable;