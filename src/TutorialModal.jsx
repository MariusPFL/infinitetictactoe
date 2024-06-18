import { Box, Button, Modal, Typography } from "@mui/material";

function TutorialModal(props) {
  return (
    <Modal open={props.show} onClose={props.close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          color: "black",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4">Infinite Tic Tac Toe. </Typography>
        <Typography variant="h6">Spielprinzip</Typography>
        <Typography variant="p">
          Dies ist eine abgeänderte Version vom herkömmlichen Tic Tac Toe.
          Grundsätzlich dürfen nicht mehr als 3 Zeichen des jeweiligen Spielers
          auf dem Feld liegen. Heisst wenn schon drei "X" gesetzt wurden, es
          wird beim nächsten setzten das älteste "X" gleichzeitig
          entfernt. Man sollte sich also gut merken, wenn man was gesetzt hat.
        </Typography>
        <Typography variant="h6">SpielModi</Typography>
        <Typography variant="p">
          Es gibt zwei Spielmodis, einmal mit einem 3x3 Feld und einmal mit
          einem 5x5. Bei 3x3 muss man 3 in der Reihe haben und es dürfen maximal
          3 auf dem Feld sein. Bei 5x5 muss man 4 in der Reihe haben und es
          dürfen maximal auch 4 auf dem Feld sein.
        </Typography>
        <Typography variant="h6">Sonstiges</Typography>
        <Typography variant="p">
          Falls man die nervige Benachrichtigungen, welche anzeigt welcher
          Spieler am Zug ist deaktivieren möchte, kann man dies tun bei
          "Benachrichtigungen deaktiveren".
        </Typography>
        <Button onClick={props.close}>Zurück zum Spiel</Button>
      </Box>
    </Modal>
  );
}
export default TutorialModal;