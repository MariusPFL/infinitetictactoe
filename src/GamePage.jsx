import { useState } from "react";
import "./App.css";
import Field from "./Field";
import { Button, IconButton, Switch } from "@mui/material";
import TurnChangeModal from "./TurnChangeModal";
import TutorialModal from "./TutorialModal";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";

function GamePage() {
  // LocalStorage
  const LSFIELD = "smallField";
  const LSMUTEMODAL = "muteModal";

  const smallField = localStorage.getItem(LSFIELD) == "false";
  const MAXPLACEMENTS = smallField ? 3 : 4;
  const PLACEMENTSTOWIN = smallField ? 3 : 4;
  const FIELDSIDELENGTH = smallField ? 3 : 5;
  const [field, setField] = useState(initializeField());
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [placementsFromPlayerX, setPlacementsFromPlayerX] = useState([]);
  const [placementsFromPlayerY, setPlacementsFromPlayerY] = useState([]);
  const [modalDeactivated, setModalDeactivated] = useState(localStorage.getItem(LSMUTEMODAL) === "true");
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  function changeField(rowIndex, columnIndex, value) {
    setField((oldField) =>
      oldField.map((row, rowIndexMap) =>
        rowIndexMap == rowIndex
          ? row.map((item, columnIndexMap) =>
              columnIndexMap == columnIndex ? value : item
            )
          : row
      )
    );
  }
  function initializeField() {
    let list = [];
    for (let row = 0; row < FIELDSIDELENGTH; row++) {
      let rowList = [];
      for (let column = 0; column < FIELDSIDELENGTH; column++) {
        rowList.push("");
      }
      list.push(rowList);
    }
    return list;
  }

  function getFieldValue(rowIndex, columnIndex) {
    return field[rowIndex][columnIndex];
  }
  function win(player) {
    window.location.href = "/win/" + player;
  }
  async function changeHandler(rowIndex, columnIndex) {
    // alert("params: x:" + rowIndex + " y:" + columnIndex)
    if (getFieldValue(rowIndex, columnIndex) == "") {
      changeField(rowIndex, columnIndex, currentPlayer);
      if (currentPlayer == "x") {
        setPlacementsFromPlayerX((oldValue) => {
          const newList = [
            ...oldValue,
            { row: rowIndex.toString(), column: columnIndex.toString() },
          ];
          if (oldValue.length == MAXPLACEMENTS - 1) {
            if (checkWin(newList)) {
              win("x");
            }
          }
          return newList;
        });
        if (placementsFromPlayerX.length >= MAXPLACEMENTS) {
          changeField(
            placementsFromPlayerX[0].row,
            placementsFromPlayerX[0].column,
            ""
          );
          setPlacementsFromPlayerX((oldValue) => {
            const newValue = oldValue.slice(1, oldValue.length);
            if (checkWin(newValue)) {
              win("x");
            }
            return newValue;
          });
        }
        setCurrentPlayer("y");
      } else if (currentPlayer == "y") {
        // console.log("Field before, ", field);
        // console.log("placementList before: ", placementsFromPlayerY);
        setPlacementsFromPlayerY((oldValue) => {
          const newList = [
            ...oldValue,
            { row: rowIndex.toString(), column: columnIndex.toString() },
          ];
          if (oldValue.length == MAXPLACEMENTS - 1) {
            if (checkWin(newList)) {
              win("y");
            }
          }
          return newList;
        });
        if (placementsFromPlayerY.length >= MAXPLACEMENTS) {
          changeField(
            placementsFromPlayerY[0].row,
            placementsFromPlayerY[0].column,
            ""
          );
          setPlacementsFromPlayerY((oldValue) => {
            const newValue = oldValue.slice(1, oldValue.length);
            if (checkWin(newValue)) {
              win("y");
            }
            return newValue;
          });
        }
        setCurrentPlayer("x");
      }
      if (!modalDeactivated) {
        setShowTurnModal(true);
      }
    }
  }
  /**
   * Komplex Winning check for bigger Fields
   * @param {*} placementList
   * @returns
   */
  function checkWin(placementList) {
    return placementList.some((placement) => {
      // Vertical
      if (checkDirection(placement, placementList, -1, 0)) {
        return true;
      }
      // Horizontal
      if (checkDirection(placement, placementList, 0, -1)) {
        return true;
      }
      // Diagonal top left to bottom right and vice versa
      if (checkDirection(placement, placementList, 1, 1)) {
        return true;
      }
      // Diagonal bottom left to top right and vice versa
      if (checkDirection(placement, placementList, -1, 1)) {
        return true;
      }
    });
  }

  /**
   * This Methods checks a whole direction if they are in a row. you can Check vertical Horizontal or diagonal depending on your Vector.
   * @param {*} placement
   * @param {*} placements
   * @param {*} vectorRow
   * @param {*} vectorColumn
   */
  function checkDirection(placement, placements, vectorRow, vectorColumn) {
    let entriesToCheck = [];
    let row = placement.row;
    let column = placement.column;
    for (let i = 0; i < PLACEMENTSTOWIN; i++) {
      entriesToCheck.push({ row: row, column: column });
      // Performance. Don't Check the ones which are already over the limits
      if (
        row < 0 ||
        row >= FIELDSIDELENGTH ||
        column < 0 ||
        column >= FIELDSIDELENGTH
      ) {
        return false;
      }
      row = parseInt(row) + parseInt(vectorRow);
      column = parseInt(column) + parseInt(vectorColumn);
    }
    console.log("Has something to check: ");
    console.log(entriesToCheck);
    console.log(placements);
    const result = entriesToCheck.every((valueShould) =>
      placements.some(
        (valueIs) =>
          valueIs.row == valueShould.row && valueIs.column == valueShould.column
      )
    );
    console.log(result);
    return result;
  }
  return (
    <>
      <TurnChangeModal
        show={showTurnModal}
        close={() => {
          setShowTurnModal(false);
        }}
        currentPlayer={currentPlayer}
      />
      <TutorialModal
        show={showTutorialModal}
        close={() => {
          setShowTutorialModal(false);
        }}
      />
      <div className="mainContainer">
        <div>
          <h2>Spiele eine Party Infinite Tic Tac Toe</h2>
          <div>
            {field.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((column, columnIndex) => (
                  <Field
                    changeHandler={changeHandler}
                    key={rowIndex.toString() + columnIndex.toString()}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    value={column}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="footerContainer">
            <div className="columnContainer">
              <IconButton

                onClick={(event) => {
                  event.preventDefault();
                  setShowTutorialModal(true);
                }}
              >
                <LiveHelpIcon sx={{ height: "50px", width: "50px", bgcolor: "white" }} />
              </IconButton>
            </div>
            <div className="columnContainer">
              <label>Benachrichtigungen deaktivieren</label>
              <Switch
                value={modalDeactivated}
                checked={modalDeactivated}
                onClick={() => {
                  setModalDeactivated((prevValue) => {localStorage.setItem(LSMUTEMODAL, !prevValue); return !prevValue});
                }}
              ></Switch>
            </div>
          </div>
          <div className="footerContainer">
            <div className="columnContainer">
              <label>
                Starte ein neues Spiel
              </label>
              <Button onClick={() => {window.location.href="/"}}>
                Neu starten
              </Button>
            </div>
            <div className="columnContainer">
              <label>Ändere den Spielmodus</label>
              {smallField ? (
                <Button
                  onClick={() => {
                    localStorage.setItem(LSFIELD, true);
                    window.location.href = "/";
                  }}
                >
                  Spiele ein Runde 5x5
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    localStorage.setItem(LSFIELD, false);
                    window.location.href = "/";
                  }}
                >
                  Spiele eine Runde 3x3
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;
