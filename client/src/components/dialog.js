import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Check from './static/check.png';
import Hidden from '@material-ui/core/Hidden';


const useStyles = makeStyles({
      root : {
         color : 'white',
         background : 'inherit'
        
      },
      mobileroot : {
         color : 'white',
         background : 'inherit',
         height : '20px',
         Width : '40%',
        
      }
});

function SimpleDialog(props) {
  const classes = useStyles();

  return (
    <>
      <Hidden xsDown>
        <Dialog onClose={props.handleOpenclose} aria-labelledby="simple-dialog-title" open={props.open} maxWidth={'xs'}
             BackdropProps={{
      classes: {
       root : classes.root
      }
     }}
     >
            <DialogContent style={{textAlign : 'center'}}>

                <DialogContentText id="alert-dialog-description" style={{marginTop : '30px', color : 'black'}}>
                  <img src={Check} style={{marginTop : '10px'}}/>
                  <span style={{position : 'relative', top : '20px'}}> {props.name} has been added to cart</span>
                </DialogContentText>
           </DialogContent>
          <DialogActions>

                <Button onClick={props.handleOpenclose} color="primary">
                  OK
                </Button>

          </DialogActions>

        </Dialog>
      </Hidden>

      <Hidden smUp>
        <Dialog onClose={props.handleOpenclose} aria-labelledby="simple-dialog-title" open={props.open}
             BackdropProps={{
      classes: {
       root : classes.mobileroot
      }
     }}
     >
            <DialogContent style={{textAlign : 'center'}}>

                <DialogContentText id="alert-dialog-description" style={{marginTop : '30px', color : 'black'}}>
                  <img src={Check} style={{marginTop : '10px'}}/>
                  <span style={{position : 'relative', top : '20px'}}> {props.name} has been added to cart</span>
                </DialogContentText>
           </DialogContent>
          <DialogActions>

                <Button onClick={props.handleOpenclose} color="primary">
                  OK
                </Button>

          </DialogActions>

        </Dialog>
      </Hidden>
    </>
  );
}

export default SimpleDialog;