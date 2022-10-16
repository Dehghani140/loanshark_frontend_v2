import { Box, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRotateRight, faArrowLeftLong, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import RoundShapeButton from '../../../../components/Button/RoundShapeButton/RoundShapeButton'

function HeaderButtons() {
  return (
    <>
      <Grid container alignItems={"center"} spacing={1}>
        <Grid item>
          <Box sx={{ mr: 1 }}>
            <RoundShapeButton
              label={"connect wallet"}
              onClick={() => {
                console.log(`clicked connect wallet`)
              }}
            ></RoundShapeButton>
          </Box>
        </Grid>
        <Grid item>
          <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
            console.log(`on click refresh`)
            // this.getNeededCollateralFor("GET_NEW");
          }}
            icon={faRotateRight} />
        </Grid>

        <Grid item>
          <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
            console.log(`on click resize`)
            // this.handleResize();
          }}
            icon={faBars} />
        </Grid>

        <Grid item>
          <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
            console.log(`on click dark light mod`)
            // if (this.props.theme === "light") {
            //   this.setAppThemeMode("dark")
            //   localStorage.setItem("theme", "dark");
            // }
            // else {
            //   this.setAppThemeMode("light")
            //   localStorage.setItem("theme", "light");
            // }
          }}
            icon={faLightbulb} />
        </Grid>
      </Grid>
    </>
  );
}

export default HeaderButtons;
