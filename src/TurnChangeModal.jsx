import { Box, Button, Modal, Typography } from "@mui/material";

function TurnChangeModal(props) {
    return(
        <Modal
        open={props.show}
        onClose={props.close}
        >
          <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }
          }
          >
            <Typography variant="h3">Spieler {props.currentPlayer} ist dran!</Typography>
            <Button onClick={props.close}>
              Weiter!
            </Button>
          </Box>
        </Modal>
    )
}
export default TurnChangeModal;