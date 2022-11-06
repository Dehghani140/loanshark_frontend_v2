import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import logo from "../../../../images/logo.png";
import './menu.scss'
const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            content: "";
                        }
                    }
                }
                &.active,
                &:active,
                &:hover
                {
                    background: transparent;
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
      
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [menubar, setMenubar] = useState([true, false, false, false]);
  console.log(menubar)
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  function clickMenu(position: number): void {
    let originMenubar = [false, false, false, false]
    originMenubar[position] = true
    setMenubar(originMenubar)
  }
  //   opacity: 1;
  // color: rgba(51,51,51,1);
  // font-family: "ClashDisplay-Regular";
  // font-size: 16px;
  // font-weight: 400;
  // font-style: normal;
  // letter-spacing: 0px;
  // text-align: left;


  return (
    <>

      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <div style={{ maxWidth: "200px", maxHeight: "80px" }}>
            <img
              style={{ maxWidth: "200px", maxHeight: "60px" }}
              src='/assets/logo/Loanshark_Logo-01.png'
              alt="Loan Shark"></img>
          </div>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/dashboard"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Dashboard"
              className={`nav-item${menubar[0] === true ? "__clicked" : ""}`}
              onClick={() => { clickMenu(0) }}
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/borrow"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Borrow"
              className={`nav-item${menubar[1] === true ? "__clicked" : ""}`}
              onClick={() => { clickMenu(1) }}
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/smartVault1"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Smart Vault"
              className={`nav-item${menubar[2] === true ? "__clicked" : ""}`}
              onClick={() => { clickMenu(2) }}
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/app/main/more"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="More"
              className={'nav-item'}
            ></ListItemText>
          </ListItem>
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
